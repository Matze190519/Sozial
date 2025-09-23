from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timedelta
import aiohttp
import asyncio
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
import json
import re


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'helfer_finder')]

# Create the main app without a prefix
app = FastAPI(title="Helfer-Finder Cockpit API", version="2.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

GOOGLE_API_KEY = os.environ.get('GOOGLE_API_KEY')
GOOGLE_SEARCH_ENGINE_ID = os.environ.get('GOOGLE_SEARCH_ENGINE_ID')
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')

# Define Models
class ContactStatus(str):
    NEU = "neu"
    ERREICHT = "erreicht"
    NICHT_ERREICHT = "nicht_erreicht"
    TERMIN_VEREINBART = "termin_vereinbart"
    WIEDERVORLAGE = "wiedervorlage"
    ABGESCHLOSSEN = "abgeschlossen"

class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    position: str
    company: str
    phone: Optional[str] = None
    email: Optional[str] = None
    industry: str
    company_size: str
    status: str = ContactStatus.NEU
    notes: List[Dict[str, Any]] = Field(default_factory=list)
    call_history: List[Dict[str, Any]] = Field(default_factory=list)
    appointments: List[Dict[str, Any]] = Field(default_factory=list)
    last_updated: datetime = Field(default_factory=datetime.utcnow)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    data_freshness_score: float = 1.0
    source_urls: List[str] = Field(default_factory=list)

class ContactCreate(BaseModel):
    name: str
    position: str
    company: str
    phone: Optional[str] = None
    email: Optional[str] = None
    industry: str
    company_size: str

class ContactUpdate(BaseModel):
    status: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    notes: Optional[List[Dict[str, Any]]] = None
    call_history: Optional[List[Dict[str, Any]]] = None
    appointments: Optional[List[Dict[str, Any]]] = None

class ContactSearchRequest(BaseModel):
    industry: str
    position: str = "Geschäftsführer / CEO"
    company_size: str = "1000 - 5000 Mitarbeiter"
    count: int = 50
    location: Optional[str] = "Deutschland"

class Note(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    type: str = "general"

class CallRecord(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    duration: Optional[int] = None
    outcome: str
    notes: Optional[str] = None

class Appointment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    datetime: datetime
    description: Optional[str] = None
    location: Optional[str] = None
    status: str = "geplant"

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class GoogleAPIService:
    def __init__(self):
        self.api_key = GOOGLE_API_KEY
        self.search_engine_id = GOOGLE_SEARCH_ENGINE_ID
        self.gemini_api_key = GEMINI_API_KEY
    
    async def search_companies(self, industry: str, location: Optional[str] = "Deutschland", count: int = 50):
        """Search for companies using Gemini AI as fallback when Custom Search API is not available"""
        try:
            if self.search_engine_id and self.search_engine_id != "your_custom_search_engine_id_here":
                service = build("customsearch", "v1", developerKey=self.api_key)
                
                search_queries = [
                    f"{industry} unternehmen {location} geschäftsführer CEO",
                    f"{industry} firmen {location} vorstand direktor"
                ]
                
                all_results = []
                for query in search_queries[:2]:
                    result = service.cse().list(
                        q=query,
                        cx=self.search_engine_id,
                        num=min(10, count // 2)
                    ).execute()
                    
                    if 'items' in result:
                        all_results.extend(result['items'])
                    
                    await asyncio.sleep(0.1)
                
                return all_results[:count]
        except Exception as e:
            logger.warning(f"Google Search API not available, using Gemini fallback: {e}")
        
        try:
            import google.generativeai as genai
            genai.configure(api_key=self.gemini_api_key)
            model = genai.GenerativeModel('gemini-1.5-flash')
            
            prompt = f"""
            Erstelle eine Liste von {min(count, 20)} aktuellen Unternehmen aus der Branche "{industry}" in {location}.
            Für jedes Unternehmen benötige ich:
            - Firmenname
            - Geschäftsführer/CEO Name (aktuell 2024/2025)
            - Telefonnummer (Zentrale)
            - E-Mail (falls verfügbar)
            - Adresse
            - Website
            - Mitarbeiteranzahl (geschätzt)
            
            Fokus auf mittelständische bis große Unternehmen (500+ Mitarbeiter).
            Nur aktuelle, existierende Unternehmen mit echten Kontaktdaten.
            
            Format als JSON Array:
            [
              {{
                "title": "Firmenname",
                "link": "https://website.de",
                "snippet": "CEO: Vorname Nachname | Mitarbeiter: 1000-5000",
                "displayLink": "website.de",
                "ceo_name": "Vorname Nachname",
                "phone": "+49...",
                "email": "email@firma.de",
                "address": "Straße, PLZ Stadt",
                "employees": "1000-5000",
                "industry": "{industry}"
              }}
            ]
            """
            
            response = model.generate_content(prompt)
            
            import json
            import re
            
            response_text = response.text.strip()
            logger.info(f"Raw Gemini response: {response_text[:500]}...")
            
            if "```json" in response_text:
                start = response_text.find("```json") + 7
                end = response_text.find("```", start)
                response_text = response_text[start:end].strip()
            elif "```" in response_text:
                start = response_text.find("```") + 3
                end = response_text.rfind("```")
                response_text = response_text[start:end].strip()
            
            json_patterns = [
                r'\[.*?\]',  # Array format
                r'\{.*?\}',  # Single object format
            ]
            
            companies_data = None
            for pattern in json_patterns:
                json_match = re.search(pattern, response_text, re.DOTALL)
                if json_match:
                    try:
                        parsed_data = json.loads(json_match.group())
                        if isinstance(parsed_data, list):
                            companies_data = parsed_data
                        elif isinstance(parsed_data, dict):
                            companies_data = [parsed_data]
                        break
                    except json.JSONDecodeError as e:
                        logger.error(f"Failed to parse JSON with pattern {pattern}: {e}")
                        continue
            
            if companies_data:
                logger.info(f"Gemini AI generated {len(companies_data)} companies for {industry}")
                return companies_data[:count]
            else:
                logger.error(f"Failed to parse Gemini response as JSON: {response_text[:200]}...")
            
        except Exception as e:
            logger.error(f"Gemini AI fallback error: {e}")
        
        return []
    
    async def extract_contact_info(self, company_info: Dict[str, Any]):
        """Use Gemini API to extract executive contact information"""
        try:
            if not self.gemini_api_key:
                return None
            
            prompt = f"""
            Analysiere die folgenden Unternehmensinformationen und extrahiere Kontaktdaten von Entscheidungsträgern:
            
            Unternehmen: {company_info.get('title', '')}
            Beschreibung: {company_info.get('snippet', '')}
            Website: {company_info.get('link', '')}
            
            Finde und extrahiere:
            1. Name des Geschäftsführers/CEO/Vorstands
            2. Telefonnummer (direkt oder Zentrale)
            3. E-Mail-Adresse wenn verfügbar
            4. Genaue Position/Titel
            5. Unternehmensgröße (geschätzt)
            
            Antworte im JSON-Format:
            {{
                "name": "Vollständiger Name",
                "position": "Genaue Position",
                "company": "Firmenname",
                "phone": "Telefonnummer",
                "email": "E-Mail",
                "company_size": "Mitarbeiteranzahl geschätzt",
                "confidence": 0.8
            }}
            
            Nur echte, aktuelle Informationen verwenden. Bei Unsicherheit confidence reduzieren.
            """
            
            async with aiohttp.ClientSession() as session:
                headers = {
                    'Content-Type': 'application/json',
                }
                
                data = {
                    "contents": [{
                        "parts": [{"text": prompt}]
                    }],
                    "generationConfig": {
                        "temperature": 0.1,
                        "maxOutputTokens": 1000,
                    }
                }
                
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key={self.gemini_api_key}"
                
                async with session.post(url, headers=headers, json=data) as response:
                    if response.status == 200:
                        result = await response.json()
                        if 'candidates' in result and result['candidates']:
                            content = result['candidates'][0]['content']['parts'][0]['text']
                            json_match = re.search(r'\{.*\}', content, re.DOTALL)
                            if json_match:
                                return json.loads(json_match.group())
                    return None
        except Exception as e:
            logger.error(f"Gemini API error: {e}")
            return None
    
    async def generate_conversation_briefing(self, contact: Contact):
        """Generate AI conversation briefing for a contact"""
        try:
            if not self.gemini_api_key:
                return "KI-Briefing nicht verfügbar - API-Schlüssel fehlt"
            
            prompt = f"""
            Erstelle ein professionelles Gesprächs-Briefing für einen Verkaufsanruf:
            
            Kontakt: {contact.name}
            Position: {contact.position}
            Unternehmen: {contact.company}
            Branche: {contact.industry}
            
            Das Briefing soll enthalten:
            1. Persönliche Ansprache und Gesprächseinstieg
            2. Relevante Unternehmensinformationen
            3. Potentielle Gesprächsthemen und Interessen
            4. Verkaufsargumente für Handtücher (Qualität, soziale Komponente)
            5. Mögliche Einwände und Antworten
            6. Gesprächsziele und nächste Schritte
            
            Fokus: Professionell, respektvoll, soziale Komponente (Hilfe für blinde Frauen) hervorheben.
            """
            
            async with aiohttp.ClientSession() as session:
                headers = {'Content-Type': 'application/json'}
                data = {
                    "contents": [{"parts": [{"text": prompt}]}],
                    "generationConfig": {
                        "temperature": 0.3,
                        "maxOutputTokens": 1500,
                    }
                }
                
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key={self.gemini_api_key}"
                
                async with session.post(url, headers=headers, json=data) as response:
                    if response.status == 200:
                        result = await response.json()
                        if 'candidates' in result and result['candidates']:
                            return result['candidates'][0]['content']['parts'][0]['text']
                    return "Briefing konnte nicht generiert werden"
        except Exception as e:
            logger.error(f"Briefing generation error: {e}")
            return "Fehler beim Generieren des Briefings"

google_service = GoogleAPIService()

async def refresh_contact_data():
    """Background task to refresh contact data daily"""
    try:
        cutoff_time = datetime.utcnow() - timedelta(hours=24)
        old_contacts = await db.contacts.find({
            "last_updated": {"$lt": cutoff_time},
            "status": {"$ne": ContactStatus.ABGESCHLOSSEN}
        }).to_list(100)
        
        for contact_data in old_contacts:
            contact = Contact(**contact_data)
            updated_info = await google_service.extract_contact_info({
                'title': contact.company,
                'snippet': f"{contact.name} {contact.position}",
                'link': contact.source_urls[0] if contact.source_urls else ""
            })
            
            if updated_info and updated_info.get('confidence', 0) > 0.7:
                update_data = {
                    "phone": updated_info.get('phone', contact.phone),
                    "email": updated_info.get('email', contact.email),
                    "last_updated": datetime.utcnow(),
                    "data_freshness_score": updated_info.get('confidence', 0.8)
                }
                
                await db.contacts.update_one(
                    {"id": contact.id},
                    {"$set": update_data}
                )
                
            await asyncio.sleep(1)  # Rate limiting
            
    except Exception as e:
        logger.error(f"Data refresh error: {e}")

@api_router.get("/")
async def root():
    return {"message": "Helfer-Finder Cockpit API v2.0", "status": "active"}

@api_router.post("/contacts/search")
async def search_contacts(request: ContactSearchRequest, background_tasks: BackgroundTasks):
    """Enhanced contact search with Google APIs"""
    try:
        company_results = await google_service.search_companies(
            industry=request.industry,
            location=request.location or "Deutschland",
            count=request.count
        )
        
        contacts = []
        for company_info in company_results:
            contact_info = await google_service.extract_contact_info(company_info)
            
            if contact_info and contact_info.get('confidence', 0) > 0.6:
                contact = Contact(
                    name=contact_info.get('name', 'Unbekannt'),
                    position=contact_info.get('position', request.position),
                    company=contact_info.get('company', company_info.get('title', 'Unbekannt')),
                    phone=contact_info.get('phone'),
                    email=contact_info.get('email'),
                    industry=request.industry,
                    company_size=contact_info.get('company_size', request.company_size),
                    data_freshness_score=contact_info.get('confidence', 0.8),
                    source_urls=[company_info.get('link', '')]
                )
                
                await db.contacts.insert_one(contact.dict())
                contacts.append(contact)
                
                if len(contacts) >= request.count:
                    break
        
        background_tasks.add_task(refresh_contact_data)
        
        return {"contacts": contacts, "total": len(contacts)}
        
    except Exception as e:
        logger.error(f"Contact search error: {e}")
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")

@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts(skip: int = 0, limit: int = 100, status: Optional[str] = None):
    """Get all contacts with optional filtering"""
    try:
        query = {}
        if status:
            query["status"] = status
            
        contacts = await db.contacts.find(query).skip(skip).limit(limit).to_list(limit)
        return [Contact(**contact) for contact in contacts]
    except Exception as e:
        logger.error(f"Get contacts error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/contacts/{contact_id}", response_model=Contact)
async def get_contact(contact_id: str):
    """Get specific contact by ID"""
    try:
        contact = await db.contacts.find_one({"id": contact_id})
        if not contact:
            raise HTTPException(status_code=404, detail="Contact not found")
        return Contact(**contact)
    except Exception as e:
        logger.error(f"Get contact error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.put("/contacts/{contact_id}", response_model=Contact)
async def update_contact(contact_id: str, update_data: ContactUpdate):
    """Update contact information"""
    try:
        update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
        update_dict["last_updated"] = datetime.utcnow()
        
        result = await db.contacts.update_one(
            {"id": contact_id},
            {"$set": update_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
            
        updated_contact = await db.contacts.find_one({"id": contact_id})
        return Contact(**updated_contact)
    except Exception as e:
        logger.error(f"Update contact error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/contacts/{contact_id}/notes")
async def add_note(contact_id: str, note: Note):
    """Add note to contact"""
    try:
        result = await db.contacts.update_one(
            {"id": contact_id},
            {"$push": {"notes": note.dict()}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
            
        return {"message": "Note added successfully", "note": note}
    except Exception as e:
        logger.error(f"Add note error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/contacts/{contact_id}/calls")
async def add_call_record(contact_id: str, call: CallRecord):
    """Add call record to contact"""
    try:
        result = await db.contacts.update_one(
            {"id": contact_id},
            {"$push": {"call_history": call.dict()}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
            
        return {"message": "Call record added successfully", "call": call}
    except Exception as e:
        logger.error(f"Add call record error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/contacts/{contact_id}/appointments")
async def add_appointment(contact_id: str, appointment: Appointment):
    """Add appointment to contact"""
    try:
        result = await db.contacts.update_one(
            {"id": contact_id},
            {"$push": {"appointments": appointment.dict()}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
            
        return {"message": "Appointment added successfully", "appointment": appointment}
    except Exception as e:
        logger.error(f"Add appointment error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/contacts/{contact_id}/briefing")
async def get_conversation_briefing(contact_id: str):
    """Get AI-generated conversation briefing for contact"""
    try:
        contact_data = await db.contacts.find_one({"id": contact_id})
        if not contact_data:
            raise HTTPException(status_code=404, detail="Contact not found")
            
        contact = Contact(**contact_data)
        briefing = await google_service.generate_conversation_briefing(contact)
        
        return {"briefing": briefing, "contact": contact}
    except Exception as e:
        logger.error(f"Briefing generation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.delete("/contacts/{contact_id}")
async def delete_contact(contact_id: str):
    """Delete contact"""
    try:
        result = await db.contacts.delete_one({"id": contact_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
        return {"message": "Contact deleted successfully"}
    except Exception as e:
        logger.error(f"Delete contact error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    """Initialize background tasks on startup"""
    global google_service
    google_service = GoogleAPIService()
    logger.info("Helfer-Finder Cockpit API starting up...")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

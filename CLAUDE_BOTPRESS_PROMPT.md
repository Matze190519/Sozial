# Claude-Prompt: Botpress Lina WhatsApp-Integration mit sozialmedia.best

**Datum:** 04. April 2026
**Zweck:** Dieser Prompt gibt Claude alle Informationen, um die Botpress-Flows in Lina mit den sozialmedia.best API-Endpoints zu verbinden. Benachrichtigungen laufen über Brevo (nicht über Manus).

---

## Kontext

Lina ist ein Botpress-Chatbot auf WhatsApp. Sie ist der KI-Coach für LR Health & Beauty Partner von Mathias Vinzing. Das Backend-System läuft auf **sozialmedia.best** und bietet 19 REST-API-Endpoints, die Lina über HTTP-Requests aufrufen kann. Die Partner sind NICHT bei Manus registriert, sondern loggen sich über Magic Links ein. Benachrichtigungen (E-Mail/SMS) laufen über **Brevo**, nicht über Manus.

---

## Alle 19 API-Endpoints

**Base URL:** `https://sozialmedia.best`

### Kern-Endpoints (Content-Workflow)

| Nr | Endpoint | Methode | Beschreibung | Pflichtfelder |
|----|----------|---------|--------------|---------------|
| 1 | `/api/lina/content` | GET | Freigegebene Posts abrufen | - |
| 2 | `/api/lina/library` | GET | Content-Bibliothek durchsuchen | - |
| 3 | `/api/lina/products` | GET | LR-Produktkatalog (226 Produkte) | - |
| 4 | `/api/lina/status` | GET | System-Status und Statistiken | - |
| 5 | `/api/lina/health` | GET | Health-Check (Monitoring) | - |
| 6 | `/api/lina/templates` | GET | Content-Vorlagen abrufen | - |
| 7 | `/api/lina/weekly-plan` | GET | Optimaler Posting-Wochenplan | - |
| 8 | `/api/lina/pending/:partnerNumber` | GET | Wartende Posts eines Partners | partnerNumber (URL) |
| 9 | `/api/lina/partner-stats/:partnerNumber` | GET | Partner-Statistiken | partnerNumber (URL) |

### Aktions-Endpoints (POST)

| Nr | Endpoint | Methode | Beschreibung | Pflichtfelder |
|----|----------|---------|--------------|---------------|
| 10 | `/api/lina/generate` | POST | Content generieren (Text) | topic |
| 11 | `/api/lina/hashtags` | POST | Smart Hashtags generieren | topic |
| 12 | `/api/lina/objection` | POST | Einwandbehandlung generieren | objection |
| 13 | `/api/lina/schedule` | POST | Post planen (Zeitpunkt setzen) | postId, scheduledTime |
| 14 | `/api/lina/self-approve` | POST | Partner gibt eigenen Content frei | partnerNumber, postId |
| 15 | `/api/lina/login-link` | POST | Magic Login-Link generieren | partnerNumber, name, whatsappNumber |
| 16 | `/api/lina/invite` | POST | Einladungs-Token erstellen | name, partnerNumber, whatsappNumber |
| 17 | `/api/lina/notify` | POST | Benachrichtigungen abrufen | partnerNumber |

### Auth-Endpoints

| Nr | Endpoint | Methode | Beschreibung |
|----|----------|---------|--------------|
| 18 | `/api/lina/invite/:token` | GET | Einladungs-Token prüfen |
| 19 | `/api/auth/magic/:token` | GET | Magic Login ausführen (Browser-Redirect) |

---

## Botpress Flow-Konfiguration: Schritt-für-Schritt

### Voraussetzung: Partner-Daten in Botpress

Jeder Partner hat in Botpress folgende Variablen gespeichert:

```
user.partnerNumber  → z.B. "LR12345"
user.first_name     → z.B. "Max"
user.phone          → z.B. "+491234567890"
```

Diese werden beim ersten Kontakt oder über die Botpress-Tabelle gesetzt.

---

### Flow 1: Content Hub öffnen (Magic Login)

**Trigger:** Partner schreibt "Content Hub" oder wählt Menüpunkt "Content Hub öffnen"

**Botpress Execute Code:**
```javascript
const response = await axios.post('https://sozialmedia.best/api/lina/login-link', {
  partnerNumber: user.partnerNumber,
  name: user.first_name,
  whatsappNumber: user.phone
}, {
  headers: { 'Content-Type': 'application/json' }
});

if (response.data.success) {
  workflow.loginUrl = response.data.loginUrl;
  workflow.message = response.data.message;
} else {
  workflow.loginUrl = null;
  workflow.message = 'Login-Link konnte nicht erstellt werden. Bitte kontaktiere Mathias.';
}
```

**Antwort-Karte:**
```
Hier ist dein persönlicher Login-Link zum Content Hub:
👉 {{workflow.loginUrl}}

Der Link ist 24 Stunden gültig. Klicke drauf und du bist sofort eingeloggt!
```

---

### Flow 2: Fertigen Content abrufen

**Trigger:** "Content abrufen" oder "Fertiger Content"

**Botpress Execute Code:**
```javascript
const response = await axios.get('https://sozialmedia.best/api/lina/content', {
  params: { limit: 3 }
});

if (response.data.success && response.data.count > 0) {
  workflow.posts = response.data.posts;
  workflow.hasContent = true;
} else {
  workflow.hasContent = false;
}
```

**Antwort (wenn Content vorhanden):**
```
Hier sind deine neuesten Posts:

{{#each workflow.posts}}
📝 *{{this.topic}}*
{{this.text}}
{{#if this.imageUrl}}🖼️ Bild: {{this.imageUrl}}{{/if}}
---
{{/each}}

Kopiere den Text und poste ihn auf deinen Kanälen!
```

---

### Flow 3: Content freigeben

**Trigger:** "Content freigeben" oder "Freigabe"

**Schritt 1 - Wartende Posts abrufen:**
```javascript
const response = await axios.get(
  `https://sozialmedia.best/api/lina/pending/${user.partnerNumber}`
);

if (response.data.success && response.data.count > 0) {
  workflow.pendingPosts = response.data.posts;
  workflow.hasPending = true;
} else {
  workflow.hasPending = false;
}
```

**Schritt 2 - Auswahl anzeigen (Single Choice, KEINE Texteingabe):**
Zeige die wartenden Posts als Buttons/Optionen an. Der Partner wählt einen Post aus.

**Schritt 3 - Freigeben:**
```javascript
const response = await axios.post('https://sozialmedia.best/api/lina/self-approve', {
  partnerNumber: user.partnerNumber,
  postId: workflow.selectedPostId
}, {
  headers: { 'Content-Type': 'application/json' }
});

workflow.approveMessage = response.data.message;
```

**Antwort:**
```
✅ {{workflow.approveMessage}}
Dein Content wird jetzt automatisch gepostet!
```

---

### Flow 4: Content generieren (NEU)

**Trigger:** "Content erstellen" oder "Neuer Post"

**Schritt 1 - Thema abfragen:**
Lina fragt: "Zu welchem Thema soll ich Content erstellen?"
Partner antwortet mit Freitext → `workflow.topic`

**Schritt 2 - Plattform wählen (Single Choice):**
Optionen: Instagram, TikTok, LinkedIn, Facebook

**Schritt 3 - Content generieren:**
```javascript
const response = await axios.post('https://sozialmedia.best/api/lina/generate', {
  topic: workflow.topic,
  platform: workflow.platform || 'instagram',
  contentType: workflow.contentType || 'post'
}, {
  headers: { 'Content-Type': 'application/json' }
});

if (response.data.success) {
  workflow.generatedContent = response.data.content;
  workflow.postId = response.data.postId;
  workflow.generateMessage = response.data.message;
} else {
  workflow.generatedContent = null;
}
```

**Antwort:**
```
Hier ist dein generierter Content:

📝 {{workflow.generatedContent}}

{{workflow.generateMessage}}

Möchtest du den Content freigeben oder bearbeiten?
```

---

### Flow 5: Hashtags generieren (NEU)

**Trigger:** "Hashtags" oder "Hashtag-Vorschläge"

**Botpress Execute Code:**
```javascript
const response = await axios.post('https://sozialmedia.best/api/lina/hashtags', {
  topic: workflow.topic || 'LR Health & Beauty',
  platform: 'instagram'
}, {
  headers: { 'Content-Type': 'application/json' }
});

if (response.data.success) {
  workflow.hashtags = response.data.hashtags.join(' ');
  workflow.tips = response.data.tips;
}
```

**Antwort:**
```
Hier sind deine optimalen Hashtags:

{{workflow.hashtags}}

💡 Tipp: {{workflow.tips}}

Kopiere die Hashtags und füge sie unter deinen Post ein!
```

---

### Flow 6: Wochenplan abrufen (NEU)

**Trigger:** "Wochenplan" oder "Wann posten"

**Botpress Execute Code:**
```javascript
const response = await axios.get('https://sozialmedia.best/api/lina/weekly-plan', {
  params: { platform: workflow.platform || 'instagram' }
});

if (response.data.success) {
  workflow.weekPlan = response.data;
  workflow.tip = response.data.tipp;
}
```

**Antwort:**
```
📅 Dein optimaler Posting-Plan für {{workflow.weekPlan.displayName}}:

{{#each workflow.weekPlan.tage}}
{{#if this.istTopTag}}⭐{{else}}📌{{/if}} {{this.tag}}: {{this.besteZeit}} Uhr (Score: {{this.score}})
{{/each}}

🏆 Top-Tage: {{workflow.weekPlan.topTage}}
💡 {{workflow.tip}}
```

---

### Flow 7: Einwandbehandlung (NEU)

**Trigger:** "Einwand" oder "Kunde sagt..." oder "Hilfe bei Einwand"

**Schritt 1 - Einwand abfragen:**
Lina fragt: "Was sagt dein Kunde/Interessent?"
Partner antwortet mit Freitext → `workflow.objection`

**Botpress Execute Code:**
```javascript
const response = await axios.post('https://sozialmedia.best/api/lina/objection', {
  objection: workflow.objection,
  partnerName: user.first_name
}, {
  headers: { 'Content-Type': 'application/json' }
});

if (response.data.success) {
  workflow.objectionResponse = response.data.response;
}
```

**Antwort:**
```
Hier ist deine professionelle Antwort:

💬 {{workflow.objectionResponse}}

Probiere es aus und lass mich wissen, wie es gelaufen ist!
```

---

### Flow 8: Content-Vorlagen (NEU)

**Trigger:** "Vorlagen" oder "Templates"

**Botpress Execute Code:**
```javascript
const response = await axios.get('https://sozialmedia.best/api/lina/templates', {
  params: { limit: 5 }
});

if (response.data.success && response.data.count > 0) {
  workflow.templates = response.data.templates;
  workflow.hasTemplates = true;
} else {
  workflow.hasTemplates = false;
}
```

**Antwort:**
```
Hier sind deine Content-Vorlagen:

{{#each workflow.templates}}
📋 *{{this.name}}* ({{this.category}})
{{this.content}}
---
{{/each}}

Wähle eine Vorlage und passe sie an!
```

---

### Flow 9: Partner-Statistiken

**Trigger:** "Meine Stats" oder "Statistiken"

**Botpress Execute Code:**
```javascript
const response = await axios.get(
  `https://sozialmedia.best/api/lina/partner-stats/${user.partnerNumber}`
);

if (response.data.success) {
  workflow.stats = response.data.stats;
  workflow.partner = response.data.partner;
}
```

**Antwort:**
```
📊 Deine Statistiken, {{workflow.partner.name}}:

📝 Gesamt: {{workflow.stats.totalPosts}} Posts
✅ Freigegeben: {{workflow.stats.approved}}
⏳ Wartend: {{workflow.stats.pending}}
🚀 Gepostet: {{workflow.stats.published}}
❌ Abgelehnt: {{workflow.stats.rejected}}

Weiter so! 💪
```

---

### Flow 10: LR-Produkte durchsuchen

**Trigger:** "Produkte" oder "LR Produkte"

**Botpress Execute Code:**
```javascript
const response = await axios.get('https://sozialmedia.best/api/lina/products', {
  params: { limit: 5, search: workflow.searchTerm || '' }
});

if (response.data.success) {
  workflow.products = response.data.products;
}
```

---

## WhatsApp-Hauptmenü für Lina

Das Hauptmenü in Botpress sollte folgende Optionen haben (als Single Choice Buttons):

```
🏠 Hauptmenü

1. 📝 Content erstellen        → Flow 4 (generate)
2. 📋 Fertiger Content          → Flow 2 (content)
3. ✅ Content freigeben         → Flow 3 (self-approve)
4. 🔗 Content Hub öffnen        → Flow 1 (login-link)
5. # Hashtags generieren       → Flow 5 (hashtags)
6. 📅 Wochenplan                → Flow 6 (weekly-plan)
7. 💬 Einwandbehandlung         → Flow 7 (objection)
8. 📋 Vorlagen                  → Flow 8 (templates)
9. 📊 Meine Statistiken         → Flow 9 (partner-stats)
10. 🛍️ LR-Produkte              → Flow 10 (products)
```

---

## Benachrichtigungen: Brevo (NICHT Manus)

Die Push-Benachrichtigungen für Partner laufen über **Brevo** (ehemals Sendinblue). Brevo wurde bereits eingerichtet. Benachrichtigungen werden NICHT über das Manus-System gesendet, da die Partner nicht bei Manus registriert sind.

Brevo wird verwendet für:
- E-Mail-Benachrichtigungen wenn Content freigegeben wurde
- SMS-Benachrichtigungen (optional)
- Transaktionale E-Mails (Magic Login-Links, Einladungen)

Die Brevo-Integration läuft separat und muss NICHT in den Botpress-Flows konfiguriert werden.

---

## Wichtige Regeln für die Botpress-Konfiguration

1. **Keine Texteingabe bei Auswahl-Optionen.** Immer Single Choice Buttons verwenden, außer bei Freitext-Eingaben (Thema, Einwand).
2. **Partnernummer** wird aus `user.partnerNumber` gelesen (Botpress User-Variable).
3. **Magic Links** sind 24h gültig. Danach muss ein neuer generiert werden.
4. **Alle Endpoints** geben `{ success: boolean, ... }` zurück. Prüfe immer `response.data.success` vor der Antwort.
5. **Fehlerbehandlung:** Zeige bei Fehlern eine freundliche Nachricht: "Da ist etwas schiefgelaufen. Versuche es nochmal oder kontaktiere Mathias."
6. **Content-Type Header** bei POST-Requests: `'Content-Type': 'application/json'`
7. **Keine Authentifizierung nötig** - die Lina-Endpoints sind öffentlich (kein Bearer Token).

---

## Endpoint-Details mit Request/Response Beispielen

### POST /api/lina/generate

**Request:**
```json
{
  "topic": "LR Aloe Vera Drinking Gel",
  "platform": "instagram",
  "contentType": "post",
  "pillar": "produkt"
}
```

**Response:**
```json
{
  "success": true,
  "postId": 42,
  "content": "Stell dir vor, du könntest deinen Körper jeden Morgen...",
  "message": "Content zum Thema \"LR Aloe Vera Drinking Gel\" erstellt! Jetzt im Dashboard freigeben."
}
```

Optionale Felder:
- `platform`: "instagram" (default), "tiktok", "linkedin", "facebook"
- `contentType`: "post" (default), "reel", "story"
- `pillar`: "lifestyle", "produkt", "business", "gesundheit", "autokonzept"

---

### POST /api/lina/hashtags

**Request:**
```json
{
  "topic": "Aloe Vera Gesundheit",
  "platform": "instagram",
  "pillar": "gesundheit"
}
```

**Response:**
```json
{
  "success": true,
  "hashtags": ["#AloeVera", "#Gesundheit", "#LRHealthBeauty", "#Naturprodukte", "#Wellness"],
  "categories": {
    "trending": ["#Gesundheit"],
    "niche": ["#AloeVera"],
    "brand": ["#LRHealthBeauty"],
    "broad": ["#Wellness"]
  },
  "totalReach": "50K+",
  "tips": "Mix aus Brand und Nische für maximale Reichweite",
  "platform": "instagram"
}
```

---

### GET /api/lina/weekly-plan

**Request:** `GET /api/lina/weekly-plan?platform=instagram`

**Response:**
```json
{
  "success": true,
  "platform": "instagram",
  "displayName": "Instagram",
  "besteZeiten": ["12:00", "18:30"],
  "topTage": ["Dienstag", "Mittwoch"],
  "tage": [
    { "tag": "Montag", "besteZeit": "12:00", "score": 85, "grund": "Mittagspause", "istTopTag": false },
    { "tag": "Dienstag", "besteZeit": "18:30", "score": 92, "grund": "Feierabend-Peak", "istTopTag": true }
  ],
  "hinweise": "Reels werden vom Algorithmus bevorzugt",
  "tipp": "Poste an den Top-Tagen (Dienstag, Mittwoch) auf Instagram für maximale Reichweite."
}
```

Unterstützte Plattformen: `instagram`, `tiktok`, `linkedin`, `facebook`, `youtube`, `twitter`, `threads`, `all`

---

### POST /api/lina/objection

**Request:**
```json
{
  "objection": "Das ist doch ein Pyramidensystem",
  "context": "Erstgespräch mit Interessent",
  "partnerName": "Max"
}
```

**Response:**
```json
{
  "success": true,
  "objection": "Das ist doch ein Pyramidensystem",
  "response": "Das ist eine berechtigte Frage, Max. Lass mich dir den Unterschied erklären...",
  "message": "Einwandbehandlung generiert!"
}
```

---

### POST /api/lina/schedule

**Request:**
```json
{
  "postId": 42,
  "scheduledTime": "2026-04-10T10:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "postId": 42,
  "scheduledTime": "2026-04-10T10:00:00Z",
  "message": "Post #42 geplant für 10.4.2026, 12:00:00"
}
```

---

### GET /api/lina/templates

**Request:** `GET /api/lina/templates?category=lifestyle&limit=5`

**Response:**
```json
{
  "success": true,
  "count": 3,
  "templates": [
    {
      "id": 1,
      "name": "Lifestyle Freedom Post",
      "category": "lifestyle",
      "content": "Stell dir vor, du könntest jeden Tag...",
      "platforms": ["instagram", "facebook"],
      "usageCount": 12
    }
  ]
}
```

---

### GET /api/lina/health

**Response:**
```json
{
  "status": "ok",
  "uptime": 86400,
  "timestamp": "2026-04-04T12:00:00Z",
  "db": "connected",
  "totalPosts": 57,
  "endpoints": 19,
  "version": "2.0.0"
}
```

---

## Zusammenfassung: Was Claude in Botpress machen muss

1. **Hauptmenü erstellen** mit 10 Optionen (siehe oben)
2. **10 Flows erstellen** (je einer pro Menüpunkt)
3. **Jeder Flow** besteht aus: Trigger → Execute Code (HTTP Request) → Antwort-Karte
4. **User-Variablen** sicherstellen: `user.partnerNumber`, `user.first_name`, `user.phone`
5. **Fehlerbehandlung** in jedem Flow einbauen
6. **Allowed Origins** in Botpress Webchat Settings: `https://sozialmedia.best` hinzufügen
7. **Benachrichtigungen** laufen über Brevo, nicht über Botpress oder Manus

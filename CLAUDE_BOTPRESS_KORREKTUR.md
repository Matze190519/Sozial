# STOPP - Lies das ZUERST bevor du irgendetwas machst!

## Was du NICHT tun sollst:
- KEINE neuen Flows bauen
- KEINE neuen Menupunkte erstellen
- KEINE Leute einladen (Team ist schon in Botpress drin!)
- NICHTS neu aufbauen

## Was du tun sollst:
Die bestehenden Botpress-Flows mit den sozialmedia.best API-Endpoints verbinden. Die Flows existieren bereits. Das Menu existiert bereits. Du musst NUR die Execute-Code-Bloecke in den bestehenden Flows aktualisieren.

---

## Bestehende Menupunkte und API-Verbindung

### 1. Content Hub oeffnen
Execute Code:
```javascript
const response = await axios.post('https://sozialmedia.best/api/lina/login-link', {
  partnerNumber: workflow.partnerNumber || user.partnerNumber,
  name: user.first_name || 'Partner',
  whatsappNumber: user.phone || ''
}, { headers: { 'Content-Type': 'application/json' } });
if (response.data.success) {
  workflow.loginUrl = response.data.loginUrl;
}
```
Antwort: Hier ist dein persoenlicher Link zum Content Hub: {{workflow.loginUrl}}

---

### 2. Fertiger Content abrufen
Execute Code:
```javascript
const response = await axios.get('https://sozialmedia.best/api/lina/content', {
  params: { limit: 3 }
});
if (response.data.success && response.data.count > 0) {
  workflow.posts = response.data.posts;
  workflow.hasContent = true;
  workflow.contentText = response.data.posts.map(function(p, i) {
    return (i+1) + '. ' + p.topic + '\n' + p.text.substring(0, 200) + '...' +
      (p.imageUrl ? '\nBild dabei' : '') + (p.videoUrl ? '\nVideo dabei' : '');
  }).join('\n\n');
} else {
  workflow.hasContent = false;
  workflow.contentText = 'Aktuell kein fertiger Content verfuegbar.';
}
```
Antwort: {{workflow.contentText}}

---

### 3. Content freigeben
Schritt 1 - Wartende Posts holen:
```javascript
var partnerNumber = workflow.partnerNumber || user.partnerNumber;
var response = await axios.get('https://sozialmedia.best/api/lina/pending/' + partnerNumber);
if (response.data.success && response.data.count > 0) {
  workflow.pendingPosts = response.data.posts;
  workflow.hasPending = true;
  workflow.pendingText = response.data.posts.map(function(p, i) {
    return (i+1) + '. "' + p.topic + '" (' + p.type + ') - ' + p.preview;
  }).join('\n');
} else {
  workflow.hasPending = false;
}
```
Wenn Posts da sind, frage welchen freigeben. Dann Schritt 2:
```javascript
var partnerNumber = workflow.partnerNumber || user.partnerNumber;
var postId = workflow.selectedPostId;
var response = await axios.post('https://sozialmedia.best/api/lina/self-approve', {
  partnerNumber: partnerNumber,
  postId: postId
}, { headers: { 'Content-Type': 'application/json' } });
workflow.approveResult = response.data.message;
workflow.published = response.data.published;
```
Antwort: {{workflow.approveResult}}

WICHTIG: self-approve postet jetzt automatisch auf Blotato! Der Partner muss nichts weiter tun.

---

### 4. Einwaende meistern
```javascript
var response = await axios.post('https://sozialmedia.best/api/lina/objection', {
  objection: workflow.userObjection
}, { headers: { 'Content-Type': 'application/json' } });
if (response.data.success) {
  workflow.objectionResponse = response.data.response;
}
```
Antwort: {{workflow.objectionResponse}}

---

### 5. Content nach Wunsch
```javascript
var response = await axios.post('https://sozialmedia.best/api/lina/generate', {
  topic: workflow.userTopic,
  platform: workflow.selectedPlatform || 'instagram',
  contentType: workflow.selectedType || 'post'
}, { headers: { 'Content-Type': 'application/json' } });
if (response.data.success) {
  workflow.generatedContent = response.data.content;
  workflow.generatedImage = response.data.imageUrl;
  workflow.postId = response.data.postId;
  workflow.resultMessage = response.data.message;
}
```
Antwort: {{workflow.resultMessage}}

WICHTIG: /api/lina/generate erstellt jetzt automatisch ein Bild mit!

---

### 6. Leads kaufen
Das ist ein externer Link. Keine API noetig.

---

### 7. System-Hilfe und FAQ
```javascript
var response = await axios.get('https://sozialmedia.best/api/lina/status');
workflow.systemStatus = 'System: ' + response.data.status + '\nPosts: ' + response.data.totalPosts;
```

---

### 8. Instagram Growth (NEU)
Das ist eine Anleitungsseite im Content Hub. Keine API noetig.
Antwort: Schau dir die Instagram Growth Anleitung an - dort steht alles zu AutoDM, Lead Magnets und Link-in-bio:
👉 [Content Hub oeffnen] → Sidebar → "Instagram Growth"

Kurz erklaert: Mit SuperProfile bekommst du automatisch Leads wenn jemand unter deinem Post kommentiert. Einmal einrichten, laeuft dann automatisch. Kostenloser Start moeglich!

---

## Zusaetzliche Endpoints

| Endpoint | Methode | Wofuer |
|----------|---------|--------|
| /api/lina/templates | GET | Vorlagen anzeigen |
| /api/lina/hashtags | POST {topic} | Hashtags generieren |
| /api/lina/weekly-plan | GET | Wochenplan anzeigen |
| /api/lina/products | GET | LR-Produkte anzeigen |
| /api/lina/library | GET | Bibliothek durchsuchen (NUR Posts mit Bild/Video!) |
| /api/lina/schedule | POST {postId, scheduledTime} | Post planen |
| /api/lina/partner-stats/:partnerNumber | GET | Partner-Statistiken |
| /api/lina/health | GET | Health-Check (Monitoring) |

---

## Regeln
1. Das Team ist SCHON in Botpress. Niemand muss eingeladen werden.
2. Benachrichtigungen laufen ueber Brevo, NICHT ueber Manus.
3. Jeder Post der freigegeben wird, wird AUTOMATISCH auf Blotato gepostet.
4. Jeder generierte Post bekommt AUTOMATISCH ein Bild.
5. Partner loggen sich ueber Magic Links ein, NICHT ueber Manus OAuth.
6. Die Bibliothek enthaelt NUR vollstaendige Posts (Text + Bild/Video). Reine Text-Posts werden NICHT gespeichert.
7. **WhatsApp Single Choice: MAXIMAL 10 Buttons pro Node!** WhatsApp erlaubt max. 10 Optionen in einer Single-Choice-Liste. Wenn du mehr als 10 Punkte hast, MUSST du sie auf 2 Ebenen aufteilen (z.B. Hauptmenue mit Kategorien → Untermenue mit Details). NIEMALS mehr als 10 Buttons in einer Single Choice Node!
8. Blotato-Posts brauchen platform-spezifische Target-Felder (siehe Blotato-Regeln unten).

---

## CHANGELOG - Alle Aenderungen seit Erstversion

### Budget-System & Kosten-Kontrolle (04.04.2026)
- Partner haben Limits: 40 Bilder/Monat + 10 Videos/Monat (Testphase, normal: 20/5)
- Globaler Monatsdeckel: $200
- Bilder: $0.08 pro Bild (Nano Banana 2 / Google Gemini)
- Videos Partner: $0.84 pro 5s Video (Kling 3.0 Pro mit Audio)
- Videos Admin: $2.00 pro 5s Video (Veo 3.1 Top-Qualitaet)
- Admin (Mathias) hat KEIN Budget-Limit + bekommt Veo 3.1
- Neue Admin-Seite: Kosten-Uebersicht unter /budget (Sidebar: "Kosten-Uebersicht")

### Bibliothek-Filter (04.04.2026)
- Bibliothek speichert NUR vollstaendige Posts (Text + Bild/Video + Hashtags)
- Reiner Text-Content wird NICHT mehr in die Bibliothek gespeichert
- 2 alte Text-only Eintraege wurden geloescht, 14 vollstaendige Posts bleiben
- /api/lina/library gibt jetzt nur noch Posts MIT Bild oder Video zurueck

### Brevo Benachrichtigungen (04.04.2026)
- Alle Benachrichtigungen laufen ueber Brevo (ehemals Sendinblue)
- Brevo schickt E-Mails NUR an den Admin (Mathias: jedermannhandy@googlemail.com)
- Absender: LR Lifestyle Team <info@lr-lifestyle.info>
- Brevo wird NICHT vom Team genutzt - nur Admin bekommt Benachrichtigungen
- Typische Benachrichtigungen: "Partner XY hat Content erstellt", "Neuer Post wartet auf Freigabe"
- Die Partner bekommen ihre Infos ueber WhatsApp/Lina, NICHT ueber Brevo

### SuperProfile / Instagram Growth (04.04.2026)
- Neue Seite: /instagram-growth (Sidebar: "Instagram Growth")
- Anleitung fuer SuperProfile AutoDM + Lead Magnets + Link-in-bio
- Kein API-Endpoint noetig - ist eine reine Anleitungsseite im Dashboard

### Lina REST-API Endpoints (04.04.2026)
- 19 Endpoints insgesamt (alle getestet und deployed)
- Neue Endpoints seit Erstversion:
  - POST /api/lina/generate (Content generieren mit automatischem Bild)
  - GET /api/lina/templates (Content-Vorlagen)
  - POST /api/lina/hashtags (Smart Hashtags)
  - POST /api/lina/schedule (Posts planen)
  - GET /api/lina/weekly-plan (Wochenplan)
  - POST /api/lina/objection (Einwandbehandlung)
  - GET /api/lina/health (Health-Check)
  - GET /api/lina/pending/:partnerNumber (Wartende Posts)

### Freigabe-Logik (28.03.2026)
- Jeder Partner gibt seinen EIGENEN Content frei (nicht Admin fuer alle)
- Admin (Mathias) gibt nur seinen eigenen Content frei
- self-approve postet AUTOMATISCH auf Blotato
- Nicht-freigeschaltete User sehen eine "Zugang ausstehend" Seite

### Magic Link Auth (02.04.2026)
- Partner loggen sich NICHT ueber Manus OAuth ein
- Partner bekommen Magic Login-Links von Lina (24h gueltig)
- POST /api/lina/login-link generiert den Link
- Admin (Mathias) behaelt Manus OAuth als Login

### Dashboard-Seiten (Sidebar-Navigation)
Aktuelle Sidebar-Struktur:

**Erstellen:**
- Dashboard (/)
- Content Wizard (/wizard) - 3-Schritt KI-Magie
- Content erstellen (/generator) - Text + Bild + Video
- Content Remix (/remix) - 1 Thema → 5 Formate
- Lifestyle-Engine (/lifestyle) - Freiheit, Autos, Erfolg
- Karussell (/carousel) - Slide-Content erstellen
- Freigabe (/approval) - Posts pruefen & posten (Badge mit Pending-Count)
- Pipeline (/kanban) - Kanban-Board
- Bibliothek (/library) - Fertige Posts kopieren (NUR mit Bild/Video)

**Recherche:**
- Trend-Scanner (/trends) - Virale Trends finden
- Creator Spy (/creator-spy) - Was geht viral?
- Hashtag-Engine (/hashtags) - Smart Hashtags

**Planen:**
- Kalender (/calendar) - Posting-Zeitplan
- Monatsplan (/monthly-plan) - 30 Posts auf Knopfdruck
- Posting-Zeiten (/posting-times) - Optimale Zeiten

**Mehr:**
- Produktbilder (/products) - LR Produkte (226 Stueck)
- Vorlagen (/templates) - Templates & Hooks
- Content Queue (/queue) - Alle Posts
- A/B Tests (/ab-test) - Was performt besser?
- Analytics (/analytics) - Zahlen & Insights
- Analytics+ (/analytics-plus) - Heatmap & Trends
- Evergreen (/evergreen) - Top-Posts recyclen
- Feedback (/feedback) - Top-Performer

**System:**
- Blotato Command (/blotato) - 9 Kanaele steuern
- Leaderboard (/leaderboard) - Team-Rangliste
- Team-Aktivitaeten (/team-activity) - Echtzeit-Stream
- Einladungen (/invite-tokens) - Partner einladen
- Team (/team) - Partner verwalten
- Nutzer-Uebersicht (/admin-users) - Admin: Alle Partner
- Kosten-Uebersicht (/budget) - Budget & Verbrauch (NEU)
- Einstellungen (/settings) - Blotato & Branding
- Quick-Start (/onboarding) - Setup-Anleitung
- Instagram Growth (/instagram-growth) - AutoDM & Leads

### KI-Modelle (Stand 04.04.2026)
- Bilder: Nano Banana 2 (Google Gemini, $0.08/Bild) - fuer alle
- Videos Partner: Kling 3.0 Pro (5s mit Audio, $0.84/Video)
- Videos Admin: Veo 3.1 (Top-Qualitaet, $2.00/Video)
- Text: GoViralBitch API (kostenlos, eigene API)
- Hashtags: KI-generiert mit Trend-Daten
- Einwandbehandlung: LLM-basiert

### Blotato Integration
- 8 Accounts verbunden: Facebook, YouTube, Instagram, LinkedIn, Threads, 2x TikTok, Twitter
- Auto-Post nach Freigabe (wenn Partner Blotato-Key hat)
- One-Click Multi-Publish auf alle 9 Plattformen
- Kosten: 25€/Monat pro Partner (Partner zahlt selbst)

### Blotato API Platform-Regeln (WICHTIG - Fehlervermeidung!)
Jede Plattform braucht eigene Pflichtfelder im Target-Objekt. Ohne diese gibt es 400/422 Fehler!

| Plattform | Pflichtfelder im Target | Beispiel |
|-----------|------------------------|----------|
| Instagram | targetType | `{ targetType: "instagram" }` |
| Facebook  | targetType | `{ targetType: "facebook" }` |
| Twitter   | targetType | `{ targetType: "twitter" }` |
| Threads   | targetType | `{ targetType: "threads" }` |
| LinkedIn  | targetType | `{ targetType: "linkedin" }` |
| YouTube   | targetType, title, privacyStatus, shouldNotifySubscribers | `{ targetType: "youtube", title: "...", privacyStatus: "public", shouldNotifySubscribers: true }` |
| TikTok    | targetType, privacyLevel, disabledComments, disabledDuet, disabledStitch, isBrandedContent, isYourBrand, isAiGenerated | `{ targetType: "tiktok", privacyLevel: "PUBLIC_TO_EVERYONE", disabledComments: false, disabledDuet: false, disabledStitch: false, isBrandedContent: false, isYourBrand: false, isAiGenerated: true }` |

**Bekannte Fehler (gefixt am 04.04.2026):**
- YouTube 400: Fehlte title + privacyStatus → jetzt automatisch gesetzt
- TikTok 422: Fehlten 7 Pflichtfelder → jetzt automatisch gesetzt
- LinkedIn 422: Fehlte nichts, aber falsches Format → jetzt korrekt
- Scheduling 4 Tage voraus: Smart-Engine bevorzugte "beste" Tage statt nahe Tage → jetzt stark heute/morgen bevorzugt

### WhatsApp / Botpress Technische Limits
- **Single Choice Node: MAXIMAL 10 Buttons** (WhatsApp-Limit, nicht Botpress-Limit)
- Wenn mehr als 10 Optionen noetig: Aufteilen in Kategorien (z.B. "Erstellen", "Recherche", "Planen") → dann Untermenue
- Beispiel: Statt 15 Menupunkte in einer Liste → 3 Kategorien mit je 5 Unterpunkten
- Quick Replies: Max 3 Buttons (WhatsApp-Limit)
- Textnachrichten: Max 4096 Zeichen

### Produkt-Bibliothek
- 226 LR-Produkte mit Originalbildern
- Kategorien: Aloe Vera, Koerperpflege, ZEITGARD, Parfum, etc.
- Suchbar und filterbar im Dashboard

### Content-Sicherheit: Automatische Regeln (04.04.2026 - Abends)

**3 neue permanente Regeln im System eingebaut:**

#### 1. Hashtag-Limiter (automatisch vor jedem Blotato-Post)
- Instagram/TikTok/Threads/Twitter/Bluesky: max 5 Hashtags
- Facebook/LinkedIn/YouTube/Pinterest: max 10 Hashtags
- Ueberzaehlige Hashtags werden automatisch entfernt (die ersten N bleiben)
- Gilt fuer ALLE Posts die ueber Blotato gepostet werden

#### 2. Keine Preise (automatisch)
- LLM-Prompt enthalt jetzt Regel: "KEINE PREISE in Posts!"
- Quality Gate blockiert Posts mit Preisen (99 Euro, ab 15 Euro, etc.)
- Blotato-Posting entfernt automatisch Preise aus dem Text als letzte Sicherung
- Einstiegspreis wird NICHT mehr im Brand Voice Prompt erwaehnt
- Grund: Preise aendern sich, wirken unserioes, und sind rechtlich problematisch

#### 3. Echte Produktbilder (automatisch)
- Wenn das Topic ein LR-Produkt enthaelt (z.B. "Aloe Vera", "Mind Master", "Zeitgard"):
  → Automatisch echtes Produktbild aus der Datenbank (226 Bilder) verwenden
  → KEIN KI-Bild generieren fuer Produktposts!
- Wenn das Topic KEIN Produkt ist (z.B. "Freiheit", "Erfolg", "Business"):
  → KI-Bild wie bisher generieren
- Gilt fuer: Content Generator, Brand Voice Generator, Lina /api/lina/generate
- Erkannte Produkt-Keywords: aloe vera, mind master, zeitgard, colostrum, 5in1,
  protein power, lr lifetakt, super omega, pro balance, heart active, reishi plus,
  parfum, guido maria, bruce willis, starterpaket, drinking gel, nahrungsergaenzung, etc.

**Zusammenfassung der Content-Pipeline:**
1. LLM generiert Text (OHNE Preise, max 5 Hashtags)
2. Produkterkennung: Ist ein LR-Produkt im Topic? → Echtes Bild aus DB
3. Kein Produkt? → KI-Bild generieren (Nano Banana Pro)
4. Quality Gate prueft: Laenge, Brand Safety, Hook, CTA, Emojis, Hashtags, KEINE PREISE
5. Blotato-Posting: Nochmal Hashtag-Limit + Preis-Filter als letzte Sicherung
6. Post wird auf allen gewaehlten Plattformen gepostet

### Auto-Bild bei JEDEM Post (04.04.2026 - Abends, Update 2)

**WICHTIG: Kein Post ohne Bild!**
- Jeder Post bekommt AUTOMATISCH ein Bild - der User muss keinen Toggle aktivieren
- `autoGenerateImage` ist jetzt DEFAULT TRUE in allen Generatoren:
  - Content Generator (GoViralBitch)
  - Brand Voice Generator (LLM)
  - Batch/Wochenplan
  - A/B Tests
  - Monthly Plan
  - Trend-Scanner Autopilot
  - Lifestyle Engine
  - Lina /api/lina/generate
- Reihenfolge: Zuerst Produktbild-Check (echtes Bild aus DB) → dann KI-Bild
- Wenn Bildgenerierung fehlschlaegt, wird der Post trotzdem erstellt (Text-only als Fallback)

### TikTok: NUR JPG-Bilder (04.04.2026 - Abends, Update 2)

**TikTok akzeptiert KEINE PNG-Bilder!**
- TikTok braucht JPG-Bilder oder MP4-Videos
- PNG-Bilder fuehren zu "Media conversion failed" Fehler
- Loesung: Vor dem Posten auf TikTok muessen PNG-Bilder zu JPG konvertiert werden
- Das System macht das automatisch im Blotato-Posting-Flow

### E-Mail-Benachrichtigungen (Status 04.04.2026)

**Was funktioniert:**
- E-Mail bei Ablehnung eines Posts (ueber Brevo)

**Was NICHT funktioniert (TODO):**
- E-Mail bei Freigabe eines Posts
- E-Mail wenn neuer Content zur Freigabe bereit ist (Team-Notification)
- E-Mail wenn Post erfolgreich gepostet wurde

### Bekannte UI-Bugs (04.04.2026)

1. **Brand Voice Generator Button** auf der Live-Seite reagiert manchmal nicht auf Klick (kein API-Call wird ausgeloest)
2. **Lifestyle-Engine Batch** (5 Posts auf einmal) hat Timeout-Probleme auf dem Live-Server - Einzelgenerierung funktioniert
3. **Lina "Neue Features" Menue** zeigt keine Buttons/Optionen an nach Auswahl

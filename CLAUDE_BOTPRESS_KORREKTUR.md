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

### Produkt-Bibliothek
- 226 LR-Produkte mit Originalbildern
- Kategorien: Aloe Vera, Koerperpflege, ZEITGARD, Parfum, etc.
- Suchbar und filterbar im Dashboard

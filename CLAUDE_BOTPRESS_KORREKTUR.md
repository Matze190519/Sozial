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

## Zusaetzliche Endpoints

| Endpoint | Methode | Wofuer |
|----------|---------|--------|
| /api/lina/templates | GET | Vorlagen anzeigen |
| /api/lina/hashtags | POST {topic} | Hashtags generieren |
| /api/lina/weekly-plan | GET | Wochenplan anzeigen |
| /api/lina/products | GET | LR-Produkte anzeigen |
| /api/lina/library | GET | Bibliothek durchsuchen |

---

## Regeln
1. Das Team ist SCHON in Botpress. Niemand muss eingeladen werden.
2. Benachrichtigungen laufen ueber Brevo, NICHT ueber Manus.
3. Jeder Post der freigegeben wird, wird AUTOMATISCH auf Blotato gepostet.
4. Jeder generierte Post bekommt AUTOMATISCH ein Bild.
5. Partner loggen sich ueber Magic Links ein, NICHT ueber Manus OAuth.

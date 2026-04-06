# BOTPRESS LINA — VOLLSTÄNDIGE KORREKTUR (Stand: April 2026)

## Was du NICHT tun sollst:
- KEINE neuen Flows bauen
- KEINE neuen Menüpunkte erstellen
- KEINE Leute einladen (Team ist schon in Botpress drin!)
- NICHTS neu aufbauen

## Was du tun sollst:
Die bestehenden Botpress-Flows mit den sozialmedia.best API-Endpoints verbinden. Die Flows existieren bereits. Das Menü existiert bereits. Du musst NUR die Execute-Code-Blöcke in den bestehenden Flows aktualisieren.

---

## WIE CONTENT AUFS HANDY KOMMT — KEIN MAKE NÖTIG

**Kein Make, kein Webhook, kein Cron-Job nötig.**

Der Ablauf ist simpel:
1. Partner schreibt Lina auf WhatsApp
2. Lina ruft sozialmedia.best API auf (direkt per HTTP)
3. sozialmedia.best antwortet mit Text + Bild-URL
4. Lina sendet Text als Text-Node und Bild als **Image Card Node** an WhatsApp

**Warum kommen Bilder nicht an?**
Weil Botpress eine **Image Card Node** braucht — NICHT eine Text-Node mit `{{workflow.imageUrl}}`.
Eine Text-Node mit einer URL zeigt nur den Link, kein Bild.
Eine Image Card Node zeigt das echte Bild in WhatsApp.

---

## HAUPTMENÜ — KORREKTE STRUKTUR (max. 10 Buttons!)

Das Hauptmenü soll diese Optionen haben (Single Choice Node):

1. 📱 Content Hub öffnen
2. 📋 Fertiger Content abrufen
3. ✅ Content freigeben
4. 💡 Einwände meistern
5. ✍️ Content nach Wunsch
6. 📚 Bibliothek durchsuchen
7. 📊 Wochenplan anzeigen
8. 📈 Meine Statistiken
9. ❓ Hilfe & FAQ

**Hashtags sind KEIN eigener Menüpunkt** — sie stehen automatisch bei jedem generierten Post dabei.

---

## ALLE FLOWS MIT KORREKTEM CODE

### 1. Content Hub öffnen
Execute Code:
```javascript
const response = await axios.post('https://sozialmedia.best/api/lina/login-link', {
  partnerNumber: workflow.partnerNumber || user.partnerNumber || '00000',
  name: user.first_name || 'Partner',
  whatsappNumber: user.phone || ''
}, { headers: { 'Content-Type': 'application/json' } });
if (response.data.success) {
  workflow.loginUrl = response.data.loginUrl;
} else {
  workflow.loginUrl = 'https://sozialmedia.best';
}
```
Text-Node danach: "Hier ist dein persönlicher Link zum Content Hub (24h gültig): {{workflow.loginUrl}}"
Single Choice: ["Zurück zum Menü"]

---

### 2. Fertiger Content abrufen
Execute Code:
```javascript
const response = await axios.get('https://sozialmedia.best/api/lina/content', {
  params: { limit: 3 }
});
if (response.data.success && response.data.count > 0) {
  const posts = response.data.posts;
  workflow.post1Text = posts[0] ? posts[0].text.substring(0, 300) + '...' : '';
  workflow.post1Image = posts[0] ? (posts[0].imageUrl || '') : '';
  workflow.post1Id = posts[0] ? posts[0].id : '';
  workflow.post1Topic = posts[0] ? posts[0].topic : '';
  workflow.post2Text = posts[1] ? posts[1].text.substring(0, 300) + '...' : '';
  workflow.post2Image = posts[1] ? (posts[1].imageUrl || '') : '';
  workflow.post2Id = posts[1] ? posts[1].id : '';
  workflow.post2Topic = posts[1] ? posts[1].topic : '';
  workflow.hasContent = true;
  workflow.contentCount = response.data.count;
} else {
  workflow.hasContent = false;
}
```

Danach (wenn hasContent = true):
- **Text-Node:** "Hier sind {{workflow.contentCount}} fertige Posts für dich:"
- **Text-Node:** "📝 Post 1: {{workflow.post1Topic}}\n{{workflow.post1Text}}"
- **Image Card Node:** URL = `{{workflow.post1Image}}` (NUR wenn post1Image nicht leer!)
- **Text-Node:** "📝 Post 2: {{workflow.post2Topic}}\n{{workflow.post2Text}}"
- **Image Card Node:** URL = `{{workflow.post2Image}}` (NUR wenn post2Image nicht leer!)
- **Single Choice:** ["Post 1 freigeben", "Post 2 freigeben", "Zurück zum Menü"]

Wenn hasContent = false:
- **Text-Node:** "Aktuell kein fertiger Content verfügbar. Soll ich neuen Content für dich erstellen?"
- **Single Choice:** ["Ja, Content erstellen", "Zurück zum Menü"]

---

### 3. Content freigeben
Schritt 1 - Wartende Posts holen:
```javascript
const partnerNumber = workflow.partnerNumber || user.partnerNumber || '00000';
const response = await axios.get('https://sozialmedia.best/api/lina/pending/' + partnerNumber);
if (response.data.success && response.data.count > 0) {
  workflow.pendingPosts = response.data.posts;
  workflow.hasPending = true;
  workflow.pendingCount = response.data.count;
  // Erste 3 Posts als Buttons vorbereiten
  workflow.pending1Id = response.data.posts[0] ? response.data.posts[0].id : '';
  workflow.pending1Topic = response.data.posts[0] ? response.data.posts[0].topic : '';
  workflow.pending2Id = response.data.posts[1] ? response.data.posts[1].id : '';
  workflow.pending2Topic = response.data.posts[1] ? response.data.posts[1].topic : '';
  workflow.pending3Id = response.data.posts[2] ? response.data.posts[2].id : '';
  workflow.pending3Topic = response.data.posts[2] ? response.data.posts[2].topic : '';
} else {
  workflow.hasPending = false;
}
```

Wenn hasPending = true:
- **Text-Node:** "Du hast {{workflow.pendingCount}} Posts die auf Freigabe warten:"
- **Single Choice:** ["{{workflow.pending1Topic}}", "{{workflow.pending2Topic}}", "{{workflow.pending3Topic}}", "Zurück zum Menü"]
- Nutzer wählt → speichere in `workflow.selectedPostId`

Schritt 2 - Freigeben:
```javascript
const partnerNumber = workflow.partnerNumber || user.partnerNumber || '00000';
const response = await axios.post('https://sozialmedia.best/api/lina/self-approve', {
  partnerNumber: partnerNumber,
  postId: workflow.selectedPostId
}, { headers: { 'Content-Type': 'application/json' } });
workflow.approveResult = response.data.message || 'Post freigegeben!';
workflow.published = response.data.published;
```
Text-Node: "{{workflow.approveResult}}"
Single Choice: ["Weiteren Post freigeben", "Zurück zum Menü"]

---

### 4. Einwände meistern
Zuerst Single Choice mit häufigen Einwänden:
["Keine Zeit", "Kein Geld", "Kein Interesse", "Eigenen Einwand eingeben", "Zurück zum Menü"]

Execute Code (nach Auswahl):
```javascript
const objection = workflow.selectedObjection || workflow.userObjection || 'Keine Zeit';
const response = await axios.post('https://sozialmedia.best/api/lina/objection', {
  objection: objection,
  context: 'Network Marketing / LR Health & Beauty',
  partnerName: user.first_name || 'Partner'
}, { headers: { 'Content-Type': 'application/json' } });
if (response.data.success) {
  workflow.objectionResponse = response.data.response.substring(0, 1000);
} else {
  workflow.objectionResponse = 'Fehler beim Laden der Antwort.';
}
```
Text-Node: "{{workflow.objectionResponse}}"
Single Choice: ["Weiteren Einwand", "Zurück zum Menü"]

---

### 5. Content nach Wunsch
Zuerst fragen welche Plattform:
Single Choice: ["Instagram", "TikTok", "Facebook", "Threads", "Zurück zum Menü"]
→ speichere in `workflow.selectedPlatform`

Dann fragen welches Thema:
Single Choice: ["Aloe Vera", "Mind Master", "Zeitgard", "Autokonzept", "Lifestyle", "Eigenes Thema eingeben"]
→ speichere in `workflow.userTopic`

Execute Code:
```javascript
const response = await axios.post('https://sozialmedia.best/api/lina/generate', {
  topic: workflow.userTopic || 'LR Lifestyle',
  platform: workflow.selectedPlatform || 'instagram',
  contentType: 'post'
}, { headers: { 'Content-Type': 'application/json' } });
if (response.data.success) {
  workflow.generatedContent = (response.data.content || '').substring(0, 500) + '...';
  workflow.generatedImage = response.data.imageUrl || '';
  workflow.generatedPostId = response.data.postId;
  workflow.resultMessage = response.data.message || 'Content erstellt!';
} else {
  workflow.resultMessage = 'Fehler beim Erstellen. Bitte nochmal versuchen.';
  workflow.generatedImage = '';
}
```
- **Text-Node:** "{{workflow.resultMessage}}"
- **Text-Node:** "Vorschau: {{workflow.generatedContent}}"
- **Image Card Node:** URL = `{{workflow.generatedImage}}` (NUR wenn nicht leer!)
- **Single Choice:** ["Post freigeben", "Nochmal generieren", "Zurück zum Menü"]

---

### 6. Bibliothek durchsuchen
Execute Code:
```javascript
const response = await axios.get('https://sozialmedia.best/api/lina/library', {
  params: { limit: 5 }
});
if (response.data.success && response.data.count > 0) {
  const items = response.data.items;
  workflow.lib1Title = items[0] ? items[0].title : '';
  workflow.lib1Text = items[0] ? (items[0].text || '').substring(0, 200) + '...' : '';
  workflow.lib1Image = items[0] ? (items[0].imageUrl || '') : '';
  workflow.lib1Video = items[0] ? (items[0].videoUrl || '') : '';
  workflow.lib2Title = items[1] ? items[1].title : '';
  workflow.lib2Text = items[1] ? (items[1].text || '').substring(0, 200) + '...' : '';
  workflow.lib2Image = items[1] ? (items[1].imageUrl || '') : '';
  workflow.lib3Title = items[2] ? items[2].title : '';
  workflow.lib3Text = items[2] ? (items[2].text || '').substring(0, 200) + '...' : '';
  workflow.lib3Image = items[2] ? (items[2].imageUrl || '') : '';
  workflow.hasLibrary = true;
  workflow.libCount = response.data.count;
} else {
  workflow.hasLibrary = false;
}
```

Wenn hasLibrary = true:
- **Text-Node:** "Bibliothek ({{workflow.libCount}} Posts):"
- **Text-Node:** "1️⃣ {{workflow.lib1Title}}\n{{workflow.lib1Text}}"
- **Image Card Node:** URL = `{{workflow.lib1Image}}` (NUR wenn nicht leer!)
- **Text-Node:** "2️⃣ {{workflow.lib2Title}}\n{{workflow.lib2Text}}"
- **Image Card Node:** URL = `{{workflow.lib2Image}}` (NUR wenn nicht leer!)
- **Text-Node:** "3️⃣ {{workflow.lib3Title}}\n{{workflow.lib3Text}}"
- **Image Card Node:** URL = `{{workflow.lib3Image}}` (NUR wenn nicht leer!)
- **Single Choice:** ["Zurück zum Menü"]

---

### 7. Wochenplan anzeigen
Execute Code:
```javascript
const response = await axios.get('https://sozialmedia.best/api/lina/weekly-plan', {
  params: { platform: 'instagram' }
});
if (response.data.success) {
  const tage = response.data.tage || [];
  workflow.wochenplan = tage.map(function(t) {
    return t.tag + ': ' + t.besteZeit + (t.istTopTag ? ' ⭐' : '');
  }).join('\n');
  workflow.topTage = (response.data.topTage || []).join(', ');
  workflow.tipp = response.data.tipp || '';
} else {
  workflow.wochenplan = 'Wochenplan nicht verfügbar.';
}
```
Text-Node: "📅 Bester Posting-Zeitplan für Instagram:\n\n{{workflow.wochenplan}}\n\n💡 {{workflow.tipp}}"
Single Choice: ["Zurück zum Menü"]

---

### 8. Meine Statistiken
Execute Code:
```javascript
const partnerNumber = workflow.partnerNumber || user.partnerNumber || '00000';
const response = await axios.get('https://sozialmedia.best/api/lina/partner-stats/' + partnerNumber);
if (response.data.success) {
  const s = response.data.stats;
  workflow.statsText = 'Deine Stats:\n✅ Freigegeben: ' + s.approved + '\n⏳ Ausstehend: ' + s.pending + '\n🚀 Veröffentlicht: ' + s.published + '\n📝 Gesamt: ' + s.totalPosts;
} else {
  workflow.statsText = 'Statistiken nicht verfügbar. Bitte zuerst einloggen.';
}
```
Text-Node: "{{workflow.statsText}}"
Single Choice: ["Zurück zum Menü"]

---

### 10. Hilfe & FAQ
Execute Code:
```javascript
const response = await axios.get('https://sozialmedia.best/api/lina/status');
if (response.data.success) {
  const s = response.data.stats;
  workflow.systemStatus = 'System: Online ✅\nPosts gesamt: ' + s.totalPosts + '\nAuf Freigabe: ' + s.pendingApproval + '\nGeplant: ' + s.scheduled;
} else {
  workflow.systemStatus = 'System: Wird geprüft...';
}
```
Text-Node: "{{workflow.systemStatus}}\n\nFragen? Schreib uns: jedermannhandy@googlemail.com"
Single Choice: ["Content Hub öffnen", "Zurück zum Menü"]

---

## KRITISCHE REGELN

1. **Image Card Node** für Bilder — NIEMALS Text-Node mit Bild-URL!
2. **Video Card Node** für Videos — NIEMALS Text-Node mit Video-URL!
3. Bedingte Image Cards: Nur senden wenn URL nicht leer ist (Condition: `{{workflow.imageUrl}} !== ''`)
4. Max. **10 Buttons** pro Single Choice Node
5. Jeder Flow endet mit **"Zurück zum Menü"** Button
6. Kein Tippen nötig — immer Buttons anbieten
7. Das Team ist SCHON in Botpress — niemand einladen!

---

## CHANGELOG

### April 2026
- Content-Endpoint gibt jetzt approved + scheduled Posts zurück
- Bibliothek gibt Items-Array zurück (nicht posts-Array!)
- Alle Flows mit Image Card Nodes für Bilder
- Menüstruktur auf 10 Punkte optimiert
- Wochenplan, Hashtags, Statistiken als eigene Menüpunkte

# BOTPRESS REPARATUR — SOFORT AUSFÜHREN

Du bist ein Botpress-Experte. Führe alle Schritte selbst per Browser-Automation aus.
Keine Anleitungen. Keine Erklärungen. Kein "mach es selbst".
Du bist erst fertig wenn alle 4 Fehler behoben sind und auf WhatsApp funktionieren.

---

## SYSTEM-ÜBERSICHT

- **Bot:** Lina vom LR Lifestyle Team
- **Kanal:** WhatsApp Business
- **API-Base:** https://sozialmedia.best/api/lina/
- **Botpress URL:** https://app.botpress.cloud

---

## 4 KONKRETE FEHLER DIE DU JETZT FIXEN MUSST

### FEHLER 1: Bibliothek zeigt `*Bibliothek:* *1. *` (leerer Text)

**Was passiert:** Flow ruft `/api/lina/library` auf, bekommt Daten, aber der Text-Node ist falsch konfiguriert.

**Fix:**
1. Öffne Flow: "Bibliothek durchsuchen"
2. Finde den Execute-Code-Node der die API aufruft
3. Der Node muss so aussehen:
```javascript
const response = await axios.get('https://sozialmedia.best/api/lina/library');
const items = response.data.items || [];

if (items.length === 0) {
  workflow.libraryText = '📚 Die Bibliothek ist noch leer. Bitte zuerst Content freigeben.';
} else {
  let text = '📚 *Bibliothek:*\n\n';
  items.slice(0, 5).forEach((item, i) => {
    text += `*${i+1}.* ${item.caption || item.title || 'Kein Titel'}\n`;
    if (item.mediaUrl) text += `🖼️ Bild: ${item.mediaUrl}\n`;
    text += '\n';
  });
  workflow.libraryText = text;
}
```
4. Der Text-Node danach muss `{{workflow.libraryText}}` ausgeben — KEIN statischer Text

---

### FEHLER 2: Fertiger Content zeigt nur Titel-Liste ohne Bilder

**Was passiert:** `/api/lina/content` gibt Posts zurück, aber Bilder werden als Text-URL gesendet statt als echtes Bild.

**Fix:**
1. Öffne Flow: "Fertiger Content abrufen"
2. Finde den Execute-Code-Node
3. Ersetze ihn komplett durch:
```javascript
const response = await axios.get('https://sozialmedia.best/api/lina/content');
const posts = response.data.posts || [];

if (posts.length === 0) {
  workflow.contentText = '📋 Noch kein freigegebener Content vorhanden.';
  workflow.hasContent = false;
} else {
  workflow.contentPosts = posts.slice(0, 3);
  workflow.hasContent = true;
  workflow.contentText = `✅ *${posts.length} Posts verfügbar*`;
}
```
4. Nach dem Execute-Code-Node: Füge für jeden Post einen **Image Card Node** ein (NICHT Text-Node):
   - Type: Image
   - Image URL: `{{workflow.contentPosts[0].mediaUrl}}`
   - Title: `{{workflow.contentPosts[0].caption}}`
   - Subtitle: `{{workflow.contentPosts[0].hashtags}}`

**WICHTIG:** Für WhatsApp MUSS ein Image Card Node verwendet werden, kein Text-Node mit URL.

---

### FEHLER 3: Content freigeben → `The response could not be captured`

**Was passiert:** Der Flow für "Content freigeben" hat einen Fehler — wahrscheinlich ein leerer Capture-Node oder falscher API-Call.

**Fix:**
1. Öffne Flow: "Content freigeben"
2. Lösche alle bestehenden Nodes
3. Baue den Flow neu:
   - **Node 1 (Text):** "Bitte gib die Post-ID ein die du freigeben möchtest:"
   - **Node 2 (Capture):** Speichere Eingabe als `workflow.postId`
   - **Node 3 (Execute Code):**
```javascript
try {
  const response = await axios.post('https://sozialmedia.best/api/lina/approve', {
    postId: workflow.postId
  });
  workflow.approveResult = response.data.success 
    ? '✅ Post wurde freigegeben!' 
    : '❌ Fehler beim Freigeben.';
} catch(e) {
  workflow.approveResult = '❌ Fehler: ' + e.message;
}
```
   - **Node 4 (Text):** `{{workflow.approveResult}}`
   - **Node 5 (Single Choice):** "Zurück zum Menü"

---

### FEHLER 4: Content nach Wunsch → `Are you sure you want to cancel?`

**Was passiert:** Der Flow hat einen falschen Cancel-Node oder ist mit einem anderen Flow verknüpft.

**Fix:**
1. Öffne Flow: "Content nach Wunsch"
2. Entferne alle Cancel/Abort-Nodes
3. Der Flow muss so aussehen:
   - **Node 1 (Text):** "Welches Thema soll der Content haben?"
   - **Node 2 (Single Choice):**
     - Autokonzept
     - Lifestyle
     - Gesundheit
     - Eigenes Thema eingeben
   - **Node 3 (Execute Code):**
```javascript
const topic = workflow.selectedTopic || 'Allgemein';
const response = await axios.post('https://sozialmedia.best/api/lina/generate', {
  topic: topic,
  type: 'post'
});
workflow.generatedContent = response.data.content || 'Fehler beim Generieren.';
```
   - **Node 4 (Text):** `{{workflow.generatedContent}}`
   - **Node 5 (Single Choice):** "Zurück zum Menü"

---

## HAUPTMENÜ — MUSS GENAU SO AUSSEHEN

Der Hauptmenü-Flow muss diese 9 Optionen haben (Single Choice Node):

1. 📋 Fertiger Content abrufen
2. ✅ Content freigeben
3. 🖊️ Content nach Wunsch
4. 📚 Bibliothek durchsuchen
5. 📅 Wochenplan anzeigen
6. 📊 Meine Statistiken
7. 🎯 Einwände meistern
8. 🔄 Content Hub öffnen
9. ❓ Hilfe & FAQ

**KEIN** "Neue Features" Menüpunkt — dieser muss entfernt werden.

---

## FERTIG-KRITERIEN

Du bist erst fertig wenn:
- [ ] Bibliothek zeigt echte Post-Titel (kein leerer Text)
- [ ] Fertiger Content zeigt Bilder als echte Bilder (Image Card)
- [ ] Content freigeben funktioniert ohne Fehler
- [ ] Content nach Wunsch fragt nach Thema (kein Cancel-Dialog)
- [ ] Hauptmenü hat 9 Punkte ohne "Neue Features"

---

## REGELN

- Keine Preise nennen
- Kein Tippen erforderlich — immer Single Choice Nodes
- Immer "Zurück zum Menü" am Ende jedes Flows
- WhatsApp-Limit: max. 1000 Zeichen pro Nachricht
- Bilder IMMER als Image Card Node, nie als Text-URL

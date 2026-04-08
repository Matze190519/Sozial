# Claude Code Prompt: Lina Bot — WhatsApp Medien Fix

## WICHTIG: Lies dieses Dokument vollständig bevor du irgendetwas änderst

---

## 1. IST-ZUSTAND (was wirklich existiert)

### Bestehende Flows im Bot (72 Flows total)

**Funktionierende Flows (NICHT ANFASSEN):**
- `Partner - Bild erstellen` (17 Nodes) — sendet an Make.com Webhook, Make sendet Bild zurück an WhatsApp
- `Partner - Video erstellen` (12 Nodes) — sendet an Make.com Webhook, Make sendet Video zurück an WhatsApp
- `Schnellzugriff` (28 Nodes) — Untermenü mit Startersets, Fast Track, Business Track, etc.
- `Hauptmenü` (19 Nodes) — Hauptnavigation des Bots

**Duplikat-Flows (können gelöscht werden, sind Testkopien):**
- `Partner - Bild erstellen - Copy1` (14 Nodes)
- `Partner - Bild erstellen - Copy2` (14 Nodes)
- `Partner - Bild erstellen - Manus Test` (14 Nodes)
- `Partner - Video erstellen - Copy1` (11 Nodes)
- `Partner - Video erstellen - Maunus Test` (11 Nodes)
- `New workflow1`, `New workflow2`, `New workflow3` (je 3 Nodes, leer)

**Neue sozialmedia.best Flows (aktuell kaputt — das ist dein Auftrag):**
- Die neuen Menüpunkte unter "Neue Features" im Hauptmenü funktionieren nicht auf WhatsApp

---

## 2. WIE DER FUNKTIONIERENDE FLOW ARBEITET

### Partner - Bild erstellen (funktioniert korrekt auf WhatsApp)

**Ablauf:**
1. User wählt Produkt oder Thema
2. Execute-Code-Node sendet Payload an Make.com Webhook:
```javascript
const webhookUrl = 'https://hook.eu2.make.com/kxeurxr4hvta1b9sxhdmirf9mmugweo'
const payload = {
  userId: user.id,
  phoneNumber: event.tags.conversation['whatsapp:userPhone'],
  imageUrl: workflow.imageProductURL,
  prompt: workflow.rawPrompt,
  flowType: "C",
  conversationId: event.conversationId
}
await axios.post(webhookUrl, payload)
```
3. Make.com empfängt den Webhook, generiert das Bild via API
4. Make.com sendet das Bild als **echte WhatsApp Media Message** zurück (nicht als Link!)
5. Der Bot wartet auf die Antwort von Make.com

**Das ist der Schlüssel:** Make.com sendet das Bild direkt als WhatsApp-Mediendatei. Kein Link, kein Text.

### Partner - Video erstellen (funktioniert korrekt auf WhatsApp)

**Webhook-URL:** `https://hook.eu2.make.com/saen9rw8i621u4akaolpj7ho1olbdxaj`

**Payload:**
```javascript
const payload = {
  selectedProduct: workflow.selectedProduct,
  promptImage: workflow.promptImage,
  promptText: workflow.promptText,
  conversationId: event.conversationId,
  userId: event.userId,
  phoneNumber: event.tags.conversation['whatsapp:userPhone']
}
```

---

## 3. DAS PROBLEM MIT DEN NEUEN FLOWS

Die neuen Flows für sozialmedia.best rufen die API `https://sozialmedia.best/api/lina/...` auf und geben die `imageUrl` als **Text-Node** aus. Das funktioniert im Webchat, aber **nicht auf WhatsApp**.

**WhatsApp braucht zwingend:**
- Entweder: Make.com sendet das Bild als Media Message
- Oder: Der Bot nutzt einen **Image Card Node** (nicht Text-Node) mit der direkten Bild-URL

---

## 4. DEIN AUFTRAG (NUR DIESE FLOWS ANFASSEN)

### Aufgabe: Neue sozialmedia.best Flows auf WhatsApp-kompatibel umbauen

**Betroffene Flows:**
1. Fertiger Content abrufen → zeigt Posts aus der DB
2. Bibliothek durchsuchen → zeigt Content aus der Bibliothek
3. Content freigeben → gibt Content für Posting frei
4. Schnellpost erstellen → erstellt schnellen Post

**Was du tun sollst:**

### A) Für "Fertiger Content abrufen" und "Bibliothek":

Statt Text-Node mit imageUrl → **Image Card Node** verwenden:

```javascript
// Execute Code Node: Daten von API holen
const response = await axios.get('https://sozialmedia.best/api/lina/content?status=approved&limit=5')
const posts = response.data.posts

// Speichere ersten Post in workflow-Variablen
if (posts && posts.length > 0) {
  workflow.currentPost = posts[0]
  workflow.currentImageUrl = posts[0].imageUrl
  workflow.currentCaption = posts[0].caption
  workflow.currentPostId = posts[0].id
}
```

Dann **Image Card Node** (nicht Text-Node!):
- Image URL: `{{workflow.currentImageUrl}}`
- Title: `{{workflow.currentCaption}}`

Dann Text-Node für Caption:
```
📝 Caption:
{{workflow.currentCaption}}

📋 Zum Kopieren — tippe einfach den Text ab oder nutze "Weiterleiten"
```

### B) Für "Content freigeben":

```javascript
// Execute Code Node
const postId = workflow.currentPostId
const response = await axios.post('https://sozialmedia.best/api/lina/approve', {
  postId: postId,
  partnerPhone: event.tags.conversation['whatsapp:userPhone']
})
```

Dann Text-Node: `✅ Content wurde freigegeben und wird automatisch gepostet!`

### C) Für "Schnellpost erstellen":

Nutze das gleiche Prinzip wie "Partner - Bild erstellen":
1. User wählt Thema (Motivation, Erfolg, Produkt, etc.)
2. Execute Code → sendet an Make.com Webhook
3. Make.com generiert Bild und sendet es direkt als WhatsApp Media

**Webhook für Schnellpost:** Erstelle ein neues Make.com Szenario das:
- Webhook empfängt
- `https://sozialmedia.best/api/lina/generate` aufruft
- Das generierte Bild als WhatsApp Media Message zurücksendet

---

## 5. TESTEN

**Wichtig:** Du kannst WhatsApp NICHT direkt testen. Aber du kannst:

1. Die API-Endpunkte direkt testen:
```bash
curl https://sozialmedia.best/api/lina/content?status=approved&limit=1
curl https://sozialmedia.best/api/lina/health
```

2. Den Botpress Emulator nutzen um die Flow-Logik zu prüfen

3. Dem User (Mathias) sagen: "Bitte teste jetzt auf WhatsApp" — er testet auf seinem Handy

**Niemals im Webchat testen und sagen "es funktioniert" — nur WhatsApp zählt!**

---

## 6. WAS DU NICHT ANFASSEN DARFST

- `Partner - Bild erstellen` (Original) — funktioniert, nicht ändern
- `Partner - Video erstellen` (Original) — funktioniert, nicht ändern
- `Schnellzugriff` — funktioniert, nicht ändern
- `Hauptmenü` — nur minimale Änderungen wenn nötig
- Alle Flows mit "Copy1", "Copy2", "Manus Test", "Maunus Test" — können gelöscht werden, aber nicht die Originale

---

## 7. SPEICHERN

Speichere alle Änderungen im Repo: `Matze190519/sozialmedia-best`, Branch `main`

Dokumentiere was du geändert hast in: `docs/changelog.md`

---

## 8. ZUSAMMENFASSUNG

| Problem | Ursache | Fix |
|---------|---------|-----|
| Bilder kommen nicht auf WhatsApp an | Text-Node statt Image Card Node | Image Card Node mit `{{workflow.currentImageUrl}}` |
| Videos kommen nicht an | Kein Make.com Szenario für neue Flows | Neues Make.com Szenario nach Vorbild des Video-Flows |
| Content freigeben funktioniert nicht | API-Aufruf fehlt oder falsch | Execute Code Node mit axios.post an /api/lina/approve |
| Menü springt zurück zum Hauptmenü | Falsche Transitions in Nodes | Transitions prüfen und korrigieren |

**Goldene Regel:** Was auf WhatsApp ankommt, muss als echte Mediendatei gesendet werden — nicht als URL-Text.

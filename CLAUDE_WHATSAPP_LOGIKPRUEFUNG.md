# Claude Code — Vollständige Logikprüfung: Neue Features (WhatsApp)

## Was ich auf den WhatsApp-Screenshots sehe (Ist-Zustand)

### Bibliothek (Flow: Bibliothek / Index 28)
**Was ankommt:**
- Text: "Trend: Test Trend" + Caption (abgeschnitten mit "...") + Hashtags + "--- 1/10 ---"
- Buttons: "Naechster Inhalt" / "Zurueck zum Menue"
- Kein Bild, kein Video

**Was fehlt:**
- Das Bild zum Post kommt NICHT an — obwohl `imageUrl` in der API vorhanden ist
- Caption ist abgeschnitten — der vollständige Text muss kommen
- "Naechster Inhalt" funktioniert (zeigt Post 2/10, 3/10 usw.) ✅
- Aber: Bild kommt bei keinem Post an

**Diagnose:** Der Image Card Node ist konfiguriert aber die `workflow.post1_image` Variable ist leer. Der Execute Code Node setzt sie nicht korrekt.

---

### Content freigeben (Flow: Content_freigeben / Index 21)
**Was ankommt:**
- "Bitte waehle eine Option." + "Naechster Inhalt" / "Zurueck zum Menue"
- Dann zeigt er Posts als TEXT (kein Bild) mit Slide-Skripten
- Ein Video kommt an (Mercedes-Auto) ✅ — das ist ein Zufallstreffer

**Was fehlt:**
- Kein "Post 1 freigeben" Button
- Kein "Alle freigeben" Button
- Keine Freigabe-Funktion — der ApproveContent Node ruft die API nicht auf
- Posts werden als roher Text gezeigt (Slide-Skripte statt fertige Posts)

**Diagnose:** Der Flow zeigt Content aus der falschen API-Quelle. Er holt Skripte statt fertige Posts. Außerdem fehlen die Freigabe-Buttons komplett.

---

## Was du tun musst — Schritt für Schritt

### SCHRITT 1: Bibliothek — Bild anzeigen

Öffne Flow "Bibliothek" (Index 28). Finde den Execute Code Node der die API aufruft.

**Das Problem:** Die Variable `workflow.post1_image` wird nicht gesetzt. Prüfe den Code:

```javascript
// FALSCH — so setzt der Code die Variable NICHT:
const posts = response.data
workflow.post1_image = posts[0].imageUrl  // ← Prüfe ob das wirklich so steht

// RICHTIG muss es sein:
const data = response.data
const posts = data.posts || data  // API gibt { posts: [...] } zurück
if (posts && posts.length > 0) {
  const post = posts[workflow.currentIndex || 0]
  workflow.post1_image = post.imageUrl || post.image_url || ''
  workflow.post1_caption = post.caption || post.content || ''
  workflow.post1_id = post.id || ''
  workflow.post1_title = post.title || post.trend || ''
  workflow.totalPosts = posts.length
}
```

**Teste die API direkt:**
```
GET https://sozialmedia.best/api/lina/library?limit=10
```
Schaue welches Feld das Bild enthält: `imageUrl`, `image_url`, `mediaUrl` oder anders.

Dann stelle sicher dass der Image Card Node diese Variable nutzt:
- Image URL: `{{workflow.post1_image}}` mit `isExpression: true`

---

### SCHRITT 2: Content freigeben — richtige Posts zeigen + Freigabe-Button

**Das Problem:** Der Flow holt Skripte/Story-Content statt fertige, freigegebene Posts.

**Richtige API-URL:**
```
GET https://sozialmedia.best/api/lina/content?status=pending&limit=5
```
(nicht `library` und nicht `generate` — sondern `content` mit `status=pending`)

**Execute Code muss sein:**
```javascript
const response = await axios.get('https://sozialmedia.best/api/lina/content?status=pending&limit=5')
const data = response.data
const posts = data.posts || []
if (posts.length > 0) {
  const post = posts[0]
  workflow.approve_image = post.imageUrl || ''
  workflow.approve_caption = post.caption || ''
  workflow.approve_id = post.id || ''
  workflow.approve_total = posts.length
  workflow.approve_index = 0
  workflow.approve_all_ids = posts.map(p => p.id).join(',')
}
```

**Image Card Node:** `{{workflow.approve_image}}` mit `isExpression: true`

**Text Node danach:**
```
📋 Post {{workflow.approve_index + 1}} von {{workflow.approve_total}}

{{workflow.approve_caption}}
```

**Buttons:**
- "✅ Diesen freigeben" → ApproveContent Node
- "✅ Alle freigeben" → ApproveAll Node  
- "⏭️ Nächster" → nächster Post
- "↩️ Zurück zum Menü" → Hauptmenü

**ApproveContent Node (Execute Code):**
```javascript
const response = await axios.post('https://sozialmedia.best/api/lina/approve', {
  postId: workflow.approve_id,
  partnerPhone: event.tags.conversation['whatsapp:userPhone'] || ''
})
workflow.approve_result = response.data.success ? '✅ Freigegeben!' : '❌ Fehler'
```

---

### SCHRITT 3: Vollständige Caption anzeigen (nicht abgeschnitten)

WhatsApp schneidet Text bei ca. 1024 Zeichen ab. Wenn die Caption länger ist, muss sie aufgeteilt werden:

```javascript
const caption = post.caption || ''
if (caption.length > 900) {
  workflow.caption_part1 = caption.substring(0, 900) + '...'
  workflow.caption_part2 = '...' + caption.substring(900)
  workflow.caption_has_part2 = true
} else {
  workflow.caption_part1 = caption
  workflow.caption_has_part2 = false
}
```

Dann zwei Text-Nodes: erst `{{workflow.caption_part1}}`, dann (wenn `caption_has_part2`) `{{workflow.caption_part2}}`.

---

### SCHRITT 4: API-Endpunkte prüfen bevor du anfängst

Führe diese Checks aus bevor du irgendetwas änderst:

```bash
# Bibliothek API
curl https://sozialmedia.best/api/lina/library?limit=3

# Content API (pending)
curl https://sozialmedia.best/api/lina/content?status=pending&limit=3

# Health Check
curl https://sozialmedia.best/api/lina/health
```

Schaue dir die JSON-Antwort an und prüfe:
- Wie heißt das Bild-Feld? (`imageUrl`, `image_url`, `mediaUrl`, `thumbnail`?)
- Wie heißt das Caption-Feld? (`caption`, `content`, `text`?)
- Wie heißt die ID? (`id`, `postId`, `_id`?)

Passe den Code entsprechend an.

---

### SCHRITT 5: Testen und Speichern

1. Ändere den Code
2. Speichere den Bot (Save)
3. Publishe den Bot (Publish)
4. Sage Mathias: "Bitte teste jetzt auf WhatsApp — Bibliothek und Content freigeben"
5. Warte auf Feedback — **nicht** im Webchat testen

---

## Was du NICHT anfassen darfst

- Flow "Partner - Bild erstellen" (Original) — funktioniert
- Flow "Partner - Video erstellen" (Original) — funktioniert
- Flow "Schnellzugriff" — funktioniert
- Alle anderen Flows außer "Bibliothek" und "Content_freigeben"

---

## Zusammenfassung der Fehler

| Flow | Problem | Fix |
|------|---------|-----|
| Bibliothek | `workflow.post1_image` leer → kein Bild | API-Response-Struktur prüfen, Variable korrekt setzen |
| Content freigeben | Falsche API-Quelle (Skripte statt Posts) | `content?status=pending` nutzen |
| Content freigeben | Freigabe-Buttons fehlen | ApproveContent Node mit axios.post |
| Alle | Caption abgeschnitten | Text aufteilen wenn > 900 Zeichen |

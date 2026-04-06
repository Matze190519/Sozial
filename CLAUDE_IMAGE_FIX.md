# BOTPRESS IMAGE FIX — NUR DIESER EINE FIX

## PROBLEM

Die API gibt korrekte Bild-URLs zurück. Botpress zeigt sie aber nicht als Bilder an.

API-Antwort von `https://sozialmedia.best/api/lina/content`:
```json
{
  "posts": [
    {
      "id": 1140001,
      "text": "Fahrst du noch oder verdienst du...",
      "imageUrl": "https://d2xsxph8kpxj0f.cloudfront.net/310419663029098351/UJZxdmp3sY63YUqiVd8uaj/generated-images/1775459724907-rcauex.png",
      "videoUrl": null
    }
  ]
}
```

Das Feld heißt **`imageUrl`** (nicht `mediaUrl`).

---

## WAS DU ÄNDERN MUSST

### Im Flow "Fertiger Content abrufen":

**Schritt 1:** Finde den Execute-Code-Node der die API aufruft.

Stelle sicher dass er so aussieht:
```javascript
const response = await axios.get('https://sozialmedia.best/api/lina/content');
const posts = response.data.posts || [];

// Speichere die ersten 3 Posts
workflow.post1_text = posts[0] ? posts[0].text : '';
workflow.post1_image = posts[0] ? posts[0].imageUrl : '';
workflow.post1_title = posts[0] ? (posts[0].topic || 'Post 1') : '';

workflow.post2_text = posts[1] ? posts[1].text : '';
workflow.post2_image = posts[1] ? posts[1].imageUrl : '';
workflow.post2_title = posts[1] ? (posts[1].topic || 'Post 2') : '';

workflow.post3_text = posts[2] ? posts[2].text : '';
workflow.post3_image = posts[2] ? posts[2].imageUrl : '';
workflow.post3_title = posts[2] ? (posts[2].topic || 'Post 3') : '';

workflow.totalPosts = posts.length;
```

**Schritt 2:** Nach dem Execute-Code-Node füge für jeden Post einen **Image Card Node** ein:

- **Image Card Node 1:**
  - Image URL: `{{workflow.post1_image}}`
  - Title: `{{workflow.post1_title}}`
  - Subtitle: `{{workflow.post1_text}}`

- **Image Card Node 2:**
  - Image URL: `{{workflow.post2_image}}`
  - Title: `{{workflow.post2_title}}`
  - Subtitle: `{{workflow.post2_text}}`

- **Image Card Node 3:**
  - Image URL: `{{workflow.post3_image}}`
  - Title: `{{workflow.post3_title}}`
  - Subtitle: `{{workflow.post3_text}}`

**WICHTIG:** Image Card Node, NICHT Text-Node. Text-Node zeigt nur die URL als Text.

---

### Im Flow "Bibliothek durchsuchen":

API: `https://sozialmedia.best/api/lina/library`

Antwort-Struktur:
```json
{
  "items": [
    {
      "id": 390004,
      "title": "Lr Autokonzept",
      "text": "Träumst du von deinem eigenen Porsche...",
      "imageUrl": "https://d2xsxph8kpxj0f.cloudfront.net/..."
    }
  ]
}
```

Gleiche Lösung: Execute-Code-Node speichert `items[0].imageUrl` in `workflow.item1_image`, dann Image Card Node.

---

## WAS DU NICHT ANFASSEN DARFST

- Alle anderen Flows
- Die Nutzer-Verifikation
- Das Hauptmenü
- Irgendwas anderes

## FERTIG

Wenn nach dem Fix in WhatsApp ein echtes Bild erscheint (nicht die URL als Text), ist der Fix korrekt.

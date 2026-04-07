# BOTPRESS FIX: Alle 9 Menüpunkte reparieren

## WICHTIG: NUR REPARIEREN, NICHT NEU AUFBAUEN!
Bestehende Flows bleiben erhalten. Nur die kaputten Nodes innerhalb der Flows werden repariert.

---

## SCHRITT 1: Publish-Button klicken (ZUERST!)
Gehe zu sozialmedia.best → Management UI → Publish-Button klicken.
Danach warten bis deployed, dann weitermachen.

---

## API-ENDPUNKTE (alle funktionieren nach dem Publish)

**Base URL:** `https://sozialmedia.best/api/lina`

| Endpunkt | Methode | Felder |
|----------|---------|--------|
| `/content` | GET | posts[].id, posts[].text, posts[].imageUrl, posts[].videoUrl, posts[].caption |
| `/library` | GET | items[].id, items[].title, items[].text, items[].imageUrl, items[].category |
| `/generate` | POST | topic, platform="instagram" → postId, content, imageUrl, message |
| `/objection` | POST | objection, partnerName → response (fertige Antwort zum Kopieren) |
| `/login-link` | POST | partnerNumber, name → loginUrl |
| `/viral/trends` | GET | trends[].id, trends[].title, trends[].originalText, trends[].mediaUrls[0] |
| `/viral/clone` | POST | trendId, platform="instagram" → postId, content, imageUrl, message |
| `/pending/{partnerNumber}` | GET | posts[].id, posts[].text, posts[].imageUrl |
| `/self-approve` | POST | partnerNumber, postId → message |

---

## MENÜPUNKT 1: "Fertiger Content abholen" (📋)

### Was passiert:
1. API `/content` aufrufen
2. Für JEDEN Post: Text + Bild einzeln schicken (NICHT alles auf einmal)
3. Nach jedem Post fragen: "Nächster Post?" oder "Fertig?"

### Execute Code Node (JavaScript):
```javascript
const response = await axios.get('https://sozialmedia.best/api/lina/content');
const posts = response.data.posts || [];

if (posts.length === 0) {
  workflow.posts = [];
  workflow.currentIndex = 0;
  workflow.message = "📭 Aktuell kein fertiger Content verfügbar.";
} else {
  workflow.posts = posts;
  workflow.currentIndex = 0;
  workflow.message = `✅ ${posts.length} Posts bereit!`;
}
```

### Text Node (Post anzeigen):
```
{{workflow.posts[workflow.currentIndex].text}}
```

### Image Card Node (Bild anzeigen):
- Image URL: `{{workflow.posts[workflow.currentIndex].imageUrl}}`
- Title: `Post {{workflow.currentIndex + 1}} von {{workflow.posts.length}}`

### Choice Node (nach jedem Post):
- "➡️ Nächster Post" → Execute Code (currentIndex++)
- "✅ Fertig" → Hauptmenü

---

## MENÜPUNKT 2: "Content freigeben" (✅)

### Was passiert:
1. Partner-Nummer abfragen
2. API `/pending/{partnerNumber}` aufrufen
3. Jeden Post einzeln zeigen mit Freigabe-Button
4. Bei Freigabe: `/self-approve` aufrufen

### Execute Code Node (Posts laden):
```javascript
const partnerNr = workflow.partnerNumber || "default";
const response = await axios.get(`https://sozialmedia.best/api/lina/pending/${partnerNr}`);
const posts = response.data.posts || [];

workflow.pendingPosts = posts;
workflow.pendingIndex = 0;

if (posts.length === 0) {
  workflow.pendingMessage = "✅ Keine Posts zur Freigabe.";
} else {
  workflow.pendingMessage = `📋 ${posts.length} Posts warten auf deine Freigabe.`;
}
```

### Execute Code Node (Post freigeben):
```javascript
const post = workflow.pendingPosts[workflow.pendingIndex];
const response = await axios.post('https://sozialmedia.best/api/lina/self-approve', {
  partnerNumber: workflow.partnerNumber,
  postId: post.id
});
workflow.approveMessage = response.data.message || "✅ Freigegeben!";
workflow.pendingIndex = workflow.pendingIndex + 1;
```

---

## MENÜPUNKT 3: "Bibliothek durchsuchen" (📚)

### Was passiert:
1. API `/library` aufrufen
2. Für JEDEN Eintrag: Titel + Text + Bild einzeln schicken
3. Benutzer kann durch Einträge blättern

### Execute Code Node:
```javascript
const response = await axios.get('https://sozialmedia.best/api/lina/library');
const items = response.data.items || [];

workflow.libraryItems = items;
workflow.libraryIndex = 0;
workflow.libraryCount = items.length;
```

### Text Node:
```
📚 *{{workflow.libraryItems[workflow.libraryIndex].title}}*

{{workflow.libraryItems[workflow.libraryIndex].text}}
```

### Image Card Node:
- Image URL: `{{workflow.libraryItems[workflow.libraryIndex].imageUrl}}`
- Title: `{{workflow.libraryItems[workflow.libraryIndex].title}}`

### Choice Node:
- "➡️ Nächster" → Execute Code (libraryIndex++)
- "✅ Fertig" → Hauptmenü

---

## MENÜPUNKT 4: "Content nach Wunsch erstellen" (✨)

### Was passiert:
1. Thema abfragen (Text-Input)
2. API `/generate` aufrufen (dauert 10-30 Sekunden!)
3. Text + Bild zurückschicken

### Execute Code Node:
```javascript
const response = await axios.post('https://sozialmedia.best/api/lina/generate', {
  topic: workflow.userTopic,
  platform: "instagram"
});

workflow.generatedContent = response.data.content || "";
workflow.generatedImage = response.data.imageUrl || "";
workflow.generatedMessage = response.data.message || "✅ Content erstellt!";
workflow.generatedPostId = response.data.postId;
```

### Text Node (Content anzeigen):
```
✨ *Dein Content ist fertig!*

{{workflow.generatedContent}}
```

### Image Card Node (Bild anzeigen):
- Image URL: `{{workflow.generatedImage}}`
- Title: `Dein neuer Post`

### Text Node (Abschluss):
```
{{workflow.generatedMessage}}

📋 Kopiere den Text und das Bild für deinen Post!
```

---

## MENÜPUNKT 5: "Schnellpost" (⚡)

### Was passiert:
1. Thema-Auswahl (Choice Node mit vordefinierten Themen)
2. API `/generate` aufrufen
3. Fertigen Post zurückschicken

### Choice Node (Thema wählen):
- "🚗 Autokonzept" → topic = "Autokonzept LR"
- "💰 Business" → topic = "LR Business Opportunity"
- "🌿 Lifestyle" → topic = "LR Lifestyle"
- "💊 Produkte" → topic = "LR Produkte"

### Execute Code Node: (gleich wie MENÜPUNKT 4)

---

## MENÜPUNKT 6: "Einwandbehandlung" (🗣️)

### Was passiert:
1. Einwand abfragen (Text-Input)
2. API `/objection` aufrufen
3. Fertige Antwort zurückschicken

### Execute Code Node:
```javascript
const response = await axios.post('https://sozialmedia.best/api/lina/objection', {
  objection: workflow.userObjection,
  partnerName: workflow.partnerName || "LR Partner"
});

workflow.objectionResponse = response.data.response || "Keine Antwort erhalten.";
```

### Text Node:
```
{{workflow.objectionResponse}}
```

---

## MENÜPUNKT 7: "Trend-Scanner" (🔥)

### Was passiert:
1. API `/viral/trends` aufrufen
2. Jeden Trend mit Bild anzeigen
3. Option: Trend klonen

### Execute Code Node (Trends laden):
```javascript
const response = await axios.get('https://sozialmedia.best/api/lina/viral/trends?limit=3');
const trends = response.data.trends || [];

workflow.trends = trends;
workflow.trendIndex = 0;
workflow.trendCount = trends.length;
```

### Text Node (Trend anzeigen):
```
🔥 *Trend {{workflow.trendIndex + 1}} von {{workflow.trendCount}}*

{{workflow.trends[workflow.trendIndex].originalText}}
```

### Image Card Node:
- Image URL: `{{workflow.trends[workflow.trendIndex].mediaUrls[0]}}`
- Title: `{{workflow.trends[workflow.trendIndex].title}}`

### Choice Node:
- "🔄 Diesen Trend klonen" → Execute Code (clone)
- "➡️ Nächster Trend" → Execute Code (trendIndex++)
- "✅ Fertig" → Hauptmenü

### Execute Code Node (Trend klonen):
```javascript
const trend = workflow.trends[workflow.trendIndex];
const response = await axios.post('https://sozialmedia.best/api/lina/viral/clone', {
  trendId: trend.id,
  platform: "instagram"
});

workflow.clonedContent = response.data.content || "";
workflow.clonedImage = response.data.imageUrl || "";
workflow.clonedMessage = response.data.message || "✅ Trend geklont!";
```

---

## MENÜPUNKT 8: "LR Office Login-Link" (🔗)

### Was passiert:
1. Partner-Nummer abfragen
2. API `/login-link` aufrufen
3. Link zurückschicken

### Execute Code Node:
```javascript
const response = await axios.post('https://sozialmedia.best/api/lina/login-link', {
  partnerNumber: workflow.partnerNumber,
  name: workflow.partnerName || "LR Partner"
});

workflow.loginUrl = response.data.loginUrl || "";
workflow.loginMessage = response.data.message || "Link erstellt!";
```

### Text Node:
```
🔗 *Dein persönlicher Login-Link:*

{{workflow.loginUrl}}

⏰ Gültig für 24 Stunden.
```

---

## MENÜPUNKT 9: "Neue Features" (🆕)

### Was passiert:
Zeigt eine statische Übersicht der neuen Features.

### Text Node:
```
🆕 *Neue Features in Lina:*

✅ Fertiger Content: Komplette Posts mit Bild
✅ Bibliothek: Alle Vorlagen mit Bild
✅ Content erstellen: KI generiert Text + Bild
✅ Trend-Scanner: Virale Trends klonen
✅ Einwandbehandlung: Fertige Antworten
✅ Login-Link: Direkter LR Office Zugang

💡 Alle Features sind jetzt aktiv!
```

---

## KRITISCHE REGELN FÜR ALLE FLOWS:

1. **Image Card Node** statt Text-Node für Bilder verwenden
2. **Jeder Post einzeln** schicken, nicht alles auf einmal
3. **Kein Cancel-Node** in den Flows (verursacht "Are you sure?" Fehler)
4. **workflow.** Variablen für alle Daten verwenden
5. **axios** für alle API-Calls verwenden (ist in Botpress verfügbar)
6. **Nach jedem API-Call** prüfen ob `response.data.success === true`

---

## NACH DEM FIX TESTEN:

1. WhatsApp öffnen → Lina anschreiben
2. "Fertiger Content abholen" → Muss Text + Bild kommen
3. "Content nach Wunsch" → Thema eingeben → Muss Text + Bild kommen
4. "Bibliothek" → Muss Titel + Text + Bild kommen
5. "Einwandbehandlung" → Einwand eingeben → Muss fertige Antwort kommen

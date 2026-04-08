# Claw-Prompt: sozialmedia.best → Make.com → WhatsApp (wie der funktionierende Bild-Flow)

**Datum: 08. April 2026**
**Repo: Matze190519/sozialmedia-best, Branch: main**

---

## Was du tun sollst

Der alte Flow "Partner - Bild erstellen" funktioniert bereits perfekt:
- Botpress sammelt Infos → sendet per Webhook an Make.com → Make.com generiert Bild → sendet echtes Bild an WhatsApp

**Dieses System soll jetzt auch für die neuen Menüpunkte in sozialmedia.best genutzt werden.**

Die neuen Menüpunkte sind im Hauptmenü unter "Neue Features" erreichbar:
1. Fertiger Content abholen (aus Bibliothek)
2. Content freigeben
3. Schnellpost erstellen

---

## Wie der funktionierende Bild-Flow arbeitet (Vorlage)

Der Node "CodeAusfuehren" im Bild-Flow sendet so an Make.com:

```javascript
const webhookUrl = "https://hook.eu2.make.com/ct9ogd2oon76vzdh3pgplzq5w0ih2ciq";

const payload = {
  userId: sanitize(userPhone),
  phoneNumber: sanitize(userPhone),
  to: sanitize(userPhone),
  imageUrl: finalImageUrl,        // <-- Bild-URL
  prompt: sanitize(rawPrompt),    // <-- Prompt-Text
  model: "gpt-image-1",
  timestamp: new Date().toISOString()
};

await axios.post(webhookUrl, payload, { 
  headers: { "Content-Type": "application/json" },
  timeout: 30000 
});
```

Make.com empfängt das, generiert das Bild, und sendet es als **"Send a Media Message"** (nicht als Text) zurück an WhatsApp.

---

## Was du für sozialmedia.best bauen sollst

### Schritt 1: Neues Make.com Szenario anlegen

Lege in Make.com (eu2.make.com) ein neues Szenario an:

**Name:** "LR Content Delivery - sozialmedia.best"

**Module:**
1. **Webhook** (empfängt Daten von Botpress)
2. **HTTP → Make a Request** an sozialmedia.best API (holt Content)
3. **WhatsApp → Send a Media Message** (sendet Bild direkt an Partner)
4. **WhatsApp → Send a Message** (sendet Text/Caption)

### Schritt 2: sozialmedia.best API aufrufen

Die API-Endpunkte sind bereits fertig und funktionieren:

**Fertigen Content abholen:**
```
GET https://sozialmedia.best/api/lina/content?status=approved&limit=5
```
Antwort enthält: `imageUrl`, `content` (Text), `title`

**Content aus Bibliothek:**
```
GET https://sozialmedia.best/api/lina/library?category=instagram&limit=5
```
Antwort enthält: `imageUrl`, `caption`, `hashtags`

### Schritt 3: Botpress Nodes für neue Menüpunkte

Für jeden neuen Menüpunkt braucht es einen Node der so an Make.com sendet:

```javascript
// NODE: SendeContentAnMake (für "Fertiger Content abholen")
const webhookUrl = "DEIN_NEUER_MAKE_WEBHOOK_URL"; // aus Schritt 1

function sanitize(str) {
    if (!str) return "";
    return String(str).replace(/"/g, "'").replace(/\\/g, "/").replace(/[\r\n]+/g, " ").trim();
}

let userPhone = workflow.userPhone || "";
if (!userPhone) userPhone = event.tags?.conversation?.["whatsapp:userPhone"] || event.user?.id || "";

const payload = {
  phoneNumber: sanitize(userPhone),
  to: sanitize(userPhone),
  action: "get_approved_content",  // Make.com weiß was zu tun ist
  limit: 3,
  timestamp: new Date().toISOString()
};

console.log("📦 Sende an Make.com:", payload);
try {
  await axios.post(webhookUrl, payload, { 
    headers: { "Content-Type": "application/json" },
    timeout: 30000 
  });
  console.log("✅ Gesendet!");
} catch (error) {
  console.error("❌ Fehler:", error.message);
}
```

### Schritt 4: Make.com sendet Bild als Mediendatei (KRITISCH!)

Im Make.com Szenario beim letzten Schritt:
- **NICHT:** WhatsApp → Send a Message (Text)
- **RICHTIG:** WhatsApp → Send a Media Message
  - Type: `image`
  - URL: `{{imageUrl}}` (aus der sozialmedia.best API-Antwort)
  - Caption: `{{content}}` (Post-Text)

Danach optional: WhatsApp → Send a Message mit Hashtags

---

## Wichtige Regeln

1. **Botpress-Flows nicht anfassen** die schon funktionieren (Partner Bild erstellen, Partner Video erstellen)
2. **Nur neue Nodes** für die neuen Menüpunkte anlegen
3. **Immer "Send a Media Message"** in Make.com — niemals "Send a Message" für Bilder/Videos
4. **Telefonnummer** immer aus `event.tags?.conversation?.["whatsapp:userPhone"]` holen
5. **Sanitize-Funktion** immer verwenden (schützt vor JSON-Fehlern)
6. **Timeout 30000ms** beim axios.post setzen (Bild-Generierung dauert)

---

## sozialmedia.best API Übersicht

| Endpunkt | Methode | Was es zurückgibt |
|----------|---------|-------------------|
| `/api/lina/content?status=approved` | GET | Freigegebene Posts mit imageUrl |
| `/api/lina/library?category=instagram` | GET | Bibliothek-Content mit imageUrl |
| `/api/lina/content/:id/approve` | POST | Content freigeben |
| `/api/lina/generate` | POST | Neuen Content mit Bild generieren |
| `/api/lina/health` | GET | Status aller Endpunkte |

Alle Endpunkte sind öffentlich erreichbar (kein API-Key nötig für GET).

---

## Teste so

Nach dem Aufbau: Sende manuell einen Test-Webhook an Make.com mit:
```json
{
  "phoneNumber": "DEINE_WHATSAPP_NUMMER",
  "to": "DEINE_WHATSAPP_NUMMER",
  "action": "get_approved_content",
  "limit": 1
}
```
Wenn ein Bild auf WhatsApp ankommt: Fertig.

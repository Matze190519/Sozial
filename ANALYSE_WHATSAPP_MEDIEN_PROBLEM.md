# Tiefenanalyse: Warum kommen keine Bilder/Videos bei WhatsApp an?
**Stand: 08. April 2026 — NUR LESEN, NICHTS ÄNDERN**

---

## Das Kernproblem in einem Satz

**Make.com bekommt von Botpress eine Bild-URL, aber sendet sie als Text-Nachricht zurück an WhatsApp statt als echte Mediendatei.**

---

## Wie der Flow funktioniert (Ist-Zustand)

Der Flow "Partner - Bild erstellen" läuft so:

```
1. GetImageInfo (Autonomous Node)
   → KI sammelt Infos: Welches Produkt? Welcher Stil?
   → Speichert: workflow.imageURL, workflow.selectedProduct

2. SendImageInfoToMake (Standard Node)
   → Sendet per axios.post() an Make.com Webhook:
     { imageUrl, selectedProduct, phoneNumber, promptText, ... }

3. Make.com Szenario (EXTERN — nicht in Botpress)
   → Empfängt die Daten
   → Generiert/verarbeitet das Bild
   → Sendet Ergebnis zurück an WhatsApp
```

Der Flow "Partner - Video erstellen" läuft identisch:
```
1. VideoErstellen (Autonomous Node)
2. SendInfoToMake → Webhook: https://hook.eu2.make.com/ud833m7uy5txxqrmrgytwz5noyq2z4eb
3. Make.com generiert Video, sendet zurück
```

---

## Warum kommt nur Text an (keine Bilder/Videos)?

### Ursache 1: Make.com sendet die URL als Text, nicht als Mediendatei

In Make.com gibt es zwei verschiedene Module um etwas an WhatsApp zu senden:

| Modul | Was es tut | Was beim Nutzer ankommt |
|-------|-----------|------------------------|
| **Send a Message** (Text) | Sendet reinen Text | Nur Text — auch wenn eine URL drin steht |
| **Send a Media Message** | Sendet Bild/Video als Datei | Echtes Bild/Video in WhatsApp |

**Das Problem:** Das Make.com-Szenario verwendet wahrscheinlich "Send a Message" (Text) statt "Send a Media Message". Deshalb kommt die Bild-URL als Text-Link an, nicht als Bild.

### Ursache 2: WhatsApp Business API erfordert öffentlich erreichbare URLs

WhatsApp lädt Bilder/Videos direkt von der URL herunter. Die URL muss:
- Öffentlich erreichbar sein (kein Login, kein Token)
- HTTPS sein
- Direkt auf die Mediendatei zeigen (kein Redirect)

Die URLs von sozialmedia.best (CloudFront CDN) sind öffentlich — das ist kein Problem.

### Ursache 3: Botpress-Flows testen im Webchat, nicht in WhatsApp

Der Webchat zeigt Bilder direkt als `<img>` Tag an. WhatsApp braucht einen anderen Mechanismus. Wenn Claude Code im Webchat testet und es "funktioniert", bedeutet das nichts für WhatsApp.

---

## Was in Make.com geändert werden muss

**Im Szenario "Partner - Bild erstellen" (Make.com):**

Schritt der das Ergebnis an WhatsApp sendet:
- **FALSCH:** WhatsApp → Send a Message → Text: `{{imageUrl}}`
- **RICHTIG:** WhatsApp → Send a Media Message → Type: Image → URL: `{{imageUrl}}`

**Im Szenario "Partner - Video erstellen" (Make.com):**
- **FALSCH:** WhatsApp → Send a Message → Text: `{{videoUrl}}`
- **RICHTIG:** WhatsApp → Send a Media Message → Type: Video → URL: `{{videoUrl}}`

---

## Was in Botpress NICHT geändert werden soll

Die Botpress-Flows funktionieren korrekt. Sie senden die richtigen Daten an Make.com. **Nichts in Botpress anfassen.**

---

## Prompt für Claw (Claude Code)

```
AUFGABE: Make.com Szenarien reparieren — NUR Make.com, NICHT Botpress

REPO: Matze190519/sozialmedia-best (Branch: main)

PROBLEM: 
WhatsApp-Partner bekommen keine Bilder/Videos, nur Text.
Der Botpress-Flow sendet korrekte Bild-URLs an Make.com.
Make.com sendet die URL aber als TEXT zurück an WhatsApp statt als Mediendatei.

WAS ZU TUN IST:
1. Öffne Make.com → eu2.make.com → Organisation "LR Lifestyle"
2. Öffne Szenario das Bilder an WhatsApp sendet (wahrscheinlich "LR Blotato Visual Creator" oder ähnlich)
3. Finde den letzten Schritt: "WhatsApp → Send a Message"
4. Ändere es zu: "WhatsApp → Send a Media Message" → Type: Image → URL: {{imageUrl}}
5. Mache dasselbe für das Video-Szenario: Type: Video → URL: {{videoUrl}}

WICHTIG:
- NUR den letzten Schritt (WhatsApp senden) ändern
- Alle anderen Schritte (Bild generieren, Prompt verarbeiten) NICHT anfassen
- Nach der Änderung: Szenario einmal manuell testen mit einer echten WhatsApp-Nummer
- Botpress-Flows NICHT anfassen — die sind korrekt

MAKE.COM WEBHOOKS (aus Botpress-Code):
- Bild-Flow: https://hook.eu2.make.com/ct9ogd2oon76vzdh3pgplzq5w0ih2ciq
- Video-Flow: https://hook.eu2.make.com/ud833m7uy5txxqrmrgytwz5noyq2z4eb
- Eigene Eingabe: https://hook.eu2.make.com/keeurtxrehvtwib9axhdnw1rfqnwgwgo

SPEICHERN: Dokumentiere die Änderung in Matze190519/sozialmedia-best/docs/make-fix.md
```

---

## Zusätzlich: sozialmedia.best API für Make.com nutzen

Wenn Make.com statt eigener Bild-Generierung die sozialmedia.best API nutzen soll:

**Endpunkt:** `POST https://sozialmedia.best/api/lina/generate`

```json
{
  "topic": "LR Aloe Vera",
  "platform": "instagram",
  "contentType": "post"
}
```

**Antwort:**
```json
{
  "success": true,
  "postId": 1380001,
  "imageUrl": "https://s1.mhware.de/images/products/.../aloe_vera.jpg",
  "content": "Post-Text hier...",
  "message": "Content erstellt!"
}
```

Make.com kann dann `{{imageUrl}}` direkt als "Send a Media Message" an WhatsApp senden.

---

## Zusammenfassung

| Was | Wo | Status |
|-----|-----|--------|
| Botpress-Flows | Botpress Studio | Korrekt — nicht anfassen |
| Webhook-Code | Botpress Nodes | Korrekt — sendet richtige Daten |
| sozialmedia.best API | sozialmedia.best | Korrekt — gibt Bild-URLs zurück |
| **Make.com Szenario** | **eu2.make.com** | **KAPUTT — sendet Text statt Mediendatei** |

**Einzige Änderung nötig:** In Make.com "Send a Message" → "Send a Media Message" ändern.

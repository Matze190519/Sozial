# Aufgabe für Claude (Manus) - LR Content Approval Dashboard

## Projekt
- **Name:** lr-approval-dashboard
- **Live-URL:** sozialmedia.best
- **GitHub Repos:** Matze190519/Sozial (Prompts), lr-approval-dashboard (Webapp)
- **Letzter Checkpoint:** 58085365

## Kontext
Die Code-Änderungen sind im Checkpoint gespeichert, aber die Veröffentlichung auf sozialmedia.best schlägt fehl. Folgende Fixes sind bereits im Code aber noch NICHT live:
- Hashtag-Limiter (max 5)
- Keine-Preise-Regel
- Echte Produktbilder statt KI-Bilder
- Auto-Bildgenerierung DEFAULT TRUE bei allen Generatoren

## Deine Aufgaben (in dieser Reihenfolge):

### 1. Veröffentlichung fixen (BLOCKER)
Das Deployment auf sozialmedia.best funktioniert nicht. Beim Klick auf "Neueste Version veröffentlichen" kommt "Etwas ist schief gelaufen" oder es lädt endlos. Prüfe ob es große Dateien im Projekt gibt, Build-Fehler oder andere Deployment-Probleme. Ohne diesen Fix geht nichts live.

### 2. Posts ohne Bilder fixen
6 von 11 Posts in der Freigabe haben kein Bild ("Kein Bild" mit Fragezeichen). Der Auto-Bild-Fix ist im Code (autoGenerateImage = true als Default in server/routers.ts), muss aber erst live gehen (Aufgabe 1). Danach: bestehende Posts ohne Bilder löschen oder Bilder nachgenerieren.

### 3. TikTok JPG-Konvertierung permanent einbauen
TikTok akzeptiert keine PNG-Bilder ("Media conversion failed"). In `server/externalApis.ts` in der `scheduleOnBlotato()` Funktion muss vor dem Posting an TikTok automatisch PNG→JPG konvertiert werden. Die Bilder kommen als PNG von der KI-Bildgenerierung.

### 4. Content-Länge im LLM-Prompt begrenzen
Der Brand Voice Generator in `server/routers.ts` generiert zu lange Texte (2483 statt max 2200 Zeichen für Instagram). Im System-Prompt muss strikter stehen: "MAXIMAL 2200 Zeichen für Instagram, MAXIMAL 300 für TikTok, MAXIMAL 500 für Threads."

### 5. E-Mail-Benachrichtigungen einbauen
Aktuell werden E-Mails nur bei Ablehnung gesendet (über Brevo). Es fehlen E-Mails bei:
- Freigabe eines Posts
- Neuer Content wartet auf Freigabe (Team soll benachrichtigt werden)
- Post wurde erfolgreich gepostet

### 6. Lina "Neue Features" Menü fixen
In WhatsApp zeigt Lina bei "Neue Features" nur "Hier sind deine neuen Tools! Was brauchst du?" aber KEINE Buttons. Der Claude-Prompt in Botpress (Datei: CLAUDE_BOTPRESS_PROMPT.md und CLAUDE_BOTPRESS_KORREKTUR.md auf GitHub Matze190519/Sozial) muss konkrete Menü-Optionen für die neuen Features definieren.

### 7. Lifestyle-Engine Batch-Generierung fixen
"5 Lifestyle-Posts generieren" Button auf sozialmedia.best/lifestyle lädt kurz und springt zurück ohne Posts zu generieren. Wahrscheinlich Timeout bei der Bildgenerierung. Einzelne Posts funktionieren.

## Wichtige Dateien
- `server/routers.ts` - Alle tRPC Procedures
- `server/externalApis.ts` - Blotato, GoViralBitch, Quality Gate, scheduleOnBlotato
- `server/linaRoutes.ts` - Lina WhatsApp Bot API
- `server/productImageMatcher.ts` - Produktbild-Erkennung
- `client/src/pages/GeneratorPage.tsx` - Content Generator UI
- `client/src/pages/LifestylePage.tsx` - Lifestyle Engine UI
- `drizzle/schema.ts` - Datenbank-Schema

## Blotato Accounts
- Instagram: lr_lifestyleteam (ID: 6682)
- TikTok: lr_lifestyleteam (ID: 6683)
- Facebook: (ID: 6684)
- Threads: (ID: 6685)
- LinkedIn: (ID: 6686)

## Regeln
- KEINE PREISE in Posts (niemals Euro-Beträge nennen)
- MAX 5 HASHTAGS für Instagram/TikTok/Threads
- Produktbilder: Wenn Topic ein LR-Produkt ist → echtes Bild aus DB, kein KI-Bild
- Jeder Post MUSS ein Bild haben (autoGenerateImage = true)
- TikTok braucht JPG, keine PNG

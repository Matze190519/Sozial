# Aufgabe für Claude (Manus) - LR Content Approval Dashboard

## WICHTIG: Wo liegt der Code?
Das Projekt "lr-approval-dashboard" ist ein **Manus Webdev Projekt**. Es liegt NICHT auf GitHub als eigenes Repo. Der Code ist nur über Manus zugänglich:
- **Manus Projekt-Name:** lr-approval-dashboard
- **Manus Projekt-Pfad:** /home/ubuntu/lr-approval-dashboard
- **Live-URL:** sozialmedia.best (auch: lrappdash-ujzxdmp3.manus.space)
- **Letzter Checkpoint:** 58085365
- **Features:** db, server, user (tRPC + Manus Auth + Database Template)

Du musst das Projekt über Manus öffnen (nicht über GitHub). Der Code liegt im Manus Sandbox unter `/home/ubuntu/lr-approval-dashboard/`.

**Nur die Prompt-Dateien liegen auf GitHub:** Matze190519/Sozial (CLAUDE_BOTPRESS_PROMPT.md, CLAUDE_BOTPRESS_KORREKTUR.md)

## Kontext
Die Code-Änderungen sind im Checkpoint 58085365 gespeichert. Folgende Fixes sind bereits im Code:
- Hashtag-Limiter (max 5) in `server/externalApis.ts`
- Keine-Preise-Regel in `server/routers.ts` und `server/externalApis.ts`
- Echte Produktbilder statt KI-Bilder in `server/productImageMatcher.ts`
- Auto-Bildgenerierung DEFAULT TRUE bei allen Generatoren in `server/routers.ts`

## Deine Aufgaben (in dieser Reihenfolge):

### 1. Veröffentlichung prüfen
Das Deployment auf sozialmedia.best hat zeitweise nicht funktioniert. Prüfe ob die aktuelle Version live ist. Falls nicht: Prüfe ob es große Dateien im Projekt gibt (keine Bilder/Videos in client/public/ oder im Projekt-Ordner), Build-Fehler oder andere Deployment-Probleme. Erstelle einen neuen Checkpoint und veröffentliche.

### 2. Posts ohne Bilder fixen
6 von 11 Posts in der Freigabe haben kein Bild ("Kein Bild" mit Fragezeichen-Icon). Der Auto-Bild-Fix ist im Code (autoGenerateImage = true als Default in `server/routers.ts`), sollte jetzt live sein. Bestehende Posts ohne Bilder: entweder Bilder nachgenerieren oder Posts löschen und neu erstellen lassen.

### 3. TikTok JPG-Konvertierung permanent einbauen
TikTok akzeptiert keine PNG-Bilder ("Media conversion failed"). In `server/externalApis.ts` in der `scheduleOnBlotato()` Funktion muss vor dem Posting an TikTok automatisch PNG→JPG konvertiert werden. Die KI-Bildgenerierung liefert PNG, TikTok braucht JPG. Lösung: Bild herunterladen, mit sharp oder canvas zu JPG konvertieren, auf S3 hochladen, JPG-URL an Blotato senden.

### 4. Content-Länge im LLM-Prompt begrenzen
Der Brand Voice Generator in `server/routers.ts` generiert zu lange Texte (2483 statt max 2200 Zeichen für Instagram). Im System-Prompt (suche nach "LR_BRAND_VOICE" oder "Du bist ein Social-Media-Experte") muss strikter stehen: "MAXIMAL 2200 Zeichen für Instagram, MAXIMAL 300 für TikTok, MAXIMAL 500 für Threads. Zähle die Zeichen und halte dich STRIKT daran."

### 5. E-Mail-Benachrichtigungen einbauen
Aktuell werden E-Mails nur bei Ablehnung gesendet (über Brevo). Es fehlen E-Mails bei:
- Freigabe eines Posts (wenn Admin einen Post genehmigt)
- Neuer Content wartet auf Freigabe (Team soll benachrichtigt werden)
- Post wurde erfolgreich gepostet (Bestätigung)

### 6. Lina "Neue Features" Menü fixen
In WhatsApp zeigt Lina bei "Neue Features" nur "Hier sind deine neuen Tools! Was brauchst du?" aber KEINE Buttons/Optionen. Der Claude-Prompt in Botpress muss aktualisiert werden. Die Prompt-Dateien liegen auf GitHub: Matze190519/Sozial (CLAUDE_BOTPRESS_PROMPT.md und CLAUDE_BOTPRESS_KORREKTUR.md). Es müssen konkrete Menü-Optionen für die neuen Features definiert werden.

### 7. Lifestyle-Engine Batch-Generierung fixen
"5 Lifestyle-Posts generieren" Button auf sozialmedia.best/lifestyle lädt kurz und springt zurück ohne Posts zu generieren. Wahrscheinlich Timeout bei der Bildgenerierung auf dem Live-Server. Einzelne Posts funktionieren. Code: `client/src/pages/LifestylePage.tsx`. Lösung: Batch-Generierung sequentiell statt parallel machen, oder Bilder asynchron nachgenerieren.

## Wichtige Dateien im Projekt (/home/ubuntu/lr-approval-dashboard/)
- `server/routers.ts` - Alle tRPC Procedures (Content Generator, Brand Voice, Approval, etc.)
- `server/externalApis.ts` - Blotato API, GoViralBitch API, Quality Gate, scheduleOnBlotato, limitHashtags
- `server/linaRoutes.ts` - Lina WhatsApp Bot API Endpoints
- `server/productImageMatcher.ts` - Produktbild-Erkennung (NEU)
- `server/db.ts` - Datenbank-Queries
- `client/src/pages/GeneratorPage.tsx` - Content Generator UI
- `client/src/pages/LifestylePage.tsx` - Lifestyle Engine UI
- `client/src/pages/ApprovalPage.tsx` - Freigabe UI
- `drizzle/schema.ts` - Datenbank-Schema
- `todo.md` - Vollständige Feature/Bug-Liste

## Blotato Accounts (Social Media Posting)
- Instagram: lr_lifestyleteam (ID: 6682)
- TikTok: lr_lifestyleteam (ID: 6683)
- Facebook: (ID: 6684)
- Threads: (ID: 6685)
- LinkedIn: (ID: 6686)
- API Key: Umgebungsvariable BLOTATO_API_KEY

## Regeln die im Code eingehalten werden müssen
- KEINE PREISE in Posts (niemals Euro-Beträge, "ab X Euro", "nur X€" etc.)
- MAX 5 HASHTAGS für Instagram/TikTok/Threads, MAX 10 für andere Plattformen
- Produktbilder: Wenn Topic ein LR-Produkt enthält (Aloe Vera, Mind Master, Zeitgard etc.) → echtes Bild aus DB verwenden, KEIN KI-Bild
- Jeder Post MUSS ein Bild haben (autoGenerateImage = true als Default)
- TikTok braucht JPG-Bilder, keine PNG
- Content-Länge: Instagram max 2200 Zeichen, TikTok max 300, Threads max 500

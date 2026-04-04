# Fehlerliste für Claude - Übergabe 04.04.2026

## Projekt: LR Content Approval Dashboard (sozialmedia.best)
## Repo: lr-approval-dashboard
## Status: Code-Änderungen im Checkpoint gespeichert, aber NICHT veröffentlicht auf sozialmedia.best

---

## KRITISCHE FEHLER (müssen sofort gefixt werden)

### 1. Veröffentlichung funktioniert nicht
**Problem:** Beim Klick auf "Neueste Version veröffentlichen" kommt "Etwas ist schief gelaufen" oder es lädt endlos.
**Auswirkung:** Alle Code-Fixes sind nur im Checkpoint, aber NICHT auf der Live-Seite sozialmedia.best aktiv.
**Was zu tun ist:** Deployment-Problem diagnostizieren und beheben. Möglicherweise gibt es zu große Dateien im Projekt oder ein Build-Fehler.

### 2. Posts ohne Bilder - "Kein Bild" in der Freigabe
**Problem:** Viele Posts in der Freigabe-Warteschlange haben kein Bild (siehe Screenshot: "Kein Bild" mit Fragezeichen-Icon). Posts ohne Bild sind nicht postbar auf Instagram/TikTok.
**Root Cause:** Die Auto-Bildgenerierung war nicht bei allen Generatoren aktiv. Fix wurde im Code eingebaut (autoGenerateImage = true als Default), aber ist noch NICHT live weil Veröffentlichung nicht funktioniert.
**Betroffene Stellen im Code:**
- `server/routers.ts` - content.generate, brandVoice.generateWithVoice, batch generate, A/B Tests, Monthly Plan
- Alle diese Stellen haben jetzt `autoGenerateImage` als Default TRUE
**Was zu tun ist:** 
1. Veröffentlichung fixen (Fehler 1)
2. Bestehende Posts ohne Bilder: Bilder nachgenerieren oder Posts löschen und neu erstellen

### 3. TikTok Posts schlagen fehl - "Media conversion failed"
**Problem:** TikTok akzeptiert keine PNG-Bilder von Blotato Storage. Alle 6 TikTok-Posts sind mit "Error publishing content" fehlgeschlagen.
**Root Cause:** Die Bilder werden als PNG generiert, TikTok braucht aber JPG (oder MP4 für Videos).
**Temporärer Fix:** Bilder wurden manuell zu JPG konvertiert und über CDN hochgeladen, Posts erneut geplant.
**Permanenter Fix nötig:** Im Code muss vor dem Blotato-Posting automatisch PNG→JPG konvertiert werden für TikTok.
**Betroffene Stelle:** `server/externalApis.ts` - `scheduleOnBlotato()` Funktion, `buildPlatformTarget()` für TikTok

### 4. Brand Voice Generator - Content zu lang
**Problem:** Der LLM generiert zu viel Text. Beispiel: 2483 Zeichen statt max 2200 für Instagram.
**Quality Gate erkennt es:** Score 85/100, Warnung "Content zu lang für instagram (max. 2200 Zeichen)"
**Was zu tun ist:** Im LLM-Prompt die Zeichenlimit-Regel strenger machen. Der Prompt in `server/routers.ts` (Brand Voice System Prompt) muss explizit sagen: "MAXIMAL 2200 Zeichen für Instagram, MAXIMAL 300 für TikTok" etc.

---

## WICHTIGE FEHLER

### 5. E-Mail-Benachrichtigungen fehlen
**Problem:** E-Mails werden nur bei Ablehnung gesendet (über Brevo), aber NICHT bei:
- Freigabe eines Posts
- Neuer Content wartet auf Freigabe (Team-Benachrichtigung)
- Post wurde erfolgreich gepostet
**Was zu tun ist:** E-Mail-Versand in den Approval-Flow und Post-Publishing-Flow einbauen.

### 6. Lina WhatsApp Bot - "Neue Features" Menü zeigt keine Optionen
**Problem:** Wenn man in WhatsApp "Neue Features" wählt, antwortet Lina nur "Hier sind deine neuen Tools! Was brauchst du?" aber zeigt KEINE Buttons/Optionen an.
**Root Cause:** Der Claude-Prompt in Botpress hat die neuen Features nicht als Menü-Buttons definiert.
**Was zu tun ist:** Claude-Prompt in Botpress aktualisieren mit konkreten Menü-Optionen für die neuen Features.

### 7. Lifestyle-Engine Batch-Generierung funktioniert nicht
**Problem:** "5 Lifestyle-Posts generieren" Button lädt kurz und springt dann zurück ohne Posts zu generieren.
**Root Cause:** Wahrscheinlich Timeout bei der Bildgenerierung auf dem Live-Server.
**Einzelne Posts funktionieren:** Ja, ein einzelner Lifestyle-Post mit Kategorie-Auswahl funktioniert.

---

## BEREITS GEFIXT (im Checkpoint, aber noch nicht live)

### A. Hashtag-Limiter ✅
- Max 5 Hashtags für Instagram/TikTok/Threads
- Max 10 für andere Plattformen
- Funktion `limitHashtags()` in `server/externalApis.ts`

### B. Keine Preise ✅
- LLM-Prompt verbietet Preise
- Quality Gate blockiert Posts mit Preisen
- Automatischer Preis-Entferner vor Blotato-Posting

### C. Echte Produktbilder ✅
- `server/productImageMatcher.ts` erkennt LR-Produkte im Topic
- Verwendet echtes Produktbild aus DB statt KI-Bild
- Funktioniert in Content Generator, Brand Voice, Lina API

### D. Auto-Bildgenerierung DEFAULT TRUE ✅
- Alle Generatoren erstellen jetzt automatisch ein KI-Bild
- Kein Toggle mehr nötig

---

## TECHNISCHE DETAILS

### Blotato Accounts
- Instagram: lr_lifestyleteam (ID: 6682)
- TikTok: lr_lifestyleteam (ID: 6683)
- Facebook: (ID: 6684)
- Threads: (ID: 6685)
- LinkedIn: (ID: 6686)

### API Keys
- Blotato API Key: In Umgebungsvariable BLOTATO_API_KEY
- GoViralBitch API: In GOVIRALBITCH_API_URL

### Wichtige Dateien
- `server/routers.ts` - Alle tRPC Procedures
- `server/externalApis.ts` - Blotato, GoViralBitch, Quality Gate
- `server/linaRoutes.ts` - Lina WhatsApp Bot API
- `server/productImageMatcher.ts` - Produktbild-Erkennung
- `client/src/pages/GeneratorPage.tsx` - Content Generator UI
- `client/src/pages/LifestylePage.tsx` - Lifestyle Engine UI
- `drizzle/schema.ts` - Datenbank-Schema

### Claude Prompt Dateien (GitHub: Matze190519/Sozial)
- `CLAUDE_BOTPRESS_PROMPT.md` - Haupt-Prompt für Botpress
- `CLAUDE_BOTPRESS_KORREKTUR.md` - Korrekturen und neue Regeln

---

## PRIORITÄTEN-REIHENFOLGE
1. Veröffentlichung fixen → damit alle Fixes live gehen
2. Posts ohne Bilder fixen → damit Content postbar ist
3. TikTok JPG-Konvertierung permanent einbauen
4. Content-Länge im LLM-Prompt begrenzen
5. E-Mail-Benachrichtigungen einbauen
6. Lina "Neue Features" Menü fixen
7. Lifestyle-Engine Batch-Generierung fixen

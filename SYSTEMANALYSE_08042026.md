# Systemanalyse: LR Lina / sozialmedia.best
**Stand: 08. April 2026**

---

## 1. Was Claude Code die letzten Tage gebaut hat

### Backend (sozialmedia.best)

| Feature | Status | Wann |
|---------|--------|------|
| Blotato API Integration (Multi-Platform Publishing) | Fertig | 04.04 |
| Approval-Workflow (Pending → Approved → Scheduled) | Fertig | 04.04 |
| Budget-System: 40 Bilder / 10 Videos pro Partner/Monat | Fertig | 04.04 |
| Globaler Monatsdeckel: $200 | Fertig | 04.04 |
| Hashtag-Limiter: max 5 Hashtags vor Blotato-Posting | Fertig | 04.04 |
| Keine Preise: automatisch entfernt vor Posting | Fertig | 04.04 |
| Produktbilder: Auto-Erkennung → echtes LR-Bild statt KI | Fertig | 04.04 |
| Bibliothek: nur Posts mit Bild/Video (Text-only entfernt) | Fertig | 04.04 |
| Brevo E-Mail-Benachrichtigungen (statt Manus) | Fertig | 04.04 |
| SuperProfile-Anleitung als eigene Seite | Fertig | 04.04 |
| Brand Voice System (9 Plattformen, LR-spezifisch) | Fertig | vorher |
| fal.ai Video-KI Integration (Kling 3.0 Pro) | Fertig | vorher |
| Quality Gate vor jedem Post | Fertig | vorher |
| 226 LR-Produkte mit Originalbildern in DB | Fertig | vorher |
| Partner-Freischaltung (Admin gibt frei) | Fertig | vorher |
| Lina API-Endpunkte (/api/lina/...) | Fertig | vorher |
| viral/trends Endpunkt | Fertig | 08.04 (heute) |
| viral/clone Endpunkt | Fertig | 08.04 (heute) |

### Botpress (Lina WhatsApp Bot)

Laut Claude Codes eigener Analyse (lina-pro-analyse.md) hat er letzte Nacht gemacht:
- Virale Trends Flow: Video-Erkennung hinzugefügt, Image/Video Cards getrennt
- Content_on_Demand: Video-Card hinzugefügt
- LINA PRO Menü: Vorlagen als 11. Menüpunkt hinzugefügt
- Alle Änderungen in Botpress gespeichert und published

---

## 2. Was FUNKTIONIERT (live getestet)

| Endpunkt | Test-Ergebnis |
|----------|--------------|
| `/api/lina/content?status=approved` | ✅ 3 Posts mit imageUrl |
| `/api/lina/library` | ✅ Posts mit imageUrl |
| `/api/lina/viral/trends` | ✅ Endpunkt antwortet (0 Trends in DB) |
| `/api/lina/health` | ✅ Antwortet |
| Automatisches Posting via Blotato | ✅ 5 Posts erfolgreich auf Instagram |
| E-Mail via Brevo | ✅ Test-Mail erfolgreich |

---

## 3. Was KAPUTT ist / FEHLT

### Kritisch (WhatsApp zeigt nur Text, keine Medien)

**Ursache:** Botpress sendet `imageUrl` als Text-Node statt als Image Card Node. Das ist ein Botpress-internes Problem — die API liefert korrekte Bild-URLs, aber der Bot zeigt sie nicht als Bild an.

**Konkrete Fehler:**
- Kein einziger Menüpunkt liefert Bild oder Video auf WhatsApp
- Bibliothek: nur 1 Bild kommt an, kein Text, keine Hashtags
- Content freigeben: keine Funktion
- Schnellpost: kein Content wird generiert
- Neue Features Menü: zeigt keine Buttons/Optionen

### Offene Bugs (aus todo.md)

| Bug | Priorität |
|-----|-----------|
| Lina "Neue Features" Menü zeigt keine Buttons | HOCH |
| E-Mail bei Freigabe fehlt (nur Ablehnung funktioniert) | MITTEL |
| E-Mail wenn neuer Content zur Freigabe bereit | MITTEL |
| E-Mail wenn Post erfolgreich gepostet | MITTEL |
| TikTok JPG-Fix permanent im Code (PNG→JPG) | MITTEL |
| Posts ohne Bilder nachträglich mit Bildern versehen | MITTEL |
| viral/trends: 0 Einträge in DB (leer) | MITTEL |
| /api/lina/templates: leer | NIEDRIG |

### Was Claude Code NICHT gemacht hat (obwohl versprochen)

- WhatsApp End-to-End Test aller Menüpunkte (er testet nur im Webchat!)
- Karussell-Content generieren und posten
- 3 fehlende Video-Posts über Blotato UI posten
- Posting-Zeiten: automatisch optimal oder manuell?

---

## 4. Das Kernproblem: Webchat ≠ WhatsApp

Claude Code testet **immer im Webchat**, aber der Bot läuft auf **WhatsApp**. Das sind zwei verschiedene Kanäle mit unterschiedlichen Regeln:

| Feature | Webchat | WhatsApp |
|---------|---------|----------|
| Bilder als Image Card | Funktioniert | Braucht echte Mediendatei |
| Videos | Funktioniert | Braucht direkte Video-URL |
| Buttons | Bis zu 10 | Max 3 Buttons pro Nachricht |
| Text-Links | Klickbar | Nicht klickbar |

**Lösung:** Botpress muss für den WhatsApp-Kanal spezifische Nodes verwenden. Der funktionierende "Partner Bild erstellen" Flow macht das richtig über Make.com.

---

## 5. Empfohlene nächste Schritte für Claw

### Sofort (Blocker):
1. **Botpress: Alle Menüpunkte auf WhatsApp-Kanal testen** (nicht Webchat)
2. **Image Card Nodes** für alle Content-Ausgaben verwenden
3. **"Neue Features" Menü** reparieren: Buttons/Optionen fehlen

### Dann:
4. **Make.com Integration** für neue Menüpunkte wie der funktionierende Bild-Flow
5. **viral/trends DB** befüllen (aktuell 0 Einträge)
6. **E-Mail-Benachrichtigungen** für Freigabe und erfolgreiches Posting

### Wichtige Regel für Claw:
> Immer auf WhatsApp testen, NICHT im Webchat. Erst wenn ein echtes Bild/Video auf WhatsApp ankommt, ist ein Menüpunkt "fertig".

---

## 6. Zugang für Claw zu sozialmedia.best

**Dashboard:** https://sozialmedia.best  
(Manus-Login erforderlich)

**API-Dokumentation (öffentlich, kein Login):**
- `GET https://sozialmedia.best/api/lina/health` — alle Endpunkte
- `GET https://sozialmedia.best/api/lina/content?status=approved` — freigegebene Posts
- `GET https://sozialmedia.best/api/lina/library` — Bibliothek mit Bildern
- `GET https://sozialmedia.best/api/lina/viral/trends` — Trends

**GitHub Repo (Code):** `Matze190519/sozialmedia-best`, Branch `main`

---

## 7. Prompt für Claw

Sende Claw folgenden Prompt:

```
Analysiere das System sozialmedia.best und repariere alle Botpress-Flows für WhatsApp.

REPO: Matze190519/sozialmedia-best, Branch: main
ANALYSE: https://github.com/Matze190519/sozialmedia-best/blob/main/docs/lina-pro-analyse.md

KRITISCHES PROBLEM:
Kein einziger Menüpunkt liefert Bilder oder Videos auf WhatsApp. 
Du testest immer im Webchat — das ist falsch. Teste NUR auf WhatsApp.

REGELN:
1. Immer WhatsApp-Kanal testen, nicht Webchat
2. Bilder: Image Card Node (nicht Text-Node)
3. Videos: Video Card Node (nicht Text-Node)  
4. Max 3 Buttons pro WhatsApp-Nachricht (nicht 10)
5. Alte funktionierende Flows (Partner Bild/Video erstellen) NICHT anfassen

AUFGABEN (nach Priorität):
1. "Neue Features" Menü reparieren: Buttons/Optionen fehlen
2. Bibliothek: vollständiger Post (Text + Bild + Hashtags) auf WhatsApp
3. Content freigeben: Funktion reparieren
4. Schnellpost: Content generieren und als Bild auf WhatsApp senden
5. E-Mail-Benachrichtigung wenn Content zur Freigabe bereit ist

TESTE JEDEN PUNKT MIT ECHTER WHATSAPP-NUMMER BEVOR DU "FERTIG" SAGST.
```

# Projektaufstellung: LR Lina KI-System
**Stand: 07. April 2026 | sozialmedia.best**

---

## Was ist das System?

Das LR Lina KI-System besteht aus zwei Teilen:

1. **sozialmedia.best** — das Backend (Server + Datenbank). Hier werden alle Posts gespeichert, Bilder generiert, Content erstellt und an Botpress geliefert.
2. **Botpress + WhatsApp** — der Chatbot "Lina", über den ca. 1.000 LR-Partner täglich arbeiten. Lina ruft die API von sozialmedia.best auf und schickt die Ergebnisse per WhatsApp.

---

## Aktueller Systemstand (07.04.2026)

| Bereich | Status | Details |
|---------|--------|---------|
| Server sozialmedia.best | Online | Version 2.0.0, 19 Endpunkte registriert |
| Datenbank | Online | 70 Posts gesamt, 46 geplant, 5 fertig |
| Bibliothek | Online | 10 Einträge, alle mit Bild |
| Fertige Posts | Online | 5 Posts, alle mit Bild |
| Botpress/WhatsApp | Teilweise defekt | Menüpunkte leiten falsch weiter |

---

## Was Claude Code die letzten 2 Tage gemacht hat

### 06. April 2026

| Uhrzeit | Aktion | Ergebnis |
|---------|--------|---------|
| 10:11 | Admin-Freigabe für alle Posts (nicht nur eigene) | Funktioniert |
| 10:11 | Posts/Stories-Länge begrenzt | Funktioniert |
| 10:49 | Button: Alle Posts ohne Bild löschen | Funktioniert |
| 10:49 | Delete-Button bei jedem einzelnen Post | Funktioniert |
| 11:29 | Text auf 300 Zeichen kürzen für WhatsApp | Funktioniert |
| 11:29 | Reel/YouTube/Carousel-Skripte herausfiltern | Funktioniert |
| 11:42 | 107 Posts ohne Bild aus DB gelöscht | Erledigt |
| 12:00 | Bibliothek-Texte bereinigt (49 Einträge) | Funktioniert |
| 12:00 | Fake-URLs aus DB gelöscht | Erledigt |
| **12:00** | **Bild-Pflicht beim Speichern eingebaut** | **Hier fing das Problem an** |

**Das Problem vom 06. April:** Die Bild-Pflicht war falsch implementiert — sie blockierte das Speichern komplett, auch wenn das Bild noch generiert werden sollte. Dadurch funktionierte `/api/lina/generate` nicht mehr.

### 07. April 2026

| Uhrzeit | Aktion | Ergebnis |
|---------|--------|---------|
| 00:43 | `/api/lina/viral/trends` Endpunkt hinzugefügt | Funktioniert |
| 00:43 | `/api/lina/viral/clone` Endpunkt hinzugefügt | Funktioniert |
| 00:43 | Bild-Pflicht vorübergehend deaktiviert | Fehler behoben |
| 16:34 | **Bild-Pflicht korrekt neu implementiert** | Bild wird VOR dem Speichern generiert |

---

## Was aktuell noch nicht funktioniert (Botpress-Seite)

Das sind **Botpress-Fehler**, nicht sozialmedia.best-Fehler. Die API liefert korrekte Daten.

| Menüpunkt | Problem | Ursache |
|-----------|---------|---------|
| Fertiger Content | Nur Text, kein Bild | Text-Node statt Image Card Node |
| Bibliothek | Nur Bild, kein Text | Image Card ohne Text-Node davor |
| Content erstellen | Kein Content kommt an | Flow leitet falsch weiter |
| Content freigeben | "response could not be captured" | Defekter Capture-Node |
| Schnellpost | Landet im falschen Flow | Falsches Flow-Routing |
| Trend-Scanner | Nicht implementiert | Fehlt in Botpress |
| Einwandbehandlung | Nicht getestet | Unbekannt |
| Login-Link | Nicht getestet | Unbekannt |
| Neue Features | Zeigt falsches Untermenü | Falscher Node verknüpft |

**Warum passiert das?** Claude Code hat die Botpress-Flows verändert ohne zu testen ob WhatsApp die Daten korrekt empfängt. Botpress hat eigene Node-Typen (Image Card, Text, Choice) — wenn der falsche Node-Typ verwendet wird, kommt beim Nutzer das falsche Format an.

---

## Was optimiert werden muss

### Sofort (kritisch — 1.000 Partner betroffen)

1. **Botpress-Flows reparieren** — alle 9 Menüpunkte mit korrekten Node-Typen. Prompt liegt bereit: https://github.com/Matze190519/Sozial/blob/main/CLAUDE_ALLE_MENUPUNKTE_FIX.md
2. **Publish-Button klicken** — damit die heutigen Backend-Fixes auf sozialmedia.best live gehen

### Kurzfristig (diese Woche)

3. **Retry-Logik** beim Bild-Generieren — wenn der erste Versuch fehlschlägt, automatisch nochmal versuchen
4. **Bibliothek-Einträge erhöhen** — aktuell nur 10 Einträge, sollten mindestens 50 sein
5. **Partner-Nummer speichern** — damit LR-Partner sie nicht bei jedem Chat neu eingeben müssen

### Mittelfristig

6. **Video-Unterstützung** — `platform="reels"` generiert kurzes Video statt Bild
7. **Bild-Vorschau vor dem Speichern** — "Gefällt dir das Bild?" → Ja/Nein → bei Nein neues Bild
8. **Automatische Tests** — nach jeder Änderung alle 9 Menüpunkte automatisch testen

---

## Zugang für OpenClaw (oder andere Entwickler)

### Schritt 1: Website ansehen (kein Login nötig)
Die öffentliche Website ist direkt erreichbar:
- **https://sozialmedia.best** — Hauptseite
- **https://sozialmedia.best/api/lina/health** — API-Status (zeigt alle Endpunkte)
- **https://sozialmedia.best/api/lina/content** — Fertige Posts (JSON)
- **https://sozialmedia.best/api/lina/library** — Bibliothek (JSON)

### Schritt 2: Admin-Dashboard (Login erforderlich)
Das Dashboard unter https://sozialmedia.best ist passwortgeschützt über Manus OAuth.

Um OpenClaw Zugang zu geben:
1. OpenClaw muss einen Manus-Account haben
2. Du gibst ihm die URL: **https://lrappdash-ujzxdmp3.manus.space**
3. Er klickt "Login" und meldet sich mit seinem Manus-Account an
4. Du kannst ihm in der Datenbank die Rolle "admin" geben

### Schritt 3: Code ansehen
Der gesamte Code liegt auf GitHub:
- **https://github.com/Matze190519/Sozial** — Botpress-Prompts und Dokumentation
- Das Backend-Repository ist privat — du kannst OpenClaw als Collaborator einladen

### API-Dokumentation für OpenClaw

Alle Endpunkte sind unter `https://sozialmedia.best/api/lina/`:

| Endpunkt | Methode | Beschreibung |
|----------|---------|-------------|
| `/health` | GET | System-Status, alle Endpunkte |
| `/status` | GET | Statistiken (Posts, geplant, etc.) |
| `/content` | GET | Fertige Posts mit Bild/Video |
| `/library` | GET | Bibliothek-Einträge |
| `/generate` | POST | Neuen Post erstellen (topic, platform) |
| `/objection` | POST | Einwandbehandlung (objection, partnerName) |
| `/login-link` | POST | LR Office Login-Link (partnerNumber, name) |
| `/viral/trends` | GET | Virale Trends |
| `/viral/clone` | POST | Trend klonen (trendId, platform) |
| `/pending/{nr}` | GET | Posts zur Freigabe |
| `/self-approve` | POST | Post freigeben (partnerNumber, postId) |

---

## Zusammenfassung

Das Backend (sozialmedia.best) funktioniert korrekt. Alle API-Endpunkte liefern die richtigen Daten mit Bildern. Das Problem liegt ausschließlich in Botpress — die Flows müssen mit den richtigen Node-Typen repariert werden. Der Fix-Prompt für Claude Code liegt bereit.

**Wichtigste nächste Aktion:** Publish-Button klicken + Claude Code den Botpress-Prompt schicken.

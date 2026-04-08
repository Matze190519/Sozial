# MASTERPLAN: Die ultimative Content-Maschine für LR Network-Marketing

**Stand: 08.04.2026 | Autor: Manus AI**

---

## Die Vision

> Eine Webseite die es so in dieser Form noch nicht gibt. Die Content-Maschine schlechthin für Network-Marketing und LR. Mit den geilsten Tools, den geilsten Videos, den geilsten Bildern, den geilsten Texten, der einfachsten Bedienung. Für mein Team und für mich.

**Strategiewechsel:** WhatsApp-Integration für komplexe Features ist gestrichen. Botpress macht nur noch 4 einfache Dinge. Alles Komplexe läuft über das Dashboard auf **sozialmedia.best** — Mobile-First, Premium Schwarz + Gold Design, Magic Login.

---

## Aktueller Stand (was FERTIG ist)

### Backend (sozialmedia.best) — FUNKTIONIERT
- 22 REST-API-Endpunkte für Botpress/Lina
- 3.031 Zeilen tRPC-Backend mit 50+ Procedures
- 17 Datenbank-Tabellen (MySQL/TiDB)
- 226 LR-Produkte mit Originalbildern importiert
- KI-Bild-Generierung (fal.ai Nano Banana Pro)
- KI-Video-Generierung (Veo 3.1 Fast + Kling 3.0 Pro)
- Auto-Post auf 8 Plattformen via Blotato API
- Brand Voice System (9 Plattformen)
- Quality Gate (automatische Post-Prüfung)
- Virale Trends Scanner
- Monatsplan-Generator (30 Posts auf Knopfdruck)
- Evergreen Recycling
- Smart Posting Times
- Magic Login (Partner klickt Link → sofort eingeloggt)

### Frontend (36 Seiten) — DESIGN-UPGRADE FERTIG
- Schwarz + Gold Theme durchgängig auf allen 36 Seiten
- Montserrat Headlines + Inter Body
- Mobile Bottom Tab Bar + Drawer-Menü
- Glassmorphism Cards + Gold Glow Effekte
- 1-Tap Copy in Bibliothek
- JoinPage mit Gold-Partikel-Animation

### Botpress/WhatsApp — PROBLEMATISCH
- Bilder kommen nur als Link, nicht als Mediendatei
- Texte werden abgeschnitten
- Skripte statt fertige Posts
- Menüpunkte leiten teilweise falsch

**Entscheidung:** Botpress wird auf 4 simple Flows reduziert. Dashboard übernimmt alles.

---

## Aufgabenverteilung: Wer macht was

### MANUS — Dashboard & Backend

Manus hat den kompletten Code, die Datenbank, das Hosting und alle API-Keys. Manus baut:

| Priorität | Feature | Status |
|-----------|---------|--------|
| 1 | Design-Upgrade Schwarz + Gold (alle Seiten) | FERTIG |
| 2 | Mobile Bottom Tab Bar + Drawer | FERTIG |
| 3 | 1-Tap Copy (Bibliothek) | FERTIG |
| 4 | JoinPage Premium Design | FERTIG |
| 5 | Content-Karten Redesign (größere Bilder, Copy-Buttons) | ALS NÄCHSTES |
| 6 | Freigabe-Flow optimieren (Swipe-Geste, Quick-Approve) | ALS NÄCHSTES |
| 7 | Push-Benachrichtigungen (neuer Content bereit) | GEPLANT |
| 8 | Onboarding-Tutorial für neue Partner | GEPLANT |
| 9 | Analytics mit echten Daten | GEPLANT |
| 10 | Performance-Optimierung (Lazy Loading, Caching) | GEPLANT |

**Manus' Stärke:** Hat den Code direkt, kann sofort deployen, kennt die gesamte Architektur.

---

### CLAUDE CODE — Botpress/WhatsApp (nur noch minimal)

Claude Code hat Zugang zu Botpress Studio und den WhatsApp-Flows. Claude macht **NUR NOCH:**

| Priorität | Aufgabe | Prompt |
|-----------|---------|--------|
| 1 | Alle neuen/kaputten Flows löschen (Copy1, Copy2, Manus Test, etc.) | `CLAUDE_BOTPRESS_REDUZIERUNG.md` |
| 2 | Flow "Bibliothek" fixen: 1 Post mit echtem Bild als WhatsApp-Mediendatei | `CLAUDE_BOTPRESS_REDUZIERUNG.md` |
| 3 | Flow "Einwandbehandlung" fixen: Text-Antwort | `CLAUDE_BOTPRESS_REDUZIERUNG.md` |
| 4 | Flow "Schnelle Hilfe" fixen: FAQ-Antworten | `CLAUDE_BOTPRESS_REDUZIERUNG.md` |
| 5 | Flow "Mein Dashboard" neu: Magic Login Link an Partner schicken | `CLAUDE_BOTPRESS_REDUZIERUNG.md` |

**Wichtig für Claude Code:**
- **Nur diese 4 Flows.** Sonst nichts anfassen.
- **Keine neuen Features in Botpress.** Alles Neue geht ins Dashboard.
- **Nicht im Webchat testen.** Nur auf WhatsApp.
- **Keine Flows kopieren.** Keine Test-Flows erstellen.
- Prompt liegt auf GitHub: https://github.com/Matze190519/Sozial/blob/main/CLAUDE_BOTPRESS_REDUZIERUNG.md

---

### OPENCLAW — Design-Review, neue Tools & Zukunfts-Features

OpenClaw bekommt den kompletten Code und soll das System auf ein neues Level bringen.

**Code-Zugang:** Dashboard → Settings → GitHub → Repository exportieren nach `Matze190519/sozialmedia-best`

| Priorität | Aufgabe | Details |
|-----------|---------|---------|
| 1 | **Design-Review** | Ist Schwarz+Gold premium genug? Welche Micro-Interactions fehlen? Mobile-Experience verbessern |
| 2 | **Wettbewerber-Analyse** | Predis.ai, Ocoya, Buffer, Later, Hootsuite — was machen die besser und wie überholen wir sie |
| 3 | **Neue Tools vorschlagen** | Was macht das System einzigartig? Welche Features gibt es nirgendwo sonst? |
| 4 | **KI-Modelle prüfen** | Sind Nano Banana Pro + Veo 3.1 noch die besten Stand April 2026? |
| 5 | **Architektur-Empfehlungen** | Redis, WebSocket, CDN, Microservices — was brauchen wir für 1000+ User? |
| 6 | **Feature-Implementierung** | Nach Absprache: ausgewählte Features direkt einbauen |

**Wichtig für OpenClaw:**
- **Aktuellen Stand lesen!** Alles steht im Repo `Matze190519/Sozial` — dort liegen alle Analysen, Prompts und Dokumentationen
- **Nichts kaputt machen.** 1000+ Partner arbeiten live damit
- **Analyse als `OPENCLAW_ANALYSE.md`** im Repo `Matze190519/sozialmedia-best` speichern
- **Design:** Schwarz + Gold, Montserrat + Inter, Glassmorphism, Gold Glow. Kein Gelb — echtes Gold (Gradient)

---

## Die 5 Konzentrations-Punkte (statt 50 halbfertige Features)

### 1. Content aus Bibliothek abholen (1-Tap Copy)
**Was:** Partner öffnet Dashboard → sieht fertige Posts mit Bild → tippt "Kopieren" → Text + Hashtags im Clipboard, Bild gespeichert → postet auf Instagram/TikTok
**Status:** Grundfunktion fertig, muss noch schöner werden (größere Bilder, bessere Karten)

### 2. Content erstellen (Text + Bild + Video per KI)
**Was:** Partner wählt Thema → KI generiert Text + Bild → Partner prüft → 1 Klick posten
**Status:** Backend fertig, Frontend muss vereinfacht werden (zu viele Tabs, zu kompliziert)

### 3. Content freigeben (Quick-Approve)
**Was:** Admin sieht neue Posts → Swipe rechts = freigeben, Swipe links = ablehnen → Auto-Post
**Status:** Grundfunktion fertig, UX muss besser werden

### 4. Virale Trends nutzen
**Was:** System scannt TikTok/YouTube/Reddit → zeigt Trends mit Viral Score → 1 Klick: Trend zu LR-Post umwandeln
**Status:** Backend fertig, Frontend fertig, muss getestet werden

### 5. Team-Management
**Was:** Partner einladen, freischalten, sperren. Jeder Partner hat eigene Einstellungen (Blotato Key, Signatur, Hashtags)
**Status:** Fertig, funktioniert

---

## Was das System einzigartig macht (Alleinstellungsmerkmale)

| Feature | Hat Predis.ai? | Hat Ocoya? | Hat Buffer? | Haben WIR? |
|---------|----------------|------------|-------------|------------|
| 226 LR-Produkte mit Originalbildern | Nein | Nein | Nein | **JA** |
| NM-Compliance automatisch | Nein | Nein | Nein | **JA** |
| WhatsApp als Einstieg (Magic Login) | Nein | Nein | Nein | **JA** |
| KI-Video-Generierung (Kling 3.0 Pro) | Nein | Nein | Nein | **JA** |
| Brand Voice pro Plattform (9 Stück) | Teilweise | Nein | Nein | **JA** |
| Virale Trends → 1-Klick LR-Post | Nein | Nein | Nein | **JA** |
| Einwandbehandlung-Datenbank | Nein | Nein | Nein | **JA** |
| Team-Management für NM-Partner | Nein | Nein | Nein | **JA** |
| Auto-Post auf 8 Plattformen | Ja | Ja | Ja | **JA** |
| Monatsplan (30 Posts) auf Knopfdruck | Nein | Teilweise | Nein | **JA** |

---

## Zukunfts-Features (Phase 2 — nach den 5 Kernpunkten)

| Feature | Beschreibung | Wer baut es |
|---------|-------------|-------------|
| **KI-Avatar-Videos** | Partner-Gesicht + KI-Text = persönliches Video | OpenClaw/Manus |
| **Auto-Branding** | Logo + Farben einmal hochladen, alles automatisch | Manus |
| **Voice-to-Content** | Sprachnachricht → fertiger Post mit Bild | Manus |
| **Canva-Editor** | Bilder direkt im Dashboard bearbeiten | OpenClaw |
| **Story-Generator** | Instagram Stories automatisch aus Posts | Manus |
| **Carousel-Builder** | Swipe-Posts für Instagram/LinkedIn | Manus |
| **Smart Content-Feed** | KI lernt was funktioniert, schlägt personalisiert vor | OpenClaw |
| **Team-Leaderboard** | Gamification — wer postet am meisten | Manus |
| **WhatsApp-Newsletter** | Direkt aus Dashboard an alle Partner | Manus |
| **White-Label** | System für andere NM-Unternehmen verkaufen | Alle zusammen |

---

## Dateien auf GitHub (Repo: Matze190519/Sozial)

| Datei | Inhalt |
|-------|--------|
| `MASTERPLAN_CONTENT_MASCHINE.md` | **Dieses Dokument** — Gesamtplan |
| `CLAUDE_BOTPRESS_REDUZIERUNG.md` | Prompt für Claude Code: 4 Flows |
| `OPENCLAW_PROJEKT_BRIEFING.md` | Briefing für OpenClaw: Code-Zugang + Auftrag |
| `SYSTEMANALYSE_08042026.md` | Technische Analyse des Gesamtsystems |
| `STRATEGIEWECHSEL_DASHBOARD_FIRST.md` | Begründung warum Dashboard statt Botpress |
| `CLAUDE_TIEFENANALYSE_PROMPT.md` | Detaillierte Flow-Analyse aus Botpress-Backup |
| `ANALYSE_WHATSAPP_MEDIEN_PROBLEM.md` | Warum WhatsApp keine Bilder zeigt |

---

## Sofort-Aktionen (heute)

1. **Claude Code:** `CLAUDE_BOTPRESS_REDUZIERUNG.md` senden → 4 Flows fixen
2. **OpenClaw:** Code auf GitHub exportieren → `OPENCLAW_PROJEKT_BRIEFING.md` senden → Analyse starten
3. **Manus:** Content-Karten Redesign + Freigabe-Flow optimieren → nächster Checkpoint

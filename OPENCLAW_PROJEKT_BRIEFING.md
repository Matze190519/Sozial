# OpenClaw Projekt-Briefing: LR Content Hub

## Dein Auftrag

Du bekommst Zugang zum kompletten Code des **LR Content Hub** — dem fortschrittlichsten Content-Automations-System für LR-Partner. 1000+ Partner arbeiten live damit. Deine Aufgabe: **Analysiere alles, mach Vorschläge für Verbesserungen — Design, Tools, Modelle, Features — alles was das System einzigartig und 100.000 Jahre voraus macht.**

---

## 1. Code-Zugang

### Live-System
- **Website:** https://sozialmedia.best
- **API Health:** https://sozialmedia.best/api/lina/health
- **API Content:** https://sozialmedia.best/api/lina/content
- **API Bibliothek:** https://sozialmedia.best/api/lina/library

### Code auf GitHub exportieren
Im Manus Dashboard → Settings → GitHub → Repository exportieren. Dann:
```bash
gh repo clone Matze190519/[repo-name]
```

### Tech-Stack
| Komponente | Technologie |
|-----------|-------------|
| Frontend | React 19 + TypeScript + Tailwind CSS 4 |
| Backend | Express 4 + tRPC 11 (End-to-End Type Safety) |
| Datenbank | MySQL/TiDB (Drizzle ORM) |
| Auth | Manus OAuth + Magic Login Links |
| KI-Bilder | fal.ai (Nano Banana Pro, $0.15/Bild) |
| KI-Videos | fal.ai (Veo 3.1 Fast + Kling 3.0 Pro) |
| Posting | Blotato API (8 Plattformen: Instagram, TikTok, YouTube, Facebook, LinkedIn, Threads, Twitter) |
| Content-KI | GoViralBitch API (eigener Server auf Render) |
| E-Mail | Brevo API |
| Bot | Botpress (WhatsApp-Integration) |
| Hosting | Manus Platform (sozialmedia.best) |

### Design-System
- **Theme:** Schwarz + Gold (Deep Black Background, Gold Primary in OKLCH)
- **Fonts:** Montserrat (Headlines) + Inter (Body) via Google Fonts CDN
- **Effekte:** Gold Glow, Gold Shimmer Animation, Glassmorphism Cards, White Glow
- **Mobile:** Bottom Tab Bar (5 Hauptnavigation) + Drawer-Menü für alle Tools
- **Desktop:** Sidebar mit 4 Sektionen (Erstellen, Recherche, Ressourcen, System)

---

## 2. Architektur-Übersicht

### Dateien
| Bereich | Anzahl | Zeilen |
|---------|--------|--------|
| Frontend Pages | 36 .tsx | ~8.000 |
| Frontend Components | 71 .tsx | ~12.000 |
| Backend (routers.ts) | 1 | 3.031 |
| Backend (db.ts) | 1 | 823 |
| Lina API (linaRoutes.ts) | 1 | 1.036 |
| Server Files gesamt | 36 .ts | ~6.000 |
| Dependencies | 68 | — |
| DevDependencies | 25 | — |

### Datenbank (17 Tabellen)
| Tabelle | Zweck |
|---------|-------|
| `users` | Partner mit Rolle (admin/user), Partnernummer, WhatsApp |
| `contentPosts` | Alle Posts mit Status (pending/approved/rejected/scheduled/published) |
| `approvalLogs` | Freigabe-Historie |
| `contentTemplates` | Wiederverwendbare Vorlagen |
| `creatorSpyReports` | Wettbewerber-Analyse |
| `analyticsSnapshots` | Performance-Daten |
| `contentLibrary` | Freigegebene Posts zum Kopieren |
| `abTestGroups` | A/B-Test Varianten |
| `optimalPostingTimes` | Beste Zeiten pro Plattform |
| `lrProducts` | 226 LR-Produkte mit Originalbildern |
| `trendScans` | Virale Trends (TikTok, YouTube, Reddit) |
| `evergreenPosts` | Recycling-Queue für Top-Posts |
| `monthlyPlans` | 30-Tage Content-Pläne |
| `inviteTokens` | Magic Login Tokens |
| `teamActivityLog` | Team-Aktivitäten |
| `generationUsage` | KI-Nutzung pro Partner |
| `globalBudget` | Budget-Tracking für fal.ai |

### Lina REST API (22 Endpunkte für Botpress)
| Endpunkt | Methode | Zweck |
|----------|---------|-------|
| `/api/lina/content` | GET | Fertige Posts abrufen |
| `/api/lina/library` | GET | Bibliothek-Posts |
| `/api/lina/products` | GET | LR-Produkte |
| `/api/lina/status` | GET | System-Status |
| `/api/lina/invite` | POST | Partner einladen |
| `/api/lina/login-link` | POST | Magic Login Link generieren |
| `/api/auth/magic/:token` | GET | Magic Login ausführen |
| `/api/lina/notify` | POST | Benachrichtigung senden |
| `/api/lina/partner-stats/:nr` | GET | Partner-Statistiken |
| `/api/lina/self-approve` | POST | Selbst-Freigabe |
| `/api/lina/pending/:nr` | GET | Ausstehende Posts |
| `/api/lina/generate` | POST | Content + Bild generieren |
| `/api/lina/templates` | GET | Vorlagen abrufen |
| `/api/lina/hashtags` | POST | KI-Hashtags generieren |
| `/api/lina/schedule` | POST | Post planen |
| `/api/lina/weekly-plan` | GET | Wochenplan |
| `/api/lina/objection` | POST | Einwandbehandlung |
| `/api/lina/health` | GET | Health Check |
| `/api/lina/publish-to-blotato` | POST | Direkt auf Social Media posten |
| `/api/lina/viral/trends` | GET | Virale Trends |
| `/api/lina/viral/clone` | POST | Trend zu Post klonen |

### Frontend Pages (36 Seiten)
**Erstellen:** Dashboard, Content Wizard, Content Generator, Content Remix, Lifestyle-Engine, Karussell-Generator, Freigabe-Queue, Pipeline, Bibliothek

**Recherche:** Trend-Scanner, Creator Spy, Hashtag-Engine

**Ressourcen:** Vorlagen, Produkte, Monatsplan, Evergreen Recycling, Einwandbehandlung, A/B Testing, Feedback, Posting-Zeiten, Kalender, Analytics

**System:** Team-Management, Einstellungen, Onboarding, Quick-Start

---

## 3. Was bereits funktioniert

- **Content erstellen:** Text + Bild (Nano Banana Pro) + Video (Veo 3.1 / Kling 3.0 Pro) per KI
- **Freigabe-Workflow:** Pending → Approved → Scheduled → Published
- **Auto-Post:** Blotato postet auf 8 Plattformen nach Freigabe
- **Bibliothek:** Fertige Posts zum 1-Tap Kopieren (Text + Hashtags + Bild speichern)
- **Magic Login:** Partner klickt Link → sofort eingeloggt ohne Passwort
- **226 LR-Produkte** mit Originalbildern in der Datenbank
- **Brand Voice System:** KI-generierter Ton pro Plattform (9 Plattformen)
- **Quality Gate:** Automatische Prüfung vor jedem Post (Länge, Hook, CTA, Emojis, Hashtags)
- **Virale Trends:** Scanner für TikTok, YouTube, Reddit mit Viral Score
- **Monatsplan:** 30 Posts auf Knopfdruck generieren
- **Evergreen Recycling:** Top-Posts automatisch wiederverwenden
- **Smart Posting Times:** Datenbasierte optimale Zeiten pro Plattform
- **Schwarz + Gold Design:** Premium-Look, Mobile-First mit Bottom Tab Bar

---

## 4. Was NICHT funktioniert / Probleme

### Botpress/WhatsApp (Hauptproblem)
- Bilder kommen auf WhatsApp nur als Link, nicht als echte Mediendatei
- Texte werden abgeschnitten (WhatsApp-Limit 4096 Zeichen)
- Skripte (Slide-Anweisungen) werden an Partner geschickt statt fertige Posts
- Content erstellen generiert kein Bild (Fehlermeldung "Bild konnte nicht generiert werden")
- Menüpunkte leiten teilweise in falsche Flows

### Dashboard
- Einige Seiten haben noch nicht das volle Gold-Theme (Details in Karten etc.)
- Keine Push-Benachrichtigungen wenn neuer Content bereit ist
- Kein Onboarding-Tutorial für neue Partner
- Analytics zeigt keine echten Daten (nur Platzhalter)
- Kalender-Sync mit Blotato nicht getestet

### Strategie-Entscheidung
**Botpress wird auf 4 einfache Flows reduziert.** Alles Komplexe geht ins Dashboard:
1. Bibliothek abholen (1 Post mit Bild)
2. Einwandbehandlung (Text)
3. Schnelle Hilfe (FAQ)
4. "Mein Dashboard" → Magic Login Link schicken

---

## 5. Dein Auftrag: Analyse & Vorschläge

### A) Design
- Ist das Schwarz + Gold Theme professionell genug für 1000+ LR-Partner?
- Welche Micro-Interactions fehlen? (Hover, Transitions, Loading States)
- Wie kann die Mobile-Experience noch besser werden?
- Welche Animationen machen das System "premium"?
- Vergleich mit: Predis.ai, Ocoya, Buffer, Later, Hootsuite — was machen die besser?

### B) Tools die eingebaut werden sollten
- **KI-Avatar-Videos:** Partner-Gesicht + KI-generierter Text = persönliches Video
- **Auto-Branding:** Logo + Farben einmal hochladen, alles automatisch branded
- **Smart Content-Feed:** KI lernt was beim Partner funktioniert, schlägt personalisiert vor
- **Canva-ähnlicher Editor:** Bilder direkt im Dashboard bearbeiten (Text-Overlay, Filter)
- **Story-Generator:** Instagram Stories automatisch aus Posts erstellen
- **Carousel-Builder:** Swipe-Posts für Instagram/LinkedIn automatisch generieren
- **Voice-to-Content:** Sprachnachricht → fertiger Post mit Bild
- **Content-Kalender mit Drag&Drop:** Posts visuell planen und verschieben
- **Team-Leaderboard:** Gamification — wer postet am meisten, bestes Engagement
- **WhatsApp-Newsletter:** Direkt aus dem Dashboard an alle Partner senden
- Was fehlt noch? Was würde das System einzigartig machen?

### C) KI-Modelle
- Sind Nano Banana Pro (Bilder) und Veo 3.1 / Kling 3.0 Pro (Videos) die besten Optionen?
- Welche neuen Modelle gibt es Stand April 2026?
- Soll ein eigenes Fine-Tuned Modell für LR-Content trainiert werden?
- Wie kann die Bild-Qualität noch besser werden? (Prompt Engineering, Style Transfer)

### D) Architektur
- Ist tRPC + Express + MySQL die richtige Wahl für 1000+ User?
- Brauchen wir Redis für Caching?
- Soll die Lina API (22 Endpunkte) in einen eigenen Microservice?
- WebSocket für Echtzeit-Updates (neuer Content, Freigabe-Status)?
- CDN für generierte Bilder/Videos?

### E) Business-Features
- Wie monetarisieren? (Freemium, Abo-Stufen, Pay-per-Generation?)
- White-Label für andere Network-Marketing-Unternehmen?
- Affiliate-System: Partner werben Partner?
- Integration mit CRM-Systemen?

---

## 6. Referenz-Websites (LR-Branding)
- https://www.lrworld.com/de-de (offizielles LR)
- https://lr-job.net
- https://lrlifestyle.org

---

## 7. Wichtige Regeln

1. **Nichts kaputt machen.** 1000+ Partner arbeiten live mit dem System.
2. **Erst analysieren, dann vorschlagen.** Keine Änderungen ohne Absprache.
3. **Mobile-First.** 90% der Partner nutzen das System auf dem Handy.
4. **Deutsch.** Alles auf Deutsch — UI, Texte, Fehlermeldungen.
5. **Performance.** Seiten müssen in unter 2 Sekunden laden.
6. **Design:** Schwarz + Gold, Montserrat + Inter, Glassmorphism, Gold Glow. Kein Gelb — echtes Gold (Gradient).

---

## 8. Ergebnis

Schreib eine vollständige Analyse mit:
1. **Design-Review:** Was ist gut, was muss besser werden (mit konkreten Vorschlägen)
2. **Feature-Roadmap:** Top 10 Features die eingebaut werden sollten (priorisiert)
3. **Tech-Empfehlungen:** Architektur, Modelle, Performance
4. **Wettbewerber-Vergleich:** Was macht Predis.ai, Ocoya, Buffer besser — und wie überholen wir sie
5. **Einzigartigkeits-Faktor:** Was macht dieses System anders als alles andere auf dem Markt
6. **Konkreter Implementierungsplan:** Was zuerst, was danach, geschätzter Aufwand

Speichere deine Analyse als `OPENCLAW_ANALYSE.md` im Repo `Matze190519/sozialmedia-best`.

# Übergabe-Notiz: Manus → Claude

**Datum:** 03. April 2026
**Projekt:** sozialmedia.best - LR Content Approval Dashboard
**Von:** Manus AI (hat das Projekt seit ca. 25.03.2026 gebaut)
**An:** Claude (arbeitet mit Matze weiter)

---

## Zusammenfassung

Manus hat auf Basis des bestehenden **Sozial**-Repos (Landing Page mit LiveAvatar, Santa Claus etc.) ein komplett neues **LR Content Approval Dashboard** gebaut. Dieses Dashboard läuft live auf **sozialmedia.best** als Manus-Webdev-Projekt (nicht direkt aus dem GitHub-Repo deployed). Das Sozial-Repo auf GitHub wurde am 30.03.2026 mit den neuen Server-Routers und Frontend-Komponenten aktualisiert, aber der vollständige aktuelle Stand des Manus-Projekts ist umfangreicher als das, was auf GitHub liegt.

---

## Was wurde gebaut (Komplettübersicht)

### 1. Content-Generierung (KI-gestützt)
- **GoViralBitch API** Integration für LR-spezifischen Content (Text + Bilder + Videos)
- **Nano Banana Pro** für Premium-Bildgenerierung ($0.15/Bild)
- **Veo 3.1 Fast** für kurze Videos (bis 8s, 4K, Audio)
- **Kling 3.0 Pro** als Fallback für längere Videos (bis 15s)
- **Content Wizard** mit Schritt-für-Schritt Erstellung
- **Autopilot-Modus**: Trend scannen → Text + Bild + Video + Hashtags → Freigabe in einem Klick
- **Lifestyle-Content-Engine**: 5 Kategorien (Freiheit, Luxusautos, Erfolg, Reisen, Motivation)
- **Karussell-Generator** für Instagram/LinkedIn Slides

### 2. Content-Freigabe & Publishing
- **Freigabe-Flow**: Jeder Partner gibt seinen EIGENEN Content frei (nicht Admin)
- **Kanban-Pipeline**: Visuelles Board (Entwurf → Review → Freigabe → Gepostet)
- **Blotato-Integration**: One-Click Multi-Publish auf Instagram, TikTok, LinkedIn, Facebook
- **Direct Post**: Copy+Deeplink für Partner ohne Blotato-Account
- **Smart Posting Times**: Datenbasierte optimale Posting-Zeiten pro Plattform
- **Blotato Calendar API**: Kalender-View mit geplanten Posts

### 3. Intelligence & Recherche
- **Trend-Scanner**: Live TikTok/YouTube/Reddit Scanning mit Viral Score
- **Creator Spy**: Konkurrenz-Analyse
- **Smart Hashtag-Engine**: KI-generierte trendbasierte Hashtags (max 5 für Instagram)
- **Hashtag-Pools**: Vordefinierte LR-spezifische Sets pro Content-Pillar (6 Kategorien)
- **Monatsplan-Generator**: 30 Posts auf Knopfdruck
- **Evergreen Recycling**: Top-Posts automatisch nach X Wochen wiederverwenden

### 4. Team & Gamification
- **Team Leaderboard**: Wer postet am meisten, bester Content Score
- **Gamification**: Punkte, Badges, Levels für Team-Motivation
- **Team-Aktivitäten**: Echtzeit-Stream
- **Cross-Platform Analytics**: Engagement-Daten, Posting-Heatmap, Content-Mix Analyse

### 5. Auth-System (Magic Link)
- **Magic Link Auth**: Partner bekommt Login-Link von Lina (WhatsApp) → klickt → sofort eingeloggt
- **Kein Manus OAuth für Partner nötig** - nur Token-basierter Login
- **Admin (Matze) behält Manus OAuth** als Login-Methode
- **Einladungs-Token System**: Admin erstellt Links, Partner tritt per WhatsApp-Link bei
- **Join-Seite**: /join/:token mit Auto-Login

### 6. Lina REST-API (11 Endpoints für Botpress)
Die komplette API-Dokumentation liegt in `LINA_API_DOCS.md`. Hier die Endpoints:

| Endpoint | Methode | Beschreibung |
|---|---|---|
| `/api/lina/login-link` | POST | Magic Login-Link generieren |
| `/api/lina/content` | GET | Freigegebene Posts abrufen |
| `/api/lina/pending/:nr` | GET | Wartende Posts eines Partners |
| `/api/lina/self-approve` | POST | Partner gibt eigenen Content frei |
| `/api/lina/status` | GET | System-Status prüfen |
| `/api/lina/notify` | POST | WhatsApp Notification senden |
| `/api/lina/partner/:nr` | GET | Partner-Info abrufen |
| `/api/lina/register` | POST | Neuen Partner registrieren |
| `/api/lina/stats` | GET | Dashboard-Statistiken |
| `/api/lina/generate` | POST | Content per API generieren |
| `/api/lina/platforms` | GET | Verfügbare Plattformen |

**Base URL:** `https://sozialmedia.best/api/lina/`

### 7. Datenbank-Tabellen (Drizzle ORM / TiDB)
- `users` - Partner mit Partnernummer, WhatsApp, isApproved, Blotato API Key, Branding
- `content_posts` - Alle generierten Posts mit Status, Media, Plattformen, Quality Score
- `approval_logs` - Audit Trail für jede Freigabe-Aktion
- `invite_tokens` - Einladungs-Tokens für Partner-Registrierung
- `lr_products` - 226 LR Produkte (aus Botpress importiert)
- `content_feedback` - Bewertungen für Posting-Zeiten-Optimierung
- `trend_items` - Gescannte Trends

### 8. Frontend-Seiten (30+ Seiten)
Dashboard-Layout mit Sidebar-Navigation, Premium Black-Gold Design:

- Home (Dashboard-Übersicht)
- ContentWizardPage (Content erstellen)
- ApprovalPage (Freigabe-Center)
- KanbanPage (Pipeline-Board)
- LibraryPage (Content-Bibliothek)
- CalendarPage (Posting-Kalender)
- TrendScannerPage (Trend-Recherche)
- CreatorSpyPage (Konkurrenz-Analyse)
- HashtagPage (Hashtag-Engine)
- MonthlyPlanPage (Monatsplan)
- EvergreenPage (Recycling)
- LifestylePage (Lifestyle-Content)
- CarouselPage (Karussell-Generator)
- AnalyticsPlusPage (Erweiterte Analytics)
- LeaderboardPage (Team-Ranking)
- TeamActivityPage (Team-Stream)
- PostingTimesPage (Optimale Zeiten)
- ProductsPage (226 LR Produkte)
- SettingsPage (Einstellungen)
- OnboardingPage (Blotato Setup-Guide)
- AdminUsersPage (Partner-Verwaltung)
- InviteTokensPage (Token-Verwaltung)
- JoinPage (Magic Link Login)
- und weitere...

### 9. Tests
- **232 Tests bestanden** (letzte Zählung)
- **16+ Test-Dateien** im server/-Verzeichnis
- Vitest als Test-Framework

---

## Was noch OFFEN ist (TODO)

### Botpress/Lina Integration (angefangen, nicht fertig)
- Botpress Flows mit sozialmedia.best API-Endpoints verbinden
- Content Hub öffnen → Magic Login-Link generieren
- Fertiger Content abrufen → /api/lina/content
- Content freigeben → /api/lina/pending + /api/lina/self-approve
- **Erledigt:** LR Startersets Knowledge Base auf lr-job.eu Link aktualisiert (alte Startsets Neu.docx gelöscht)

### Freigabe-Flow Korrektur
- Jeder Partner gibt seinen EIGENEN Content selbst frei (nicht Admin) → teilweise implementiert
- Admin gibt nur einmalig Partner frei (Zugang zur Seite) → implementiert
- Bibliothek zeigt freigegebene Posts von ALLEN Partnern (gemeinsamer Pool) → offen
- Dashboard zeigt nur eigenen Content pro Partner → offen

### UI/Design
- Premium Black-Gold Design durchgängig machen
- Mobile-Optimierung aller Seiten (Grundlagen gemacht, Details offen)
- Partner gibt eigenen Content selbst frei (UI-Flow)

---

## Technischer Stack

| Komponente | Technologie |
|---|---|
| Frontend | React 19 + Tailwind 4 + shadcn/ui |
| Backend | Express 4 + tRPC 11 |
| Datenbank | TiDB (MySQL-kompatibel) via Drizzle ORM |
| Auth | Magic Link (JWT) + Manus OAuth (Admin) |
| Content-KI | GoViralBitch API + fal.ai (Nano Banana, Veo 3.1, Kling 3.0) |
| Publishing | Blotato API (8 Accounts verbunden) |
| Hosting | Manus Webdev (sozialmedia.best) |
| Bot | Botpress (Lina 2.0 auf WhatsApp) |
| Tests | Vitest |

---

## Wichtige Dateien

| Datei | Beschreibung |
|---|---|
| `server/routers.ts` | Alle tRPC Procedures (Haupt-Backend-Logik) |
| `server/linaRoutes.ts` | 11 REST-Endpoints für Botpress/Lina |
| `server/externalApis.ts` | GoViralBitch + Blotato + fal.ai API-Clients |
| `server/trendScanner.ts` | Trend-Scanner Engine |
| `server/hashtagEngine.ts` | Smart Hashtag-Engine |
| `server/smartPostingTimes.ts` | Optimale Posting-Zeiten Algorithmus |
| `server/lifestyleEngine.ts` | Lifestyle-Content-Engine |
| `drizzle/schema.ts` | Alle Datenbank-Tabellen |
| `LINA_API_DOCS.md` | Komplette Lina API-Dokumentation |
| `todo.md` | Vollständige Feature-History mit Status |

---

## Hinweise für Claude

1. **Das Projekt läuft als Manus-Webdev-Projekt**, nicht direkt aus dem GitHub-Repo. Die Domain sozialmedia.best zeigt auf das Manus-Hosting.

2. **Der GitHub-Stand (Sozial-Repo, main branch, 30.03.2026)** enthält die Server-Routers und Frontend-Komponenten, aber möglicherweise nicht alle letzten Änderungen vom 02.04.2026 (Magic Link Auth, Lina API, Blueprint Features, Mobile Fixes).

3. **Botpress Lina 2.0** hat folgende Knowledge Bases:
   - LR Startersets → jetzt mit lr-job.eu Link (Inline Document, alte docx gelöscht)
   - Weitere KBs für Einwandbehandlung, FAQ etc.

4. **Blotato** ist konfiguriert mit 8 Social-Media-Accounts. Partner brauchen eigenen Blotato-Account (25€/Monat) oder nutzen "Direct Post" (Copy+Paste).

5. **GoViralBitch API** läuft auf einem separaten Server (goviralbitch-deploy Repo).

6. **Matze ist seit 30.03. im Krankenhaus** - daher keine Aktivität seit 3 Tagen.

---

## Nächste Schritte (Empfehlung)

1. **Botpress Flows fertig verbinden** - Die API-Endpoints stehen bereit, müssen nur in Botpress Studio als HTTP-Aufrufe eingebaut werden
2. **Freigabe-Flow testen** - Mit echten Partnern den Magic Link → Login → Content freigeben Flow durchspielen
3. **10 Partner Testphase starten** - System ist grundsätzlich live-ready
4. **Mobile-Optimierung verfeinern** - Grundlagen stehen, Details verbessern

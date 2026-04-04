# Claude Briefing: sozialmedia.best – Projekt-Zusammenführung

## Überblick

Das Projekt **sozialmedia.best** ist ein Social-Media-Content-Management-System für das LR Lifestyle Team. Es besteht aus zwei Teilen, die zusammengeführt werden müssen:

1. **Manus-Teil** (Backend + Dashboard) – gebaut von Manus AI
2. **Claude-Teil** (Landing Page + Botpress/Lina-Integration) – gebaut von Claude

---

## 1. Manus-Teil: Das Dashboard (sozialmedia.best)

### GitHub Repository
**`https://github.com/Matze190519/sozialmedia-best`** (privat)

### Tech-Stack
- **Frontend:** React 19 + Tailwind CSS 4 + shadcn/ui
- **Backend:** Express 4 + tRPC 11 + Drizzle ORM
- **Datenbank:** MySQL/TiDB (Cloud)
- **Auth:** Manus OAuth (Admin) + Magic Link (Partner via Lina)
- **Hosting:** Manus Webdev Platform (sozialmedia.best)

### Was Manus gebaut hat (komplett funktionsfähig)

**Content-Workflow (Kern-Feature):**
- Content-Generator: KI generiert Posts mit Text + Bild (fal.ai) + Video
- Content-Queue: Alle generierten Posts in einer Übersicht
- Freigabe-System: Admin genehmigt/lehnt Posts ab, mit Kommentaren
- Auto-Post via Blotato API: Genehmigter Content wird automatisch auf Instagram, TikTok, LinkedIn, Facebook, YouTube, Twitter gepostet
- Kalender-Ansicht: Geplante Posts im Kalender
- Kanban-Board: Visuelles Pipeline-Board (Entwurf → Review → Freigabe → Gepostet)

**Intelligence-Features:**
- Trend-Scanner: Virale Trends von TikTok, YouTube, Reddit erkennen
- Creator Spy: Wettbewerber-Analyse
- Smart Hashtag-Engine: KI-generierte Hashtags pro Plattform
- Optimale Posting-Zeiten: Datenbasiert pro Plattform
- A/B Testing: 2 Varianten vergleichen
- Content Remix: Bestehenden Content für andere Plattformen umschreiben

**Ressourcen:**
- Content-Bibliothek: Texte, Bilder, Videos zum Kopieren
- LR-Produktbibliothek: 226+ Produkte mit Originalbildern (importiert aus Botpress ProductTable)
- Templates: Vorlagen für verschiedene Content-Typen
- Evergreen Recycling: Top-Posts automatisch wiederverwenden
- Monatsplan-Generator: 30 Posts auf Knopfdruck

**Team-Management:**
- Partner-Freischaltung: Admin gibt Partner manuell frei (Partnernummer + WhatsApp)
- Team Leaderboard: Gamification mit Punkten und Badges
- Admin-Nutzerübersicht: Stats pro Partner
- Invite-Tokens: Partner einladen

**Lina REST API (12 Endpoints – für Botpress-Anbindung):**

| Endpoint | Methode | Beschreibung |
|---|---|---|
| `/api/lina/content` | GET | Freigegebene Posts abrufen (mit Filter: platform, pillar) |
| `/api/lina/library` | GET | Bibliothek-Inhalte abrufen |
| `/api/lina/products` | GET | LR-Produkte abrufen (mit Kategorie-Filter) |
| `/api/lina/status` | GET | System-Status prüfen |
| `/api/lina/invite` | POST | Einladungs-Token erstellen |
| `/api/lina/invite/:token` | GET | Token verifizieren |
| `/api/lina/login-link` | POST | Magic Login-Link generieren (für Partner) |
| `/api/auth/magic/:token` | GET | Magic Link einlösen → Session → Redirect zum Dashboard |
| `/api/lina/notify` | POST | Benachrichtigungen für Partner |
| `/api/lina/partner-stats/:number` | GET | Partner-Stats für Lina |
| `/api/lina/self-approve` | POST | Partner gibt eigenen Content frei |
| `/api/lina/pending/:partnerNumber` | GET | Ausstehende Posts eines Partners |

**Base-URL:** `https://sozialmedia.best`

### Datenbank-Schema (Haupttabellen)
- `users` – Partner mit Partnernummer, Telefon, isApproved, blotatoApiKey, personalBranding
- `content_posts` – Alle Posts mit Status (pending/approved/rejected/scheduled/published), Plattformen, Medien
- `approval_logs` – Audit-Trail für alle Freigabe-Aktionen
- `content_library` – Geteilte Content-Bibliothek
- `ab_test_groups` – A/B Test Gruppen
- `optimal_posting_times` – Gelernte beste Posting-Zeiten
- `lr_products` – 226+ LR Produkte mit Bildern
- `trend_scans` – Virale Trends

### 34 Seiten im Dashboard
ABTestPage, AdminUsersPage, AnalyticsPage, AnalyticsPlusPage, ApprovalPage, BlotatoCommandPage, CalendarPage, CarouselPage, ContentQueue, ContentRemixPage, ContentWizardPage, CreatorSpyPage, EvergreenPage, FeedbackPage, GeneratorPage, HashtagPage, Home (Dashboard), InviteTokensPage, JoinPage (Magic Link Login), KanbanPage, LeaderboardPage, LibraryPage, LifestylePage, MonthlyPlanPage, OnboardingPage, PostingTimesPage, ProductsPage, SettingsPage, TeamActivityPage, TeamPage, TemplatesPage, TrendScannerPage

---

## 2. Claude-Teil: Landing Page + Botpress/Lina

### GitHub Repository
**`https://github.com/Matze190519/Sozial`** (öffentlich)

### Was Claude gebaut hat
- **Landing Page:** Premium Gold/Schwarz Design mit Hero, Social Proof, FAQ, Lina-Sektion, Autokonzept
- **Botpress/Lina Integration:** Chatbot "Lina" auf der Landing Page (via Botpress Webchat SDK)
- **LinaChatbot.tsx:** React-Komponente mit Botpress open/close/toggle + WhatsApp Fallback
- **Custom CSS:** Gold/Purple Styling für den Botpress Webchat
- **LiveAvatar:** HeyGen LiveAvatar Integration (Santa Claus Avatar)
- **Seiten:** Home (Landing), ThankYou, Impressum, Datenschutz, About, LiveAvatar
- **Wissensdatenbanken:** Santa Claus, Landing Page, HeyGen – alles für Botpress/Lina

### Botpress/Lina Architektur
Lina ist ein KI-Chatbot auf **Botpress**, der über WhatsApp und Web erreichbar ist. Lina hat:
- Menü-System mit verschiedenen Flows (Produkte, Startsets, Tools, etc.)
- ProductTable: 226+ LR Produkte mit Bildern (mhware.de)
- Wissensdatenbanken für verschiedene Themen
- WhatsApp-Nummer: +491715060008

---

## 3. Was zusammengeführt werden muss

### Ziel
Die Landing Page (Claude/Sozial) und das Dashboard (Manus/sozialmedia-best) sollen als ein System funktionieren:
- Landing Page → Besucher informieren, Lina-Chat öffnen
- Lina (Botpress) → Content abrufen, Partner einladen, Magic Login-Links generieren
- Dashboard → Content erstellen, freigeben, automatisch posten

### Offene Botpress/Lina-Aufgaben (müssen in Botpress Studio gemacht werden)

1. **Startsets im Menü aktualisieren** – Die aktuellen LR April 2026 Sets einpflegen
2. **Lina Menü-Flows mit sozialmedia.best API-Endpoints verbinden:**
   - "Fertiger Content abrufen" → `GET https://sozialmedia.best/api/lina/content`
   - "Content freigeben" → `GET https://sozialmedia.best/api/lina/pending/{partnerNumber}` + `POST https://sozialmedia.best/api/lina/self-approve`
   - "Content Hub öffnen" → `POST https://sozialmedia.best/api/lina/login-link` → Magic Link an Partner senden
   - "Produkte anzeigen" → `GET https://sozialmedia.best/api/lina/products`
   - "Partner-Stats" → `GET https://sozialmedia.best/api/lina/partner-stats/{partnerNumber}`
3. **Prüfen ob alle Flows korrekt funktionieren**
4. **Hauptmenü-Rückweg** sicherstellen (immer Weg zurück zum Hauptmenü)

### Code-Zusammenführung
Die beiden Repos haben unterschiedliche Strukturen:
- **Sozial** (Claude): Einfache Landing Page, kaum Backend, Botpress-Integration im Frontend
- **sozialmedia-best** (Manus): Volles Dashboard mit Backend, DB, tRPC, 34 Seiten

**Empfohlener Ansatz:**
1. Die Landing Page aus `Sozial/client/src/pages/Home.tsx` als neue Route in `sozialmedia-best` integrieren (z.B. als `/landing` oder als neue Home-Seite für nicht-eingeloggte Besucher)
2. Die Botpress-Integration (`LinaChatbot.tsx`, Custom CSS) in `sozialmedia-best` übernehmen
3. Impressum/Datenschutz-Seiten übernehmen
4. Die LiveAvatar-Komponenten bei Bedarf übernehmen
5. Die Botpress-Flows in Botpress Studio mit den Lina API-Endpoints verbinden

### Wichtige Dateien zum Übernehmen aus Sozial-Repo
- `client/src/pages/Home.tsx` – Landing Page
- `client/src/components/LinaChatbot.tsx` – Botpress Integration
- `client/src/components/LiveAvatarFAB.tsx` – LiveAvatar Button
- `client/src/components/LiveAvatarPopup.tsx` – LiveAvatar Popup
- `client/src/pages/LiveAvatar.tsx` – LiveAvatar Seite
- `client/src/pages/Impressum.tsx` – Impressum
- `client/src/pages/Datenschutz.tsx` – Datenschutz
- `client/src/pages/About.tsx` – Über uns
- `client/src/pages/ThankYou.tsx` – Danke-Seite
- `botpress-custom-style.css` – Botpress Styling
- `botpress-custom-style-purple.css` – Botpress Purple Styling
- Alle `*.md` und `*.txt` Wissensdatenbanken

---

## 4. Externe Dienste & API-Keys

| Dienst | Zweck | Hinweis |
|---|---|---|
| **Blotato** | Multi-Plattform Social Media Posting | API Key im System, Base URL: backend.blotato.com/v2 |
| **Botpress** | Lina Chatbot (WhatsApp + Web) | Wird in Botpress Studio konfiguriert |
| **fal.ai** | KI-Bildgenerierung | API Key im System |
| **HeyGen** | LiveAvatar (Santa Claus) | Embed-ID im Code |
| **Manus OAuth** | Admin-Login | Automatisch konfiguriert |
| **Magic Links** | Partner-Login via Lina | JWT-basiert, kein OAuth nötig |

---

## 5. Design-Vorgaben

- **Landing Page:** Premium Gold/Schwarz, elegant, "edel und teuer"
- **Dashboard:** Dunkles Theme, Glassmorphism Cards, Gold-Akzente
- **Lina-Chat:** Purple Gradient oder Gold/Schwarz (Custom CSS)
- **Keine gelben Töne** – immer echtes Gold (Gradient)
- **Kein Emoji** in professionellen Texten
- **Mobile-First** – alles muss auf Handy funktionieren

---

## 6. Zusammenfassung für Claude

Du (Claude) hast die Landing Page und die Botpress/Lina-Integration gebaut. Manus hat das komplette Dashboard mit 34 Seiten, Backend, Datenbank und 12 Lina-API-Endpoints gebaut. Jetzt müssen beide Teile zusammengeführt werden:

1. **Dein Code** (Sozial-Repo) → Landing Page + Botpress-Integration in das Dashboard-Projekt übernehmen
2. **Botpress Studio** → Die Lina-Flows mit den neuen API-Endpoints von sozialmedia.best verbinden
3. **Testen** → Alles durchspielen: Landing Page → Lina → Content abrufen → Dashboard → Freigeben → Auto-Post

Das Dashboard-Repo ist: **`https://github.com/Matze190519/sozialmedia-best`**
Dein Repo ist: **`https://github.com/Matze190519/Sozial`**

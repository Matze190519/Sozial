# Strategiewechsel: Dashboard-First statt Botpress-First

**Datum:** 08.04.2026
**Status:** Entscheidungsvorlage

---

## 1. Warum der Wechsel nötig ist

Botpress + WhatsApp für komplexe Content-Workflows funktioniert nicht zuverlässig. Die Probleme der letzten Tage zeigen das deutlich:

| Problem | Ursache | Lösbar in Botpress? |
|---------|---------|---------------------|
| Bilder kommen nicht an | Image Card Nodes setzen Variablen falsch | Theoretisch ja, aber extrem fehleranfällig |
| Texte abgeschnitten | WhatsApp hat 1024-Zeichen-Limit | Nein — WhatsApp-Limitation |
| Skripte statt Posts | Falscher API-Endpunkt im Flow | Ja, aber jede Änderung kann alles kaputt machen |
| Kein Bild generiert | Bildgenerierung braucht 10-20 Sek, Botpress hat Timeout | Nein — Timeout-Limitation |
| Videos nicht kopierbar | WhatsApp zeigt Videos inline, kein Download-Button | Nein — WhatsApp-Limitation |
| Jede Änderung macht was kaputt | 74 Flows, keine Tests, kein Staging | Nein — Architektur-Problem |

**Fazit:** Botpress bleibt für einfache Dinge (Menü, Bibliothek abholen, Einwandbehandlung). Alles Komplexe geht ins Dashboard.

---

## 2. Die neue Architektur

```
WhatsApp (Lina Bot)          Dashboard (sozialmedia.best)
─────────────────            ──────────────────────────────
Hauptmenü                    Magic Login (Link von Lina)
├── Bibliothek abholen       ├── Content Bibliothek (Bilder/Videos kopieren)
├── Einwandbehandlung        ├── Content freigeben (mit Vorschau)
├── Schnelle Hilfe           ├── KI Content erstellen (mit Bild-Generierung)
└── → Link zum Dashboard     ├── Virale Trends
                             ├── Content Kalender
                             ├── Analytics
                             ├── Team Management
                             ├── Produkt-Katalog
                             └── Alle weiteren Tools
```

**Lina auf WhatsApp schickt Links:**
- "Dein Content ist fertig! Hier freigeben: sozialmedia.best/approval?token=xyz"
- "Neue Trends gefunden! Hier ansehen: sozialmedia.best/trends"
- "Dein Dashboard: sozialmedia.best/login?phone=49xxx"

---

## 3. Magic Login — So funktioniert es

Der Partner tippt **nichts**. Lina kennt die WhatsApp-Nummer und schickt einen personalisierten Link:

```
https://sozialmedia.best/magic?token=abc123def456
```

Ablauf:
1. Lina kennt die Telefonnummer des Partners (WhatsApp-Tag)
2. Lina generiert einen zeitlich begrenzten Token (24h gültig)
3. Partner klickt den Link → ist sofort eingeloggt
4. Kein Passwort, kein OAuth, kein Tippen

**Technisch:** Der Token wird in der DB gespeichert mit `phoneNumber`, `expiresAt`, `userId`. Beim Klick wird ein JWT-Cookie gesetzt.

---

## 4. Was Botpress noch macht (minimal)

Nur diese 4 Dinge bleiben in Botpress:

| Menüpunkt | Was passiert | Komplexität |
|-----------|-------------|-------------|
| Bibliothek | Zeigt 1 Post (Bild + Caption) zum Kopieren | Einfach |
| Einwandbehandlung | Textantwort auf Einwand | Einfach |
| Schnelle Hilfe | FAQ-Antworten | Einfach |
| Dashboard-Link | Schickt personalisierten Magic-Login-Link | Einfach |

Alles andere (Content erstellen, freigeben, Trends, Analytics, Team) → Dashboard.

---

## 5. Wo liegt der Code — Zugang für OpenClaw

| Was | Wo | Zugang |
|-----|-----|--------|
| Dashboard Frontend + Backend | Manus Webdev Projekt `lr-approval-dashboard` | Export nach GitHub nötig |
| Botpress Bot | Botpress Cloud (Bot ID in Botpress Studio) | Botpress Login |
| Make.com Szenarien | eu2.make.com, Org 3771772 | Make.com Login |
| Prompts + Dokumentation | github.com/Matze190519/Sozial | GitHub |

**Für OpenClaw braucht er:**

1. **Dashboard-Code auf GitHub exportieren** — Im Manus Dashboard → Settings → GitHub → Repository erstellen. Dann hat OpenClaw den kompletten Code (React + Express + tRPC + Drizzle).

2. **Tech-Stack:**
   - Frontend: React 19 + Tailwind 4 + shadcn/ui
   - Backend: Express 4 + tRPC 11
   - Datenbank: MySQL/TiDB (Drizzle ORM)
   - Auth: Manus OAuth (muss für Magic Login erweitert werden)
   - Hosting: Manus Cloud (sozialmedia.best)

3. **Wichtige Dateien:**
   - `client/src/pages/` — 35 Seiten, alle mit echtem Code
   - `server/routers.ts` — 3031 Zeilen, alle API-Endpunkte
   - `server/linaRoutes.ts` — 1036 Zeilen, Botpress-API
   - `drizzle/schema.ts` — 17 Tabellen

---

## 6. Design-Upgrade — Was das Dashboard braucht

Das aktuelle Dashboard ist funktional aber nicht "geil". Für 1000 LR-Partner muss es so aussehen:

**Design-Prinzipien:**
- **Dunkel + Gold** — wie die LR-Marke, edel und professionell
- **Mobile-First** — 90% der Partner nutzen das Handy
- **Große Touch-Targets** — Buttons mindestens 48px hoch
- **Sofort verständlich** — kein Onboarding nötig, alles selbsterklärend
- **Schnell** — unter 2 Sekunden Ladezeit

**Konkrete Design-Änderungen:**

| Bereich | Aktuell | Soll |
|---------|---------|------|
| Farben | Standard Dark Theme | Schwarz + Gold-Gradient + weißer Glow |
| Schrift | System-Font | Inter oder Montserrat, groß und klar |
| Navigation | Sidebar (Desktop) | Bottom-Tab-Bar (Mobile) + Sidebar (Desktop) |
| Content-Karten | Kleine Cards | Große Karten mit Bild-Vorschau, Copy-Button |
| Freigabe | Tabelle | Swipe-Cards (links = ablehnen, rechts = freigeben) |
| Bibliothek | Liste | Instagram-Grid mit 1-Tap-Copy |

---

## 7. Tools die das System 100.000 Jahre voraus machen

### Bereits gebaut (im Dashboard vorhanden):

| Tool | Seite | Status |
|------|-------|--------|
| KI Content Generator | /generator | Funktioniert, braucht Design-Upgrade |
| Content Bibliothek | /library | Funktioniert, braucht Bild-Vorschau |
| Content Freigabe | /approval | Funktioniert, braucht Swipe-UI |
| Trend Scanner | /trends | Funktioniert |
| Content Kalender | /calendar | Funktioniert |
| A/B Testing | /ab-test | Funktioniert |
| Team Management | /team | Funktioniert |
| Produkt-Katalog | /products | 226 LR-Produkte mit Bildern |
| Hashtag Generator | /hashtags | Funktioniert |
| Content Remix | /remix | Funktioniert |
| Carousel Creator | /carousel | Funktioniert |
| Kanban Board | /kanban | Funktioniert |
| Leaderboard | /leaderboard | Funktioniert |
| Analytics Plus | /analytics-plus | Funktioniert |
| Budget Tracker | /budget | Funktioniert |
| Posting-Zeiten | /posting-times | Funktioniert |
| Monatsplan | /monthly-plan | Funktioniert |
| Evergreen Content | /evergreen | Funktioniert |
| Lifestyle Inspiration | /lifestyle | Funktioniert |
| Content Wizard | /wizard | Funktioniert |
| Blotato Auto-Post | /blotato | Funktioniert |
| Instagram Growth | /instagram-growth | Funktioniert |
| Invite Tokens | /invite-tokens | Funktioniert |
| Onboarding | /onboarding | Funktioniert |

### Noch zu bauen (Game-Changer):

| Tool | Was es macht | Warum es ein Game-Changer ist |
|------|-------------|-------------------------------|
| **1-Tap Content Copy** | Bild + Caption + Hashtags mit einem Tap kopieren, direkt in Instagram/TikTok einfügen | Kein Partner muss mehr manuell zusammensuchen |
| **KI Video Creator** | Aus einem Bild + Text automatisch ein 15-Sek Reel erstellen | Reels sind 3x mehr Reichweite als Bilder |
| **Smart Benachrichtigungen** | Push-Notification wenn neuer Content bereit ist, Erinnerung wenn Content nicht gepostet wurde | Partner vergessen nicht mehr zu posten |
| **Persönlicher Content-Feed** | KI lernt welche Themen beim Partner am besten performen und schlägt passenden Content vor | Jeder Partner bekommt individuellen Content |
| **Auto-Branding** | Partner lädt 1x sein Logo/Farben hoch, alle generierten Bilder haben automatisch sein Branding | Professioneller Auftritt ohne Designkenntnisse |
| **Konkurrenz-Radar** | Überwacht was andere LR-Partner und MLM-Konkurrenten posten, findet Lücken | Immer einen Schritt voraus |
| **Story-Generator** | Erstellt komplette 5-Slide Instagram Stories mit Text-Overlays | Stories sind der #1 Engagement-Kanal |
| **WhatsApp Broadcast** | Neuer Content wird automatisch an alle Partner per WhatsApp geschickt (mit Magic-Link) | Kein Partner verpasst neuen Content |
| **Performance Dashboard** | Zeigt welcher Content wie viele Likes/Kommentare/Saves bekommen hat — pro Partner | Datengetriebene Content-Strategie |
| **Content-Recycling** | Alte Top-Posts automatisch neu aufbereiten (neues Bild, leicht geänderter Text) | 80% weniger Content-Erstellung nötig |

---

## 8. Empfehlung: Wer macht was

| Aufgabe | Wer | Warum |
|---------|-----|-------|
| Dashboard Design-Upgrade (Mobile-First, Gold-Theme) | **OpenClaw** oder **Manus** | Großer visueller Umbau, braucht Design-Auge |
| Magic Login implementieren | **Manus** | Backend-Änderung, direkt im Webdev-Projekt |
| Botpress auf 4 Flows reduzieren | **Claude Code** | Kennt die Flows bereits |
| 1-Tap Content Copy | **Manus** oder **OpenClaw** | Frontend-Feature |
| KI Video Creator | **Manus** | API-Integration (HeyGen/Runway) |
| Smart Benachrichtigungen | **Manus** | Notification-API ist schon im Template |

**Mein Vorschlag:** Ich (Manus) baue jetzt sofort den Magic Login und das Design-Upgrade. OpenClaw bekommt den Code auf GitHub und kann parallel die neuen Tools bauen. Claude Code reduziert Botpress auf die 4 einfachen Flows.

---

## 9. Nächste Schritte — Sofort

1. **Dashboard-Code auf GitHub exportieren** (Manus Dashboard → Settings → GitHub)
2. **Magic Login bauen** (Token-System + WhatsApp-Link)
3. **Design-Upgrade starten** (Schwarz + Gold, Mobile-First)
4. **Botpress reduzieren** (nur Bibliothek, Einwandbehandlung, Hilfe, Dashboard-Link)
5. **1-Tap Content Copy** als erstes neues Feature

---

## 10. Prompt für Claude Code — Botpress reduzieren

```
Du sollst den Lina-Bot in Botpress auf 4 einfache Flows reduzieren.

WICHTIG: Lösche KEINE bestehenden Flows. Ändere nur das Hauptmenü.

Das Hauptmenü soll nur noch diese 4 Buttons haben:
1. "📚 Bibliothek" → Flow Bibliothek (wie bisher)
2. "💪 Einwandbehandlung" → Flow Einwandbehandlung (wie bisher)  
3. "🆘 Schnelle Hilfe" → Flow Schnelle Hilfe (wie bisher)
4. "🚀 Mein Dashboard" → Schickt Magic-Login-Link

Für Button 4 "Mein Dashboard":
- Execute Code Node:
  const phone = event.tags.conversation['whatsapp:userPhone'] || ''
  const token = Buffer.from(phone + ':' + Date.now()).toString('base64url')
  workflow.dashboardLink = 'https://sozialmedia.best/magic?token=' + token + '&phone=' + encodeURIComponent(phone)
- Text Node: "Hier ist dein persönlicher Dashboard-Link:\n{{workflow.dashboardLink}}\n\nDort findest du alle Tools: Content erstellen, freigeben, Trends, Analytics und mehr!"

Alle anderen Menüpunkte (KI Content erstellen, Content freigeben, Virale Trends, Schnellpost, Wochenplan) werden aus dem Hauptmenü ENTFERNT aber die Flows bleiben bestehen.

Speichern + Publishen. Nichts anderes anfassen.
```

# AUFGABE: sozialmedia.best fertigstellen

## WICHTIG: Du arbeitest am FALSCHEN Repo!

Du hast bisher nur am Repo `Matze190519/Sozial` gearbeitet. Das ist das ALTE Projekt.
Das LIVE-System läuft auf dem Repo `Matze190519/sozialmedia-best`. 
**Alle Änderungen MÜSSEN in `Matze190519/sozialmedia-best` gemacht werden.**

```bash
gh repo clone Matze190519/sozialmedia-best
cd sozialmedia-best
```

---

## WAS BEREITS FUNKTIONIERT (nicht anfassen)

Diese Lina-Endpoints auf sozialmedia.best funktionieren bereits:
- `GET /api/lina/status` → System-Status ✅
- `GET /api/lina/content` → Freigegebene Posts ✅
- `GET /api/lina/products` → LR-Produkte ✅
- `GET /api/lina/library` → Bibliothek ✅

Das Dashboard hat 34 fertige Seiten (ContentQueue, Approval, Calendar, Generator, CreatorSpy, Templates, Analytics, Team, Library, Products, Settings, ABTest, Feedback, Onboarding, TrendScanner, Hashtags, MonthlyPlan, Evergreen, Lifestyle, PostingTimes, ContentWizard, BlotatoCommand, ContentRemix, Carousel, Kanban, Leaderboard, AnalyticsPlus, etc.)

---

## AUFGABE 1: Kaputte Lina-Endpoints fixen

Diese Endpoints sind im Code vorhanden (`server/linaRoutes.ts`), funktionieren lokal, aber NICHT auf der deployed Version. Das Projekt muss neu deployed werden (Publish-Button im Manus Management UI).

Kaputte Endpoints (geben HTML statt JSON zurück):
1. `POST /api/lina/login-link` → Magic Login-Link für Partner
2. `POST /api/lina/self-approve` → Partner gibt eigenen Content frei
3. `POST /api/lina/notify` → Benachrichtigungen abrufen
4. `POST /api/lina/invite` → Einladungs-Token erstellen
5. `GET /api/lina/pending/:partnerNumber` → Wartende Posts
6. `GET /api/lina/partner-stats/:partnerNumber` → Partner-Statistiken
7. `GET /api/auth/magic/:token` → Magic Link einlösen

**Lösung:** Das Projekt muss einfach neu published werden. Die Routen sind korrekt registriert in `server/_core/index.ts` (Zeile 39-40), VOR dem SPA-Catch-All.

Verifizierung nach Deploy:
```bash
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"partnerNumber":"TEST123","name":"Test"}' \
  https://sozialmedia.best/api/lina/login-link
# Muss JSON zurückgeben, NICHT HTML
```

---

## AUFGABE 2: Botpress-Flows mit API verbinden

Die Lina-Endpoints existieren, aber Botpress ruft sie noch nicht auf. Die Botpress-Konfiguration liegt in `client/index.html`:

```
botId: "cac882a1-cf8f-4b8f-9740-8f96ea9558db"
clientId: "32dfe644-9e09-4072-bd72-34340d56cb7b"
```

### WhatsApp-Menü → API-Zuordnung

| Lina Menüpunkt | API Endpoint | Methode |
|---|---|---|
| **Content Hub öffnen** | `POST /api/lina/login-link` | POST mit `{partnerNumber, name}` → gibt `loginUrl` zurück → Lina sendet als klickbaren Link |
| **Fertiger Content abrufen** | `GET /api/lina/content?limit=5` | GET → gibt Posts zurück → Lina formatiert als Liste |
| **Content freigeben** | `GET /api/lina/pending/:nr` dann `POST /api/lina/self-approve` | Erst pending Posts holen, dann Partner wählt, dann freigeben |
| **Einwände meistern** | Botpress Knowledge Base | Intern in Botpress |
| **System-Hilfe & FAQ** | `GET /api/lina/status` | GET → Systemstatus anzeigen |

### Was in Botpress konfiguriert werden muss:

In jedem Flow-Node der einen API-Endpunkt aufruft:
1. **Execute Code** Node mit `fetch()` Aufruf
2. Base URL: `https://sozialmedia.best/api/lina/`
3. Die Partnernummer kommt aus der Botpress-Variable (z.B. `workflow.partnerNumber`)

Beispiel für "Content Hub öffnen" Flow:
```javascript
// In Botpress Execute Code Node:
const response = await fetch('https://sozialmedia.best/api/lina/login-link', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    partnerNumber: workflow.partnerNumber,
    name: workflow.partnerName
  })
});
const data = await response.json();
workflow.loginUrl = data.loginUrl;
// Nächster Node: Text-Nachricht mit workflow.loginUrl senden
```

Beispiel für "Fertiger Content abrufen" Flow:
```javascript
const response = await fetch('https://sozialmedia.best/api/lina/content?limit=5');
const data = await response.json();
workflow.posts = data.posts;
// Nächster Node: Posts als formatierte Liste anzeigen
```

---

## AUFGABE 3: Deine Arbeit aus dem Sozial-Repo übertragen

Du hast im Sozial-Repo (`Matze190519/Sozial`) diese Router gebaut:
- `server/routers/content.ts` → GoViralBitch API Integration
- `server/routers/blotato.ts` → Blotato API Client
- `server/routers/library.ts` → Library Management
- `server/routers/trends.ts` → Trend Feed
- `server/routers/weekplan.ts` → Wochenplaner

Das sozialmedia-best Repo hat bereits eigene Versionen dieser Features in `server/routers.ts` (eine große Datei mit allen Routern). Du musst prüfen:
1. Welche Features aus deinen Sozial-Routern fehlen im sozialmedia-best?
2. Nur die FEHLENDEN Features in `server/routers.ts` einbauen
3. NICHT die bestehenden Funktionen überschreiben

### GoViralBitch API (aus deinem content.ts):
Die API-URL ist als Environment Variable verfügbar: `GOVIRALBITCH_API_URL`
Falls du die Integration einbaust, nutze diese ENV-Variable.

### Blotato API:
Die API-Key ist als Environment Variable verfügbar: `BLOTATO_API_KEY`
Die bestehende Blotato-Integration in sozialmedia-best nutzt bereits diesen Key.

---

## AUFGABE 4: Make.com / n8n Flows

Falls Make.com oder n8n Flows eingerichtet werden sollen, die mit sozialmedia.best kommunizieren:
- Alle Webhooks gehen an `https://sozialmedia.best/api/lina/...`
- Die Endpoints sind REST (kein tRPC), also direkt per HTTP aufrufbar
- Keine Authentifizierung nötig für die Lina-Endpoints (sie sind public)

---

## REIHENFOLGE

1. **Zuerst:** Clone `Matze190519/sozialmedia-best` (NICHT Sozial!)
2. **Dann:** Prüfe ob die Endpoints lokal funktionieren (`npm run dev` → `curl localhost:3000/api/lina/login-link`)
3. **Dann:** Fehlende Features aus deinen Sozial-Routern einbauen
4. **Dann:** Committen und pushen auf `sozialmedia-best`
5. **Dann:** Botpress-Flows konfigurieren (Execute Code Nodes mit fetch)
6. **Zuletzt:** Testen: WhatsApp → Lina → "Content abrufen" → API → Antwort

## VERIFIZIERUNG

Nach jeder Änderung testen:
```bash
# Alle Endpoints müssen JSON zurückgeben:
curl -s https://sozialmedia.best/api/lina/status | jq .
curl -s https://sozialmedia.best/api/lina/content | jq .
curl -s -X POST -H "Content-Type: application/json" -d '{"partnerNumber":"TEST","name":"Test"}' https://sozialmedia.best/api/lina/login-link | jq .
curl -s https://sozialmedia.best/api/lina/pending/TEST | jq .
```

---

## TECH-STACK (sozialmedia-best)

- **Frontend:** React 19 + Tailwind 4 + shadcn/ui
- **Backend:** Express 4 + tRPC 11
- **DB:** MySQL/TiDB via Drizzle ORM
- **Auth:** Manus OAuth + Magic Links (für Partner ohne Manus-Konto)
- **Hosting:** Manus Platform (publish über Management UI)
- **Lina REST API:** Express-Routes in `server/linaRoutes.ts` (NICHT tRPC)
- **Botpress:** Webchat v3.5, Bot-ID: `cac882a1-cf8f-4b8f-9740-8f96ea9558db`

## DATEIEN DIE DU KENNEN MUSST

```
server/linaRoutes.ts        → Alle 11 Lina REST-Endpoints (NICHT ÄNDERN, funktionieren)
server/routers.ts           → Alle tRPC-Procedures (Dashboard-Features)
server/db.ts                → Datenbank-Queries
drizzle/schema.ts           → Datenbank-Schema
server/_core/index.ts       → Server-Setup (Route-Registrierung)
client/src/App.tsx           → Frontend-Routing (34 Seiten)
client/index.html           → Botpress-Konfiguration
```

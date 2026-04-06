# MEISTER-PROMPT FÜR CLAUDE CODE — sozialmedia.best System

## 1. WO LIEGT DER CODE?

Das Projekt liegt auf GitHub:
```
gh repo clone Matze190519/sozialmedia-best
```

Alle Botpress-Dokumentation liegt hier:
```
curl -O https://raw.githubusercontent.com/Matze190519/Sozial/main/CLAUDE_BOTPRESS_KORREKTUR.md
curl -O https://raw.githubusercontent.com/Matze190519/Sozial/main/CLAUDE_BOTPRESS_PROMPT.md
```

**Live-URL:** https://sozialmedia.best  
**Botpress-Bot:** Lina (läuft auf WhatsApp)  
**Stack:** React + tRPC + Express + TiDB (Manus Webdev Projekt)

---

## 2. WAS DAS SYSTEM MACHT (Kontext)

Das ist ein Social-Media-Management-System für LR-Partner (Network Marketing).

- **sozialmedia.best** = Dashboard (Web-App) für Admin und Partner
- **Lina** = WhatsApp-Bot (Botpress), der mit sozialmedia.best über REST-API kommuniziert
- **Blotato** = Posting-Service (postet automatisch auf Instagram, TikTok, Facebook, Threads, LinkedIn)

**Wichtig:** Lina läuft auf WhatsApp. NICHT auf Webchat. Alle Tests müssen auf WhatsApp gemacht werden, nicht im Botpress Webchat-Emulator. Der Webchat-Emulator zeigt nicht das gleiche Verhalten wie WhatsApp.

---

## 3. KRITISCHES PROBLEM: WHATSAPP BEKOMMT KEINE MEDIEN

**Das Hauptproblem:** Wenn Lina auf WhatsApp Content zur Freigabe schickt, kommen NUR Texte an. Bilder und Videos kommen NICHT an.

**Was funktionieren muss:**
1. Partner schreibt Lina auf WhatsApp → wählt "Fertiger Content abrufen"
2. Lina ruft `/api/lina/content` ab → bekommt Posts mit `imageUrl` und `videoUrl`
3. Lina schickt dem Partner auf WhatsApp: Text + Bild + Video (als echte Medien, nicht als Link)
4. Partner wählt "Freigeben" → Lina ruft `/api/lina/self-approve` auf → Post wird automatisch auf Blotato gepostet

**Warum es nicht funktioniert:**
- Botpress sendet Bilder über `{{workflow.imageUrl}}` als Text-Variable → WhatsApp zeigt nur den Link, nicht das Bild
- Für WhatsApp muss Botpress eine **Image Card** oder **Media Message** Node verwenden, die die URL als echtes Bild rendert
- Videos müssen als **Video Card** Node gesendet werden

**Lösung in Botpress:**
- Nach dem Execute-Code-Block für "Fertiger Content abrufen" KEINE Text-Node mit `{{workflow.imageUrl}}` verwenden
- Stattdessen: **Image Card Node** mit `url: {{workflow.posts[0].imageUrl}}`
- Für Videos: **Video Card Node** mit `url: {{workflow.posts[0].videoUrl}}`
- Text separat als **Text Node** davor senden

---

## 4. ALLE DEFEKTEN MENÜS — VOLLSTÄNDIGE PRÜFLISTE

Prüfe JEDEN dieser Punkte auf WhatsApp (nicht Webchat):

| # | Menüpunkt | Was passieren soll | Bekanntes Problem |
|---|-----------|-------------------|-------------------|
| 1 | Content Hub öffnen | Magic Link kommt per WhatsApp | Prüfen ob Link funktioniert |
| 2 | Fertiger Content abrufen | Text + Bild + Video kommen an | **Bilder/Videos kommen nicht an** |
| 3 | Content freigeben | Liste der wartenden Posts, dann Freigabe | Prüfen ob Posts angezeigt werden |
| 4 | Einwände meistern | Antwort auf Einwand kommt | Prüfen |
| 5 | Content nach Wunsch | Topic eingeben → Content + Bild kommt | Prüfen |
| 6 | Leads kaufen | Externer Link | Prüfen ob Link korrekt |
| 7 | System-Hilfe und FAQ | Status-Info kommt | Prüfen |
| 8 | Instagram Growth | Link zur Seite kommt | Prüfen |
| 9 | Neue Features | **KAPUTT** — zeigt keine Buttons | Buttons fehlen komplett |
| 10 | Bibliothek | Posts aus Bibliothek kommen | Prüfen ob Bilder dabei sind |

**Für Menüpunkt 9 "Neue Features":** Füge konkrete Buttons hinzu:
- 🎬 Video-Content erstellen
- 📊 Wochenplan anzeigen
- 🏷️ Hashtags generieren
- 📚 Bibliothek durchsuchen
- 📈 Meine Statistiken

---

## 5. BIBLIOTHEK — MEDIEN MÜSSEN ANKOMMEN

Die Bibliothek (`/api/lina/library`) gibt nur Posts zurück, die ein Bild ODER Video haben.

**Was funktionieren muss auf WhatsApp:**
- Partner wählt "Bibliothek" → bekommt Liste der gespeicherten Posts
- Zu jedem Post: Text + echtes Bild (Image Card) + optional Video (Video Card)
- Partner kann Post direkt freigeben/posten

**API-Endpoint:**
```javascript
const response = await axios.get('https://sozialmedia.best/api/lina/library', {
  params: { partnerNumber: workflow.partnerNumber, limit: 5 }
});
// response.data.posts[i].imageUrl → als Image Card senden
// response.data.posts[i].videoUrl → als Video Card senden (falls vorhanden)
```

---

## 6. REGELN DIE NIEMALS GEBROCHEN WERDEN DÜRFEN

1. **KEINE neuen Flows bauen** — nur bestehende Execute-Code-Blöcke aktualisieren
2. **KEINE neuen Menüpunkte** — Menü existiert bereits
3. **KEIN Team einladen** — Team ist bereits in Botpress
4. **WhatsApp max. 10 Buttons** pro Single-Choice-Node — nie mehr!
5. **Kein Tippen nötig** — Nutzer sollen immer Buttons drücken, nie tippen müssen
6. **Immer Rückweg zum Hauptmenü** — jeder Flow endet mit "Zurück zum Hauptmenü" Button

---

## 7. WICHTIGE API-ENDPOINTS (alle auf sozialmedia.best)

| Endpoint | Methode | Wofür |
|----------|---------|-------|
| /api/lina/login-link | POST | Magic Link für Partner |
| /api/lina/content | GET | Fertigen Content abrufen (mit imageUrl, videoUrl) |
| /api/lina/pending/:partnerNumber | GET | Wartende Posts für Freigabe |
| /api/lina/self-approve | POST | Post freigeben + automatisch auf Blotato posten |
| /api/lina/generate | POST | Content nach Wunsch generieren (erstellt automatisch Bild) |
| /api/lina/library | GET | Bibliothek (nur Posts MIT Bild/Video) |
| /api/lina/hashtags | POST | Hashtags generieren |
| /api/lina/weekly-plan | GET | Wochenplan |
| /api/lina/objection | POST | Einwand-Antwort |
| /api/lina/status | GET | System-Status |
| /api/lina/partner-stats/:partnerNumber | GET | Partner-Statistiken |

---

## 8. REIHENFOLGE DER AUFGABEN

1. **Zuerst:** Repo clonen, CLAUDE_BOTPRESS_KORREKTUR.md lesen
2. **Dann:** Alle Menüpunkte auf WhatsApp testen (nicht Webchat!)
3. **Dann:** Bilder/Videos-Problem fixen (Image Card + Video Card Nodes in Botpress)
4. **Dann:** "Neue Features" Menü mit Buttons füllen
5. **Dann:** Bibliothek-Flow mit Medien fixen
6. **Zuletzt:** Alle Flows nochmal auf WhatsApp testen und bestätigen

---

## 9. BLOTATO ACCOUNTS (für Referenz)

- Instagram: lr_lifestyleteam (ID: 6682)
- TikTok: lr_lifestyleteam (ID: 6683)
- Facebook: (ID: 6684)
- Threads: (ID: 6685)
- LinkedIn: (ID: 6686)
- API Key: Umgebungsvariable `BLOTATO_API_KEY` (im Server)

---

## 10. CONTENT-REGELN (niemals verletzen)

- KEINE PREISE in Posts (kein "ab X Euro", "nur X€")
- MAX 5 HASHTAGS für Instagram/TikTok/Threads
- Produktbilder: Bei LR-Produkten (Aloe Vera, Mind Master, Zeitgard) → echtes Bild aus DB
- Jeder Post MUSS ein Bild haben
- TikTok braucht JPG (kein PNG)
- Instagram max. 2200 Zeichen, TikTok max. 300, Threads max. 500

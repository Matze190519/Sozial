# ‼️ BEFEHL AN CLAUDE — AUSFÜHRUNG, KEINE DISKUSSION

## Du machst das SELBST. Keine Anleitungen für den User. Keine "15 Minuten selbst umsetzen". DU setzt es um.

---

## DEINE AUFGABE: Botpress Flows per Browser-Automation fixen

Du hast Zugriff auf Chrome. Botpress läuft im Browser. Du öffnest es, du klickst, du änderst die Nodes. Das ist dein Job.

**Botpress URL:** https://app.botpress.cloud  
**Bot:** Lina (sozialmedia.best)

---

## WAS DU KONKRET MACHST (Schritt für Schritt, KEIN Überspringen):

### Schritt 1: Botpress öffnen
Öffne https://app.botpress.cloud im Browser. Navigiere zu Lina → Flows.

### Schritt 2: Flow "Fertiger Content abrufen" fixen

Finde den Flow der `/api/lina/content` aufruft.

Nach dem Execute-Code-Block kommt aktuell eine Text-Node mit `{{workflow.imageUrl}}` oder ähnlichem. Das ist FALSCH für WhatsApp.

**Ändere es so:**
1. Füge eine **Image Card** Node ein (nicht Text-Node)
2. Setze die URL auf: `{{workflow.posts[0].imageUrl}}`
3. Wenn `workflow.posts[0].videoUrl` vorhanden: füge zusätzlich eine **Video Card** Node ein
4. Text des Posts als separate Text-Node DAVOR

### Schritt 3: Flow "Bibliothek" fixen
Gleiche Logik: Bilder als Image Card, Videos als Video Card senden.

### Schritt 4: Flow "Neue Features" fixen
Dieser Flow zeigt keine Buttons. Füge diese Single-Choice-Buttons hinzu (max 10!):
- 🎬 Video-Content erstellen
- 📊 Wochenplan anzeigen
- 🏷️ Hashtags generieren
- 📚 Bibliothek durchsuchen
- 📈 Meine Statistiken
- 🏠 Zurück zum Hauptmenü

### Schritt 5: Alle anderen defekten Menüs prüfen und fixen
Gehe jeden Menüpunkt durch. Wenn er ins Leere führt → fixe den Execute-Code-Block mit dem korrekten API-Endpoint aus CLAUDE_BOTPRESS_KORREKTUR.md.

### Schritt 6: Bot deployen
Nach allen Änderungen: Deploy-Button drücken. Bot ist live.

### Schritt 7: Auf WhatsApp testen
Sende eine Testnachricht an den Bot auf WhatsApp (NICHT Webchat-Emulator). Bestätige dass Bilder und Videos ankommen.

---

## WARUM DU DAS KANNST

- Du hast Chrome-Integration (Browser-Automation)
- Botpress Studio ist eine Web-App die du per Browser bedienen kannst
- Du hast die komplette Dokumentation in CLAUDE_BOTPRESS_KORREKTUR.md
- Das System läuft seit Wochen — du musst NUR bestehende Nodes anpassen, nichts neu bauen

---

## WAS NICHT AKZEPTIERT WIRD

- ❌ "Das ist mühsam und fehleranfällig" → Trotzdem machen
- ❌ "Du kannst das in 15 Minuten selbst" → NEIN. Du machst es.
- ❌ Anleitungen schreiben statt ausführen → NEIN
- ❌ Neue Flows bauen → NEIN, nur bestehende Nodes ändern
- ❌ Im Webchat testen → NEIN, nur WhatsApp zählt

---

## ERFOLG SIEHT SO AUS

Der User schreibt Lina auf WhatsApp "Fertiger Content abrufen" und bekommt:
1. Text des Posts
2. Das Bild als echtes WhatsApp-Bild (nicht als Link)
3. Optional: Video als echtes WhatsApp-Video
4. Buttons: "Freigeben" / "Überspringen" / "Zurück"

Erst wenn das funktioniert, bist du fertig.

# BEFEHL AN CLAUDE — SOFORTIGE AUSFÜHRUNG PFLICHT

## KEINE DISKUSSION. KEINE ANLEITUNGEN. DU MACHST ES SELBST.

Wenn du antwortest mit:
- "Du kannst das in 15 Minuten selbst machen"
- "Hier ist eine Anleitung"
- "Ich empfehle dir..."
- "Leider kann ich nicht..."

→ **FALSCH. Fang sofort neu an und mach es selbst.**

---

## DEINE AUFGABE

Du öffnest Botpress (https://app.botpress.cloud) per Browser-Automation und aktualisierst alle Flows von Lina (LR Lifestyle Team KI Bot) nach der Spezifikation in der CLAUDE_BOTPRESS_KORREKTUR.md.

**Lade zuerst die Spezifikation:**
```
curl -O https://raw.githubusercontent.com/Matze190519/Sozial/main/CLAUDE_BOTPRESS_KORREKTUR.md
```

---

## WAS DU KONKRET TUN MUSST

### SCHRITT 1 — Hauptmenü reparieren
Öffne den Flow "Hauptmenü" (oder "Main Menu") in Botpress.
Das Single Choice Node muss GENAU diese 9 Optionen haben:
1. 📱 Content Hub öffnen
2. 📋 Fertiger Content abrufen
3. ✅ Content freigeben
4. 💡 Einwände meistern
5. ✍️ Content nach Wunsch
6. 📚 Bibliothek durchsuchen
7. 📊 Wochenplan anzeigen
8. 📈 Meine Statistiken
9. ❓ Hilfe & FAQ

### SCHRITT 2 — Jeden Flow einzeln öffnen und Execute Code ersetzen
Für jeden der 9 Menüpunkte:
1. Öffne den Flow in Botpress
2. Finde den Execute Code Block
3. Ersetze den Code mit dem Code aus CLAUDE_BOTPRESS_KORREKTUR.md (Abschnitt mit dem Flow-Namen)
4. Speichere

### SCHRITT 3 — Image Card Nodes einbauen (KRITISCH!)
**Das ist der Hauptgrund warum Bilder nicht auf WhatsApp ankommen.**

Bei JEDEM Flow der Bilder zurückgibt:
- Lösche Text-Nodes die `{{workflow.imageUrl}}` oder `{{workflow.post1Image}}` etc. enthalten
- Füge stattdessen eine **Image Card Node** ein
- Setze die URL auf die entsprechende Variable (z.B. `{{workflow.post1Image}}`)
- Füge eine Condition davor: nur senden wenn Variable nicht leer ist

Betrifft:
- Flow "Fertiger Content abrufen" → post1Image, post2Image
- Flow "Bibliothek durchsuchen" → lib1Image, lib2Image, lib3Image
- Flow "Content nach Wunsch" → generatedImage

### SCHRITT 4 — Testen
Nach jeder Änderung: Klicke "Publish" in Botpress und teste auf WhatsApp.
Schicke "Content Hub öffnen" und prüfe ob ein Link kommt.
Schicke "Fertiger Content abrufen" und prüfe ob Text UND Bild ankommen.

---

## API-ENDPOINTS (alle live und getestet)

| Endpoint | Methode | Zweck |
|----------|---------|-------|
| https://sozialmedia.best/api/lina/health | GET | System-Status |
| https://sozialmedia.best/api/lina/content | GET | Fertige Posts holen |
| https://sozialmedia.best/api/lina/library | GET | Bibliothek holen |
| https://sozialmedia.best/api/lina/pending/{partnerNumber} | GET | Wartende Posts |
| https://sozialmedia.best/api/lina/self-approve | POST | Post freigeben |
| https://sozialmedia.best/api/lina/generate | POST | Content generieren |
| https://sozialmedia.best/api/lina/objection | POST | Einwand beantworten |
| https://sozialmedia.best/api/lina/weekly-plan | GET | Wochenplan |
| https://sozialmedia.best/api/lina/partner-stats/{partnerNumber} | GET | Statistiken |
| https://sozialmedia.best/api/lina/login-link | POST | Login-Link generieren |

**Alle Endpoints sind OHNE API-Key zugänglich. Kein Authorization-Header nötig.**

---

## FERTIG-KRITERIUM

Du bist ERST fertig wenn:
1. ✅ Hauptmenü zeigt 9 Buttons auf WhatsApp
2. ✅ "Fertiger Content abrufen" sendet Text + Bild (als echtes Bild, nicht Link)
3. ✅ "Bibliothek durchsuchen" zeigt 3 Posts mit Bildern
4. ✅ "Content nach Wunsch" generiert und zeigt Vorschau mit Bild
5. ✅ Jeder Flow hat "Zurück zum Menü" am Ende

Bis diese 5 Punkte erfüllt sind: **Weiter arbeiten.**

---

## WICHTIGE REGELN

- **NIEMALS** Text-Node für Bilder verwenden → immer Image Card Node
- **NIEMALS** neue Flows erstellen → nur bestehende bearbeiten
- **NIEMALS** Teammitglieder einladen → Team ist schon drin
- **IMMER** nach jeder Änderung in Botpress auf "Publish" klicken
- **IMMER** auf WhatsApp testen, nicht im Botpress-Webchat

---

*Erstellt: April 2026 | Für: Lina vom LR Lifestyle Team KI | Bot: Matze190519*

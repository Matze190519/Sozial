# Claude Code — Botpress auf 4 Flows reduzieren

## Auftrag

Reduziere das Hauptmenü des Lina-Bots auf **genau 4 Buttons**. Alle komplexen Features gehen ab jetzt über das Dashboard (sozialmedia.best). Der Bot bleibt nur für einfache, schnelle Aktionen.

## REGELN

1. **Lösche KEINE Flows** — alle bestehenden Flows bleiben erhalten
2. **Ändere NUR das Hauptmenü** (Flow "Hauptmenü" / Main)
3. **Teste NICHTS im Webchat** — nur auf WhatsApp zählt
4. **Fasse keine anderen Flows an** — besonders nicht "Partner - Bild erstellen" und "Partner - Video erstellen"

## Das neue Hauptmenü — genau 4 Buttons

### Button 1: "📚 Bibliothek"
- Verlinkt auf den **bestehenden** Flow "Bibliothek" (wie bisher)
- Keine Änderung am Bibliothek-Flow selbst

### Button 2: "💪 Einwandbehandlung"  
- Verlinkt auf den **bestehenden** Flow "Einwandbehandlung" (wie bisher)
- Keine Änderung am Flow selbst

### Button 3: "🆘 Schnelle Hilfe"
- Verlinkt auf den **bestehenden** Flow "Schnelle Hilfe" / "Social Media Hilfe" (wie bisher)
- Keine Änderung am Flow selbst

### Button 4: "🚀 Mein Dashboard"
- **Neuer Node** — schickt einen personalisierten Magic-Login-Link

**Execute Code Node für Button 4:**
```javascript
const phone = event.tags?.conversation?.['whatsapp:userPhone'] || ''
const encodedPhone = encodeURIComponent(phone)

// Magic Login URL — der Partner ist sofort eingeloggt wenn er klickt
workflow.dashboardLink = `https://sozialmedia.best/magic?phone=${encodedPhone}`
```

**Text Node danach:**
```
🚀 Dein persönliches Dashboard:

{{workflow.dashboardLink}}

Dort findest du:
✅ Content erstellen mit KI
✅ Content freigeben
✅ Virale Trends entdecken
✅ Content Kalender
✅ Analytics & mehr

Einfach auf den Link tippen!
```

## Was aus dem Hauptmenü ENTFERNT wird

Diese Buttons werden aus dem Hauptmenü entfernt (die Flows dahinter bleiben bestehen):

- ❌ "KI Content erstellen" → geht jetzt über Dashboard
- ❌ "Content freigeben" → geht jetzt über Dashboard  
- ❌ "Virale Trends" → geht jetzt über Dashboard
- ❌ "Schnellpost" → geht jetzt über Dashboard
- ❌ "Wochenplan" → geht jetzt über Dashboard
- ❌ Alle anderen "Neue Features" Buttons → Dashboard

## Schritt-für-Schritt

1. Öffne den Hauptmenü-Flow in Botpress Studio
2. Finde den Node der die Menü-Buttons anzeigt
3. Ersetze alle Buttons durch genau diese 4:
   - 📚 Bibliothek
   - 💪 Einwandbehandlung
   - 🆘 Schnelle Hilfe
   - 🚀 Mein Dashboard
4. Erstelle den neuen Execute Code Node + Text Node für "Mein Dashboard"
5. Verbinde Button 4 mit dem neuen Node
6. **Save** den Bot
7. **Publish** den Bot
8. Sage Mathias: "Bitte teste auf WhatsApp — 4 Buttons sollten erscheinen"

## Checkliste nach dem Publish

- [ ] Hauptmenü zeigt genau 4 Buttons
- [ ] "Bibliothek" öffnet den bestehenden Bibliothek-Flow
- [ ] "Einwandbehandlung" öffnet den bestehenden Flow
- [ ] "Schnelle Hilfe" öffnet den bestehenden Flow
- [ ] "Mein Dashboard" schickt einen Link mit der Telefonnummer
- [ ] Keine anderen Flows wurden verändert
- [ ] "Partner - Bild erstellen" funktioniert noch (nicht testen, nur sicherstellen dass nichts geändert wurde)
- [ ] "Partner - Video erstellen" funktioniert noch (nicht testen, nur sicherstellen dass nichts geändert wurde)

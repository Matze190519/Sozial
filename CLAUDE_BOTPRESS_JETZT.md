# BOTPRESS SOFORT AUSFÜHREN — KEINE DISKUSSION

## DEINE AUFGABE
Du bist ein Botpress-Techniker. Du führst alle Schritte selbst aus per Browser-Automation in Botpress Studio.
Du erklärst NICHTS. Du gibst KEINE Anleitungen. Du machst es SELBST.
Du bist fertig wenn alle 5 Fertig-Kriterien erfüllt sind.

---

## SCHRITT 1: BOTPRESS ÖFFNEN
Öffne: https://app.botpress.cloud
Gehe zum Bot "Lina vom LR Lifestyle Team KI"

---

## SCHRITT 2: HAUPTMENÜ REPARIEREN

Der erste Flow (Hauptmenü / Welcome) muss eine **Single Choice Node** mit GENAU diesen 9 Optionen haben:

1. 📱 Content Hub öffnen
2. 📋 Fertiger Content abrufen
3. ✅ Content freigeben
4. 💡 Einwände meistern
5. ✍️ Content nach Wunsch
6. 📚 Bibliothek durchsuchen
7. 📊 Wochenplan anzeigen
8. 📈 Meine Statistiken
9. ❓ Hilfe & FAQ

**WICHTIG:** Kein "Neue Features", kein "Leads kaufen", kein "Hashtags" als eigener Punkt.
Jeder Punkt führt zum richtigen Flow. Alle Flows müssen mit "Zurück zum Menü" enden.

---

## SCHRITT 3: BIBLIOTHEK FLOW REPARIEREN

**Problem:** Bibliothek zeigt langen Text statt Bild + kurzen Text.

**Lösung:** Im Flow "Bibliothek durchsuchen" den Execute Code Block ersetzen mit:

```javascript
const response = await axios.get('https://sozialmedia.best/api/lina/library', {
  params: { limit: 5 }
});
if (response.data.success && response.data.count > 0) {
  const items = response.data.items;
  workflow.lib1Title = items[0] ? items[0].title : '';
  workflow.lib1Text = items[0] ? (items[0].text || '').substring(0, 200) : '';
  workflow.lib1Image = items[0] ? (items[0].imageUrl || '') : '';
  workflow.lib2Title = items[1] ? items[1].title : '';
  workflow.lib2Text = items[1] ? (items[1].text || '').substring(0, 200) : '';
  workflow.lib2Image = items[1] ? (items[1].imageUrl || '') : '';
  workflow.lib3Title = items[2] ? items[2].title : '';
  workflow.lib3Text = items[2] ? (items[2].text || '').substring(0, 200) : '';
  workflow.lib3Image = items[2] ? (items[2].imageUrl || '') : '';
  workflow.hasLibrary = response.data.count > 0;
  workflow.libCount = response.data.count;
} else {
  workflow.hasLibrary = false;
  workflow.libCount = 0;
}
```

**Danach im Flow (wenn hasLibrary = true):**
- Text-Node: `Bibliothek ({{workflow.libCount}} Posts):`
- Text-Node: `1️⃣ {{workflow.lib1Title}}\n{{workflow.lib1Text}}`
- **IMAGE CARD NODE** (NICHT Text-Node!): URL = `{{workflow.lib1Image}}`
  → Condition: nur senden wenn `{{workflow.lib1Image}}` nicht leer ist
- Text-Node: `2️⃣ {{workflow.lib2Title}}\n{{workflow.lib2Text}}`
- **IMAGE CARD NODE**: URL = `{{workflow.lib2Image}}`
  → Condition: nur senden wenn `{{workflow.lib2Image}}` nicht leer ist
- Text-Node: `3️⃣ {{workflow.lib3Title}}\n{{workflow.lib3Text}}`
- **IMAGE CARD NODE**: URL = `{{workflow.lib3Image}}`
  → Condition: nur senden wenn `{{workflow.lib3Image}}` nicht leer ist
- Single Choice: `["Zurück zum Menü"]`

---

## SCHRITT 4: FERTIGER CONTENT FLOW REPARIEREN

Im Flow "Fertiger Content abrufen" den Execute Code Block ersetzen mit:

```javascript
const response = await axios.get('https://sozialmedia.best/api/lina/content', {
  params: { limit: 3 }
});
if (response.data.success && response.data.count > 0) {
  const posts = response.data.posts;
  workflow.post1Text = posts[0] ? (posts[0].text || '').substring(0, 300) : '';
  workflow.post1Image = posts[0] ? (posts[0].imageUrl || '') : '';
  workflow.post1Topic = posts[0] ? (posts[0].topic || 'Post 1') : '';
  workflow.post2Text = posts[1] ? (posts[1].text || '').substring(0, 300) : '';
  workflow.post2Image = posts[1] ? (posts[1].imageUrl || '') : '';
  workflow.post2Topic = posts[1] ? (posts[1].topic || 'Post 2') : '';
  workflow.hasContent = true;
  workflow.contentCount = response.data.count;
} else {
  workflow.hasContent = false;
  workflow.contentCount = 0;
}
```

**Danach im Flow (wenn hasContent = true):**
- Text-Node: `Hier sind {{workflow.contentCount}} fertige Posts:`
- Text-Node: `📝 {{workflow.post1Topic}}\n{{workflow.post1Text}}`
- **IMAGE CARD NODE**: URL = `{{workflow.post1Image}}`
  → Condition: nur senden wenn `{{workflow.post1Image}}` nicht leer ist
- Text-Node: `📝 {{workflow.post2Topic}}\n{{workflow.post2Text}}`
- **IMAGE CARD NODE**: URL = `{{workflow.post2Image}}`
  → Condition: nur senden wenn `{{workflow.post2Image}}` nicht leer ist
- Single Choice: `["Zurück zum Menü"]`

**Wenn hasContent = false:**
- Text-Node: `Aktuell kein fertiger Content verfügbar. Bitte zuerst Content freigeben auf sozialmedia.best`
- Single Choice: `["Content Hub öffnen", "Zurück zum Menü"]`

---

## SCHRITT 5: ALLE ANDEREN FLOWS PRÜFEN

Prüfe jeden Flow ob er:
1. Einen Execute Code Block hat der die API aufruft
2. **Image Card Nodes** für Bilder verwendet (NICHT Text-Nodes mit URLs!)
3. Mit "Zurück zum Menü" endet

**GOLDENE REGEL:**
- Bild senden → **Image Card Node** mit URL-Feld
- Video senden → **Video Card Node** mit URL-Feld
- Text-Node mit einer Bild-URL zeigt NUR den Link, KEIN Bild in WhatsApp!

---

## SCHRITT 6: TESTEN UND PUBLISHEN

1. Klicke "Publish" in Botpress
2. Öffne WhatsApp → schreibe Lina
3. Teste: Bibliothek durchsuchen → Bild muss erscheinen
4. Teste: Fertiger Content → Text max. 300 Zeichen + Bild
5. Teste: Alle 9 Menüpunkte funktionieren

---

## FERTIG-KRITERIEN (alle 5 müssen erfüllt sein):

- [ ] Hauptmenü hat genau 9 Punkte (kein "Neue Features", kein "Leads kaufen")
- [ ] Bibliothek zeigt Bilder als echte Bilder (Image Card), nicht als Links
- [ ] Fertiger Content zeigt Text max. 300 Zeichen + Bild
- [ ] Alle Flows enden mit "Zurück zum Menü"
- [ ] Bot ist published und auf WhatsApp testbar

---

## WICHTIGE REGELN

- KEINE neuen Flows erstellen
- KEINE neuen Menüpunkte hinzufügen
- NUR bestehende Execute Code Blöcke ersetzen
- NUR Image Card Nodes für Bilder verwenden
- Das Team ist bereits in Botpress — niemand einladen!
- Wenn etwas nicht klappt: Fehler dokumentieren, nicht aufgeben

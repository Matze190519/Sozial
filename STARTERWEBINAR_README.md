# STARTERWEBINAR EXPANSION - ANLEITUNG

## ✅ Was wurde vorbereitet

### 1. Aktuelle Version gesichert
- Branch: `devin/1763167238-watermark-and-optimizations`
- Alle 44 Original-Folien mit XL-Glow fertig
- Bereit für bessere Bilder (wenn verfügbar)

### 2. Neues Projekt erstellt
- Branch: `devin/1763382779-starterwebinar-expansion`
- 30 neue Folien vorbereitet (folie_44 - folie_73)
- Template-Datei: `slides/folie_template_starterwebinar.html`

## 📁 Struktur

```
slides/
├── folie_01.html - folie_43.html  (Original-Präsentation)
├── folie_44.html - folie_73.html  (Starterwebinar - NEU)
├── folie_template_starterwebinar.html  (Template für weitere Folien)
└── assets/
    └── css/
        └── effects_white.css  (Alle Styles)
```

## 🎨 Design-Features (bereits integriert)

Alle neuen Folien haben automatisch:
- ✅ Super helles weißes Glow (4-Schicht, XL-Intensität)
- ✅ Dunkles Bronze-Gold für Überschriften
- ✅ Partikel-Effekte
- ✅ Wasserzeichen (LR Logo, 0.03 Opacity)
- ✅ Responsive Layout
- ✅ Hover-Effekte

## 📝 Nächste Schritte

### Für jede neue Folie:

1. **Öffne die Folie** (z.B. `folie_44.html`)

2. **Titel ändern:**
   ```html
   <h1 class="headline">DEIN TITEL HIER</h1>
   ```

3. **Text einfügen:**
   ```html
   <p class="text">
       Dein Text hier...
   </p>
   ```

4. **Bilder hinzufügen** (optional):
   ```html
   <div class="image-wrapper halo-xl">
       <img src="assets/images/dein-bild.png" alt="Beschreibung" class="main-image">
   </div>
   ```
   - Bilder in `slides/assets/images/` ablegen
   - `halo-xl` Klasse gibt automatisch super helles Glow

5. **Listen/Stichpunkte** (optional):
   ```html
   <ul class="bullet-list">
       <li><i class="fas fa-check"></i> Punkt 1</li>
       <li><i class="fas fa-check"></i> Punkt 2</li>
   </ul>
   ```

## 🔧 Template verwenden

Für zusätzliche Folien (über 73 hinaus):

```bash
cp slides/folie_template_starterwebinar.html slides/folie_74.html
```

Dann Inhalt anpassen wie oben beschrieben.

## 🌐 Testen

Lokaler Test:
```bash
cd slides
python3 -m http.server 8000
# Dann öffne: http://localhost:8000/folie_44.html
```

## 📊 Status

- **Original-Präsentation**: 44 Folien ✅ Fertig
- **Starterwebinar**: 30 Folien ⏳ Bereit für Content
- **Gesamt**: 74 Folien vorbereitet

## 🎯 Branches

1. **devin/1763167238-watermark-and-optimizations**
   - Original-Präsentation (44 Folien)
   - Alle Design-Updates fertig
   - Bereit für bessere Bilder

2. **devin/1763382779-starterwebinar-expansion** ← AKTUELL
   - Erweitert um 30 Starterwebinar-Folien
   - Basiert auf Original-Präsentation
   - Bereit für Content-Eingabe

## 💡 Tipps

- **Konsistenz**: Nutze die gleichen Icon-Klassen wie in Original-Folien
- **Bilder**: Alle Bilder bekommen automatisch XL-Glow durch `halo-xl` Klasse
- **Gold-Text**: Nutze `<span class="highlight">Text</span>` für Gold-Gradient
- **Layout**: Template ist flexibel - kann 1-spaltig, 2-spaltig, etc. angepasst werden

## 📞 Nächster Schritt

Sag mir:
1. Welche Themen/Inhalte sollen in die Starterwebinar-Folien?
2. Hast du schon Texte/Bilder vorbereitet?
3. Soll ich ein bestimmtes Layout für bestimmte Folien erstellen?

Dann kann ich die Folien mit Content füllen!

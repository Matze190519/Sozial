# HeyGen Avatar Lisa - Setup Anleitung

## ⚠️ WICHTIG: Wissensdatenbank hochladen

Avatar Lisa funktioniert nur mit einer **echten Knowledge Base** von HeyGen!

## 🔧 Setup-Schritte

### 1. HeyGen Account & API-Key
- Gehe zu: https://app.heygen.com/
- Erstelle einen Account (falls noch nicht vorhanden)
- Gehe zu: **Settings** → **API Keys**
- Kopiere deinen API-Key

### 2. Knowledge Base erstellen
1. Gehe zu: https://app.heygen.com/knowledge-base
2. Klicke auf **"Create Knowledge Base"**
3. Gib einen Namen ein: **"LR Lifestyle Onboarding"**
4. Lade folgende Dokumente hoch:
   - LR Produktkatalog
   - Onboarding-Anleitung
   - Häufige Fragen (FAQ)
   - Vergütungsplan
   - Teamaufbau-Infos
5. Klicke auf **"Create"**
6. **Kopiere die Knowledge Base ID** (z.B. `kb_abc123xyz`)

### 3. Avatar konfigurieren
1. Gehe zu: https://app.heygen.com/avatars
2. Wähle einen Avatar aus (z.B. **"Katya_Black_Suit_public"**)
3. Notiere die **Avatar-ID**

### 4. Knowledge Base ID eintragen
Öffne die Datei: `client/src/components/AvatarLisa.tsx`

Ändere Zeile 55:
```typescript
// VORHER (Demo-ID):
knowledgeId: 'demo-1',

// NACHHER (deine echte ID):
knowledgeId: 'kb_abc123xyz', // ← Deine Knowledge Base ID hier eintragen!
```

### 5. Optional: API-Key als Umgebungsvariable
Für mehr Sicherheit solltest du den API-Key in eine `.env` Datei auslagern:

1. Erstelle `.env` im Projekt-Root:
```bash
VITE_HEYGEN_API_KEY=dein_api_key_hier
```

2. Ändere `AvatarLisa.tsx` Zeile 28:
```typescript
// VORHER:
'x-api-key': 'YmFlMjg2MWQxMzQxNDFlZThkOTVhYjlhMmI4MWRjODEtMTc0OTkxMTYzNw==',

// NACHHER:
'x-api-key': import.meta.env.VITE_HEYGEN_API_KEY,
```

3. Füge `.env` zu `.gitignore` hinzu (damit der Key nicht auf GitHub landet!)

## 🎯 Testen

Nach dem Setup:
1. Starte die Seite neu
2. Klicke auf den goldenen Avatar-Button (unten rechts)
3. Das Video-Fenster sollte sich öffnen
4. Lisa sollte sich vorstellen
5. Stelle eine Frage (z.B. "Wie funktioniert das LR Autokonzept?")
6. Lisa sollte mit Infos aus der Knowledge Base antworten

## ❌ Troubleshooting

**Problem: Avatar lädt nicht**
- Prüfe ob API-Key korrekt ist
- Prüfe Browser-Konsole (F12) auf Fehler

**Problem: Avatar antwortet nicht richtig**
- Prüfe ob Knowledge Base ID korrekt eingetragen ist
- Prüfe ob Dokumente in HeyGen hochgeladen wurden

**Problem: "Lisa ist gerade nicht verfügbar"**
- API-Key ungültig oder abgelaufen
- HeyGen-Kontingent aufgebraucht (prüfe Dashboard)

## 💰 Kosten

HeyGen berechnet nach **Minuten**:
- Free Tier: 1 Minute kostenlos zum Testen
- Paid Plans: Ab $29/Monat

**Tipp:** Teste erst mit der Demo-Knowledge-Base, dann upgrade wenn alles funktioniert!

## 📚 Weitere Infos

- HeyGen Docs: https://docs.heygen.com/
- Knowledge Base Guide: https://docs.heygen.com/docs/knowledge-base
- Streaming Avatar SDK: https://docs.heygen.com/docs/streaming-avatar

---

**Fragen?** Kontaktiere Mathias: info@lr-lifestyle.info

# SuperProfile Integration in sozialmedia.best - Prompt fuer Claude

## WICHTIG: Lies das komplett bevor du anfaengst!

### Was ist SuperProfile?
SuperProfile (superprofile.bio) ist ein Creator-Toolkit mit Instagram AutoDM, Link-in-bio Store und Lead Magnets. Meta Verified Tech Provider. Kostet $4.99 erster Monat, dann $29/mo (Creator Plan).

### Was soll passieren?
SuperProfile wird als zusaetzliches Tool in sozialmedia.best eingebaut. Blotato bleibt fuer die Verteilung/Posting auf alle Social-Media-Plattformen. SuperProfile kommt OBENDRAUF fuer:
1. Instagram AutoDM (automatische DMs wenn jemand kommentiert)
2. Lead Magnets (Leads einsammeln)
3. Link-in-bio (Profilseite fuer Partner)

### Was du NICHT tun sollst:
- Blotato NICHT ersetzen oder aendern - Blotato bleibt fuer Posting
- Keine bestehenden Flows kaputt machen
- Keine neuen Botpress-Flows bauen (die laufen schon)
- Kein SuperProfile API einbauen (gibt es nicht oeffentlich)

---

## Schritt 1: SuperProfile-Bereich im Dashboard

Erstelle eine neue Seite/Section im sozialmedia.best Dashboard mit dem Titel "Instagram Growth". Diese Seite zeigt:

### 1.1 AutoDM Erklaerung und Setup-Anleitung
Erklaerungstext:
> Wenn jemand auf Instagram unter deinem Post kommentiert (z.B. "INFO"), bekommt er automatisch eine DM mit deinem Content-Link. Das laeuft ueber SuperProfile.

Setup-Schritte (als Anleitung anzeigen):
1. Gehe zu superprofile.bio und erstelle einen Account (Creator Plan, $4.99 erster Monat)
2. Verbinde deinen Instagram Business Account
3. Erstelle einen AutoDM Flow:
   - Trigger: Keyword "INFO" (oder eigenes Keyword)
   - Nachricht: "Hey! Hier ist dein exklusiver Content-Link: [Link zum Content Hub]"
   - Optional: "Folge uns fuer mehr Content!" mit Follow-Button
4. Aktiviere den Flow

### 1.2 Link-in-bio Setup
Erklaerungstext:
> Erstelle eine professionelle Link-in-bio Seite mit allen deinen LR-Links, Produkten und Social-Media-Profilen. Perfekt fuer Instagram Bio.

Setup-Schritte:
1. In SuperProfile: "Link-in-bio Store" oeffnen
2. Profilbild und Name eintragen
3. Links hinzufuegen:
   - Content Hub Link (sozialmedia.best Login-Link)
   - LR Produkt-Shop
   - WhatsApp Kontakt
   - Weitere Social-Media-Profile
4. Link in Instagram Bio einfuegen

### 1.3 Lead Magnets
Erklaerungstext:
> Biete kostenlose Inhalte an (z.B. "10 Tipps fuer mehr Energie") und sammle dabei E-Mail-Adressen ein. Die Leads koennen dann ueber Brevo weiter kontaktiert werden.

Setup-Schritte:
1. In SuperProfile: "Lead Magnets" oeffnen
2. Kostenlosen Content erstellen (PDF, Video, etc.)
3. Formular einrichten (Name, E-Mail)
4. Lead Magnet Link in AutoDM oder Link-in-bio einbauen
5. Gesammelte E-Mails in Brevo importieren fuer Follow-up

---

## Schritt 2: Integration mit bestehendem System

### 2.1 Content Hub Login-Link fuer AutoDM
Wenn ein Partner Content erstellt und auf Instagram postet (via Blotato), soll der AutoDM-Link zum Content Hub fuehren. Der Login-Link wird so generiert:

```javascript
// Bereits vorhandener Endpoint - NICHT neu bauen!
// POST https://sozialmedia.best/api/lina/login-link
// Body: { partnerNumber: "12345", name: "Max" }
// Response: { success: true, loginUrl: "https://sozialmedia.best/auth/magic/..." }
```

### 2.2 Workflow: Content erstellen -> Posten -> AutoDM

Der komplette Workflow sieht so aus:

```
1. Partner erstellt Content (sozialmedia.best oder WhatsApp/Lina)
2. Content wird freigegeben (Freigabe-Center oder WhatsApp)
3. Blotato postet automatisch auf Instagram/TikTok/LinkedIn/etc.
4. Follower kommentiert "INFO" unter dem Instagram-Post
5. SuperProfile AutoDM sendet automatisch DM mit Content-Hub-Link
6. Follower klickt Link -> wird zum Lead
7. Lead-Daten werden in Brevo gespeichert fuer E-Mail-Follow-up
```

### 2.3 Dashboard-Karte "Instagram Growth"

Erstelle eine Karte im Dashboard die folgendes anzeigt:

```
+------------------------------------------+
|  Instagram Growth (SuperProfile)          |
|                                           |
|  AutoDM Status: Aktiv / Nicht eingerichtet|
|  Link-in-bio: [Link anzeigen]            |
|  Lead Magnets: X Leads gesammelt          |
|                                           |
|  [SuperProfile oeffnen]  [Anleitung]      |
+------------------------------------------+
```

Der Button "SuperProfile oeffnen" verlinkt zu: https://superprofile.bio/dashboard
Der Button "Anleitung" oeffnet die Setup-Anleitung (Schritt 1).

---

## Schritt 3: FAQ-Seite aktualisieren

Fuege diese FAQs zur bestehenden FAQ-Seite oder Help-Section hinzu:

### Was ist SuperProfile?
SuperProfile ist ein Instagram-Growth-Tool das automatisch DMs an Leute schickt die unter deinen Posts kommentieren. Es hilft dir Leads zu sammeln und deine Reichweite zu steigern.

### Brauche ich SuperProfile?
SuperProfile ist optional aber sehr empfohlen. Es automatisiert die Lead-Generierung auf Instagram. Ohne SuperProfile musst du manuell auf Kommentare antworten.

### Was kostet SuperProfile?
$4.99 fuer den ersten Monat, danach $29/Monat. Dafuer ersetzt es Tools wie Manychat ($15/mo), Linktree ($29/mo) und andere - du sparst also Geld.

### Wie verbinde ich SuperProfile mit meinem Instagram?
1. Erstelle einen Account auf superprofile.bio
2. Waehle den Creator Plan
3. Verbinde deinen Instagram Business Account (Anleitung in SuperProfile)
4. Erstelle deinen ersten AutoDM Flow

### Was ist ein AutoDM?
AutoDM = Automatische Direktnachricht. Wenn jemand unter deinem Instagram-Post ein bestimmtes Wort kommentiert (z.B. "INFO"), bekommt er automatisch eine DM von dir mit einem Link oder einer Nachricht.

### Ersetzt SuperProfile Blotato?
NEIN! Blotato bleibt fuer das Posten auf Instagram, TikTok, LinkedIn, YouTube, Facebook, Threads und Twitter. SuperProfile kommt OBENDRAUF und kuemmert sich nur um Instagram-DMs und Lead-Generierung.

### Kann mein ganzes Team SuperProfile nutzen?
Ja! Im Creator Plan kannst du bis zu 5 Instagram-Accounts verbinden. Jeder Partner kann seinen eigenen AutoDM Flow einrichten.

### Wie kommen die Leads in Brevo?
SuperProfile sammelt E-Mails ueber Lead Magnets. Diese E-Mails kannst du als CSV exportieren und in Brevo importieren. Alternativ kannst du Zapier oder Make.com nutzen fuer automatischen Import.

---

## Schritt 4: WhatsApp/Botpress Menue erweitern

Fuege im bestehenden Botpress-Menue einen neuen Punkt hinzu:

**Menuepunkt: "Instagram Growth"**

Wenn der Partner "Instagram Growth" waehlt, zeige diese Optionen:
1. "Was ist AutoDM?" -> Erklaerungstext anzeigen
2. "SuperProfile einrichten" -> Link zu superprofile.bio/dashboard
3. "Mein AutoDM-Keyword aendern" -> Anleitung anzeigen
4. "Zurueck zum Hauptmenue"

---

## Zusammenfassung: So haengt alles zusammen

```
sozialmedia.best (Content Hub)
    |
    ├── Content erstellen (KI-generiert mit Bildern)
    |       |
    |       v
    ├── Freigabe-Center (Team gibt frei)
    |       |
    |       v
    ├── Blotato (postet auf ALLE Plattformen)
    |       |
    |       v
    ├── SuperProfile AutoDM (Instagram-Kommentare -> automatische DMs)
    |       |
    |       v
    ├── Lead Magnets (E-Mails einsammeln)
    |       |
    |       v
    └── Brevo (E-Mail-Benachrichtigungen + Follow-up)

WhatsApp/Lina (Botpress)
    |
    ├── Content abrufen/erstellen/freigeben
    ├── Einwaende meistern
    ├── Instagram Growth (NEU - SuperProfile Anleitung)
    └── System-Hilfe
```

## REGELN:
1. Blotato NICHT anfassen - bleibt wie es ist
2. Bestehende Botpress-Flows NICHT aendern - nur neuen Menuepunkt hinzufuegen
3. SuperProfile hat KEINE API - alles laeuft ueber Anleitungen und Links
4. Das ganze Team muss es nutzen koennen - einfache Sprache, klare Anleitungen
5. Benachrichtigungen laufen ueber Brevo, NICHT ueber Manus
6. Alle Links muessen funktionieren und getestet werden

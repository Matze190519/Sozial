# AKTUELLER STAND - LR Lifestyle Team Social Media System
# Letzte Aktualisierung: 04.04.2026

---

## SYSTEM-UEBERSICHT

Das LR Lifestyle Team betreibt ein zentrales Social-Media-System bestehend aus folgenden Komponenten:

| System | URL/Tool | Funktion | Status |
|--------|----------|----------|--------|
| sozialmedia.best | https://sozialmedia.best | Content Hub - zentrale Plattform fuer Content-Erstellung, Freigabe, Verwaltung | ONLINE, deployed |
| Lina (Botpress) | WhatsApp Bot | KI-Assistentin fuer Content ueber WhatsApp | AKTIV, Menue existiert |
| Blotato | API-Integration | Postet Content auf Instagram, TikTok, LinkedIn, YouTube, Facebook, Threads, Twitter | AKTIV, 8 Accounts verbunden |
| fal.ai | API (Nano Banana 2) | Bild-Generierung fuer Content | AKTIV, Key gesetzt |
| GoViralBitch | API | KI-Content-Generierung (Texte) | AKTIV |
| Brevo | API (Key: xkeysib-...) | E-Mail-Benachrichtigungen an Team | AKTIV, Sender: info@lr-lifestyle.info |
| WordPress | https://lr-job.eu | Business-Website, Brevo laeuft dort auch | ONLINE |
| SuperProfile | superprofile.bio | Instagram AutoDM, Lead Magnets, Link-in-bio | NEU - noch einzurichten |

---

## TEAM-SETUP

Das Team ist NICHT bei Manus registriert. Login laeuft ueber Magic Links. Jedes Teammitglied bekommt einen Magic Link per WhatsApp/E-Mail und kann sich damit einloggen. Keine Manus-Accounts noetig.

Benachrichtigungen gehen ueber Brevo an: jedermannhandy@googlemail.com (und weitere Team-Mitglieder). Sender ist "LR Lifestyle Team" (info@lr-lifestyle.info). NICHT ueber Manus.

---

## SOZIALMEDIA.BEST - 19 API-ENDPOINTS

Alle Endpoints unter https://sozialmedia.best/api/lina/:

| # | Endpoint | Methode | Funktion |
|---|----------|---------|----------|
| 1 | /status | GET | System-Status |
| 2 | /content | GET | Fertigen Content abrufen |
| 3 | /content-detail | GET | Content-Details mit Bild |
| 4 | /approve | POST | Content freigeben (auto-publish via Blotato) |
| 5 | /reject | POST | Content ablehnen |
| 6 | /platforms | GET | Verfuegbare Plattformen |
| 7 | /posting-times | GET | Optimale Posting-Zeiten |
| 8 | /self-approve | POST | WhatsApp-Freigabe (auto-publish via Blotato) |
| 9 | /login-link | POST | Magic Login-Link generieren |
| 10 | /invite | POST | Partner einladen |
| 11 | /notify | POST | Brevo-Benachrichtigung senden |
| 12 | /generate | POST | Content generieren MIT automatischem Bild |
| 13 | /templates | GET | Content-Vorlagen abrufen |
| 14 | /hashtags | POST | Smart Hashtags generieren |
| 15 | /schedule | POST | Posts planen |
| 16 | /weekly-plan | GET | Optimaler Wochenplan |
| 17 | /objection | POST | Einwandbehandlung |
| 18 | /health | GET | Health-Check |
| 19 | /test-notify | POST | Test-Benachrichtigung |

---

## BOTPRESS/WHATSAPP MENUE (LINA)

Bestehendes Menue (NICHT neu bauen, nur verbinden):
1. Leads kaufen
2. Content Hub oeffnen
3. Fertiger Content abrufen
4. Content freigeben
5. Einwaende meistern
6. Content nach Wunsch
7. Zurueck zum Hauptmenue
8. System-Hilfe & FAQ

Geplant: "Instagram Growth" (SuperProfile) als neuer Menuepunkt.

---

## BLOTATO

API-Key ist gueltig. 8 Social-Media-Accounts verbunden:
- Instagram
- TikTok
- LinkedIn
- YouTube
- Facebook
- Threads
- Twitter
- (1 weiterer)

Auto-Publish ist jetzt Standard: Wenn Content freigegeben wird (Dashboard oder WhatsApp), wird automatisch auf Blotato gepostet.

---

## BILD-GENERIERUNG

Modell: Nano Banana 2 (fal.ai) - Google Gemini 3.1 Flash
- Kosten: $0.08 pro Bild (vorher Nano Banana Pro $0.15)
- Schneller und besseres Text-Rendering
- Auto-Bild: Jeder generierte Content bekommt automatisch ein Bild

---

## BENACHRICHTIGUNGEN

Laufen ueber Brevo (NICHT Manus):
- Sender: "LR Lifestyle Team" <info@lr-lifestyle.info>
- Empfaenger: jedermannhandy@googlemail.com
- Events: Content freigegeben, abgelehnt, veroeffentlicht
- Brevo API-Key: xkeysib-... (gleicher Key wie bei lr-job.eu)

---

## GITHUB REPOS

| Repo | Inhalt |
|------|--------|
| Matze190519/Sozial | Claude-Prompts, Botpress-Anleitungen, API-Docs |
| Matze190519/lr-business-website | lr-job.eu WordPress/Netlify |
| Matze190519/lr-content-automation-suite | Make.com Szenarien, GoViralBitch |

---

## OFFENE PUNKTE

1. Claude arbeitet gerade an Botpress-Flows (CLAUDE_BOTPRESS_KORREKTUR.md)
2. SuperProfile Integration steht als naechstes an (CLAUDE_SUPERPROFILE_INTEGRATION.md)
3. Video-Generierung: Seedance 2.0 (ByteDance) auf fal.ai verfuegbar - noch nicht eingebaut
4. Karussell-Posts (5 Bilder in Reihe) sollen wieder funktionieren

---

## WICHTIGE REGELN

1. Team ist NICHT bei Manus registriert - Magic Links verwenden
2. Benachrichtigungen IMMER ueber Brevo, nie ueber Manus
3. Blotato fuer Posting, SuperProfile fuer Instagram Growth - nicht verwechseln
4. Bestehende Botpress-Flows NICHT neu bauen, nur verbinden
5. Keine harten Optionen im Botpress-Flow - User soll nicht tippen muessen
6. Immer Hauptmenue-Rueckweg in Botpress einbauen

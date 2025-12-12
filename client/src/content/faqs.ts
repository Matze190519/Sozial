export type FAQItem = {
  id: string
  category: "Basics" | "Kosten" | "Datenschutz" | "LR" | "Technik"
  question: string
  answer: string
}

export const faqs: FAQItem[] = [
  {
    id: "faq-01",
    category: "Basics",
    question: "Was ist LINA Voice genau?",
    answer:
      "LINA Voice ist eine Telefon-KI für Unternehmen. Sie nimmt Anrufe im Firmennamen entgegen, beantwortet häufige Fragen, organisiert Rückrufe und kann – je nach Setup – Termine in einem Kalender/Buchungssystem eintragen oder an Mitarbeitende weiterleiten."
  },
  {
    id: "faq-02",
    category: "Basics",
    question: "Was kann LINA im Alltag konkret?",
    answer:
      "Typische Aufgaben (je nach Einrichtung):\n" +
      "• Anrufe annehmen, begrüßen, Anliegen erfassen\n" +
      "• Standardfragen beantworten (Öffnungszeiten, Ablauf, Preise nach Vorgabe)\n" +
      "• Rückrufwünsche aufnehmen und strukturiert weitergeben\n" +
      "• Weiterleitung/Durchstellen an Abteilungen oder Personen\n" +
      "• Terminwünsche annehmen, freie Zeiten vorschlagen und Termine eintragen\n" +
      "• Gesprächszusammenfassungen für dein Team erstellen (wenn aktiviert)\n" +
      "• Mehrsprachige Gespräche (wenn aktiviert)"
  },
  {
    id: "faq-03",
    category: "Basics",
    question: "Für welche Branchen ist LINA Voice geeignet?",
    answer:
      "Besonders für Unternehmen mit vielen Anrufen und wiederkehrenden Fragen, z. B. Praxis, Studio, Handwerk, Kanzlei, Autohaus, Dienstleister. Im Onboarding passen wir Begrüßung, Wissen und Abläufe an deine Branche an."
  },
  {
    id: "faq-04",
    category: "Basics",
    question: "Ersetzt LINA meine Mitarbeiter?",
    answer:
      "Nein. LINA entlastet dein Team bei Standardfällen, außerhalb der Geschäftszeiten oder wenn niemand ans Telefon kann. Bei komplexen Fällen kann LINA gezielt an Menschen übergeben (z. B. Weiterleitung oder Rückruf)."
  },
  {
    id: "faq-05",
    category: "Basics",
    question: "Wie läuft die Einrichtung ab?",
    answer:
      "In der Regel in 3 Schritten:\n" +
      "1) Bedarf-Check (Branche, typische Fragen, Öffnungszeiten, Routing, Terminlogik)\n" +
      "2) Setup (Telefonie/Rufnummer, KI-Konfiguration, Wissensbasis, Regeln)\n" +
      "3) Testphase + Go-Live (Feinschliff anhand realer Gespräche)\n\n" +
      "Die technische Implementierung übernimmt unser IT-Partner ESAGH IT (Wertheim)."
  },
  {
    id: "faq-06",
    category: "Basics",
    question: "Muss ich meine Rufnummer ändern?",
    answer:
      "Nein. In vielen Fällen kannst du deine bestehende Nummer behalten (z. B. per Portierung oder Weiterleitung). Das klären wir im Onboarding."
  },
  {
    id: "faq-07",
    category: "Kosten",
    question: "Was kostet LINA wirklich?",
    answer:
      "Die Kosten bestehen aus drei Bausteinen:\n" +
      "1) Unser IT-Service (Einrichtung/Betrieb/Support): 0,20 € pro Gesprächsminute (monatlich minutengenau)\n" +
      "2) Ultravox (Voice-KI Plattform): zahlst du direkt an den Anbieter (je nach Plan/Nutzung)\n" +
      "3) Telefonie (z. B. Twilio / Rufnummer / Minuten): zahlst du direkt an den Anbieter (je nach Land/Route/Nutzung)\n\n" +
      "Du zahlst damit keine klassische Agentur-Setup-Gebühr, sondern ein nutzungsbasiertes Modell."
  },
  {
    id: "faq-08",
    category: "Kosten",
    question: "Warum ist das günstiger als Agenturen?",
    answer:
      "Viele Agenturen verkaufen teure Einzelprojekte (Konzept → Umsetzung → Tests → Wartung) und rechnen viele Stunden ab. Wir liefern ein fertiges System, richten es ein und betreiben es weiter – transparent nach Nutzung statt „Projektstunden ohne Ende“."
  },
  {
    id: "faq-09",
    category: "Datenschutz",
    question: "Welche Daten werden verarbeitet – und wer bekommt sie?",
    answer:
      "Je nach Setup können verarbeitet werden:\n" +
      "• Kontaktdaten (Name, Telefon, E-Mail, Firma)\n" +
      "• Gesprächsmetadaten (Zeitpunkt, Dauer, Rufnummer)\n" +
      "• Gesprächsergebnisse (Anliegen, Rückruf, Terminwunsch)\n\n" +
      "Empfänger können sein: Online Network Vision S.L. (Website/Anfragen), ESAGH IT (Einrichtung/Support), Telefonie-Anbieter (z. B. Twilio), Voice-KI Plattform (Ultravox) sowie optional deine Systeme (Kalender/CRM). Details stehen in der Datenschutzerklärung."
  },
  {
    id: "faq-10",
    category: "Datenschutz",
    question: "Speichert ihr Gespräche oder Transkripte?",
    answer:
      "In unserem eigenen System speichern wir standardmäßig keine Gesprächs-Audios und keine Wort-für-Wort-Transkripte – außer du beauftragst/aktivierst das ausdrücklich. Externe Anbieter/Provider können je nach Konfiguration Daten verarbeiten und ggf. speichern (z. B. zur Bereitstellung/Sicherheit/Abrechnung)."
  },
  {
    id: "faq-11",
    category: "Datenschutz",
    question: "Warum braucht ihr meine Daten vorab (Kontaktformular)?",
    answer:
      "Damit wir deinen Use-Case verstehen, eine Demo/Einrichtung sinnvoll planen und dir einen klaren Ablauf inkl. Angebot geben können. Du kannst LINA erst testen und entscheidest danach."
  },
  {
    id: "faq-12",
    category: "LR",
    question: "Was hat das LR Startset / Business Set Pro damit zu tun?",
    answer:
      "Optional kannst du über ein Business-Paket starten, statt eine klassische Setup-Gebühr zu zahlen. Wenn du diesen Weg wählst, werden für die Online-Anlage/Bestellung notwendige Daten an LR übermittelt bzw. im LR-System eingetragen. Das ist transparent beschrieben und (wenn über die Website ausgelöst) per Checkbox bestätigt."
  },
  {
    id: "faq-13",
    category: "Technik",
    question: "Wie schnell reagiert LINA (Latenz)?",
    answer:
      "LINA ist auf niedrige Antwortlatenz optimiert. Wie „sofort“ es sich anfühlt, hängt immer von Telefonie-Strecke, Netzwerk und Konfiguration ab. Ziel ist ein flüssiges Gespräch ohne spürbare Pausen."
  },
  {
    id: "faq-14",
    category: "Technik",
    question: "Kann LINA auch aktiv anrufen (Outbound)?",
    answer:
      "Ja. Outbound-Calls, Follow-ups und Kampagnen sind möglich, wenn du das beauftragst und das Setup dafür eingerichtet ist (inkl. Regeln, Zeiten und Opt-out/Compliance)."
  },
  {
    id: "faq-15",
    category: "Technik",
    question: "Kann LINA Termine in mein System eintragen oder verschieben?",
    answer:
      "Ja – wir können LINA an dein Kalender- oder Buchungssystem anbinden. Du gibst die Regeln vor (Dauer, Pufferzeiten, No-Go-Zeiten, Team-Zuweisung), LINA setzt sie um."
  },
  {
    id: "faq-16",
    category: "Technik",
    question: "Kann ich LINA anpassen (Stimme, Begrüßung, Wissen, Regeln)?",
    answer:
      "Ja. Stimme, Begrüßung, Wissensbasis (FAQ/Dokumente), Routing-Regeln, Eskalation an Mitarbeitende und Gesprächsstil werden auf dein Unternehmen angepasst."
  }
]

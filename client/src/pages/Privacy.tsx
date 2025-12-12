import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function Privacy() {
  return (
    <div className="pb-20 pt-20">
      {/* Hero */}
      <section className="bg-background py-24 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-6">Datenschutz & Sicherheit</Badge>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary">
            Datenschutzerklärung
          </h1>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-12 text-muted-foreground">
            
            {/* 1. Verantwortlicher */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">1. Verantwortlicher</h2>
              <p className="mb-4">Verantwortlicher im Sinne der DSGVO ist:</p>
              <p>
                Online Network Vision S.L.<br />
                Vertreten durch Mathias Vinzing<br />
                Santanyi, Spanien<br />
                E-Mail: info@lr-lifestyle.info<br />
                Telefon: +49 171 5060008
              </p>
            </div>

            {/* 2. Hosting */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">2. Hosting & Server-Logfiles</h2>
              <p className="mb-4">
                Unsere Website wird bei einem externen Dienstleister betrieben. Beim Aufruf der Seiten werden automatisch Informationen erfasst, die Ihr Browser übermittelt (Server-Logfiles), z. B.:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>IP-Adresse des zugreifenden Geräts</li>
                <li>Datum und Uhrzeit des Abrufs</li>
                <li>aufgerufene Datei/URL</li>
                <li>Menge der übertragenen Daten</li>
                <li>Browsertyp und -version</li>
              </ul>
              <p>
                Die Verarbeitung erfolgt zur Sicherstellung eines technisch stabilen und sicheren Betriebs der Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und funktionalen Webauftritt). Logdaten werden regelmäßig automatisiert gelöscht, sofern keine weitere Aufbewahrung zu Beweiszwecken erforderlich ist.
              </p>
            </div>

            {/* 3. Kontakt */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">3. Kontaktaufnahme (Formular, E-Mail, Telefon)</h2>
              <p>
                Wenn Sie uns per Formular, E-Mail oder Telefon kontaktieren, verarbeiten wir die von Ihnen übermittelten Daten (z. B. Name, Kontaktdaten, Unternehmen, Anliegen) zur Bearbeitung Ihrer Anfrage.
              </p>
              <p className="mt-4">
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung oder -anbahnung), sofern es um konkrete Leistungen geht, ansonsten Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).
              </p>
              <p className="mt-4">
                Wir speichern diese Daten nur so lange, wie es für die Bearbeitung Ihrer Anfrage und etwaige Rückfragen erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.
              </p>
            </div>

            {/* 4. Empfänger & Auftragsverarbeiter */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">4. Empfänger & Auftragsverarbeiter</h2>
              <p className="mb-4">
                Wir geben Ihre Daten nur an Dritte weiter, wenn dies zur Vertragserfüllung erforderlich ist, wir gesetzlich dazu verpflichtet sind oder Sie eingewilligt haben. Zu den Empfängern gehören:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>LR Health & Beauty Systems GmbH:</strong> Zur Abwicklung von Startset-Bestellungen und Partneranträgen.
                </li>
                <li>
                  <strong>IT-Partner (Einrichtung & Support):</strong><br />
                  Denis Esagholian (ESAGH-IT)<br />
                  Kleiner Weg 4, 97877 Wertheim<br />
                  E-Mail: info@esagh-it.de, Tel: 0176 58557496<br />
                  Tätig als Auftragsverarbeiter für die technische Einrichtung und Wartung der LINA Voice Systeme.
                </li>
                <li>
                  <strong>Telefondienstleister:</strong> Twilio Inc. (USA/EU) für die Bereitstellung der Telefonnummern und Gesprächsverbindungen.
                </li>
                <li>
                  <strong>Voice-Plattform:</strong> Ultravox (USA) für die KI-gestützte Sprachverarbeitung.
                </li>
              </ul>
            </div>

            {/* 5. Telefon-KI */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">5. Telefon-KI „LINA Voice“</h2>
              <p className="mb-4">
                Für bestimmte Rufnummern setzen wir die Telefon-KI „LINA Voice“ ein, um Anrufe entgegenzunehmen, zu qualifizieren und zu dokumentieren.
              </p>
              
              <h3 className="text-xl font-bold text-primary mb-2 mt-6">Technische Abwicklung</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <span>Telefonverbindungen werden über einen Telefondienstleister (z. B. Twilio) hergestellt.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <span>Die Sprachverarbeitung erfolgt über die Voice-AI-Plattform Ultravox Realtime.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <span>Konfiguration, Routing und Integrationslogik werden über eine IT-Firma mit Serverstandort in Deutschland (z. B. Frankfurt am Main) bereitgestellt.</span>
                </li>
              </ul>

              <h3 className="text-xl font-bold text-primary mb-2 mt-6">Welche Daten werden verarbeitet?</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Verbindungsdaten (z. B. Rufnummer, Zeitpunkt, Dauer, Zielrufnummer)</li>
                <li>Audiodaten (Gesprächsinhalte) und daraus erzeugte Transkripte</li>
                <li>Meta-Informationen zum Gesprächsverlauf (z. B. Gesprächsstatus, verwendete Funktionen/Tools)</li>
              </ul>
              <p className="mb-4">
                Laut Ultravox-Dokumentation werden Audio und Transkripte gespeichert, um die Dienstleistung bereitzustellen. Voice-Daten werden nicht zum Training der zugrunde liegenden KI-Modelle verwendet; Daten bleiben zwischen Accounts getrennt.
              </p>

              <h3 className="text-xl font-bold text-primary mb-2 mt-6">Rechtsgrundlage</h3>
              <p className="mb-4">
                Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung oder -anbahnung), wenn Anrufe im Rahmen laufender oder angebahnender Geschäftsbeziehungen erfolgen.<br />
                Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) bei allgemeinen Anfragen (Optimierung von Erreichbarkeit, Entlastung von Mitarbeitenden, strukturierte Bearbeitung von Anliegen).
              </p>

              <h3 className="text-xl font-bold text-primary mb-2 mt-6">Internationale Datenübertragung</h3>
              <p className="mb-4">
                Ultravox wird in den USA betrieben. Personenbezogene Daten können daher in die USA übertragen und dort verarbeitet werden. Für den Einsatz von Ultravox empfehlen und unterstützen wir den Abschluss eines Auftragsverarbeitungsvertrages (Data Processing Agreement, DPA) inkl. geeigneter Garantien (z. B. Standardvertragsklauseln).
              </p>
              <p className="mb-4">
                Gesprächsdaten werden so lange aufbewahrt, wie es für die Erfüllung der Zwecke erforderlich ist (z. B. Nachweis, Rückruf, Dokumentation). Ultravox stellt Funktionen bereit, um Voice-Profile und Voice-Daten zu exportieren oder zu löschen; auf Wunsch unterstützen wir Sie bei der Umsetzung Ihrer Löschkonzepte.
              </p>
            </div>

            {/* 6. Cookies */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">6. Cookies & Analyse-Tools</h2>
              <p>
                Unsere Website verwendet derzeit keine Tracking- oder Analyse-Tools, die personenbezogene Daten zu Marketing- oder Statistikzwecken auswerten. Falls wir zukünftig Analyse-Tools (z. B. Matomo, Google Analytics o. Ä.) einsetzen sollten, werden wir diese Datenschutzerklärung entsprechend erweitern und – soweit erforderlich – Ihre Einwilligung einholen.
              </p>
            </div>

            {/* 7. Rechte */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">7. Ihre Rechte</h2>
              <p className="mb-4">Sie haben im Rahmen der gesetzlichen Vorgaben das Recht auf:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Auskunft über die bei uns gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
                <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                <li>Löschung (Art. 17 DSGVO)</li>
                <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruch gegen bestimmte Verarbeitungen (Art. 21 DSGVO)</li>
              </ul>
              <p>
                Zudem haben Sie das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten rechtswidrig erfolgt.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

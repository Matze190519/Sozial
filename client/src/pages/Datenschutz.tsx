import React from 'react';
import { motion } from 'framer-motion';


export default function Datenschutz() {
  return (
    <>
      <div className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-12">Datenschutzerklärung</h1>
          
          <div className="space-y-8 text-gray-300 font-light leading-relaxed">
            <p className="text-sm text-gray-500">Stand: 12.12.2025</p>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">1. Verantwortlicher</h2>
              <div className="glass-card p-6 rounded-xl border border-white/10 bg-black/20">
                <p className="mb-2"><strong>Online Network Vision S.L.</strong></p>
                <p className="mb-2">NIF: B55478382</p>
                <p className="mb-2">Vertreten durch: Mathias Vinzing</p>
                <p className="mb-2">Calle Mare de Déu de Consolació 33 B, 07660 Santanyí (Illes Balears), Spanien</p>
                <p className="mb-2">Telefon: <a href="tel:+491715060008" className="text-neon-cyan hover:underline">+49 171 5060008</a></p>
                <p>E-Mail: <a href="mailto:info@lr-lifestyle.info" className="text-neon-cyan hover:underline">info@lr-lifestyle.info</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">2. Allgemeines zur Datenverarbeitung</h2>
              <p>Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung dieser Website, zur Bearbeitung von Anfragen, zur Durchführung der von Ihnen gewünschten Leistungen (z. B. Demo, Einrichtung von LINA Voice) oder zur Abwicklung eines gewünschten LR-Startsets erforderlich ist.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">3. Welche Daten wir verarbeiten</h2>
              <p className="mb-4">Je nach Nutzung verarbeiten wir insbesondere:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Kontaktdaten:</strong> Name, Telefonnummer, E-Mail, Firma, Funktion/Position</li>
                <li><strong>Anfragedaten:</strong> Inhalt Ihrer Nachricht, gewünschte Demo/Terminwünsche, Branche</li>
                <li><strong>Technische Daten (Logdaten):</strong> IP-Adresse, Datum/Uhrzeit, aufgerufene Seiten, Browser/Device (technisch erforderlich)</li>
                <li><strong>Telefonie-/Gesprächsdaten:</strong> Rufnummern, Verbindungsdaten (Zeitpunkt, Dauer), Gesprächsverlauf (je nach Setup)</li>
                <li><strong>Onboarding-/Bestelldaten (nur wenn Startset gewünscht):</strong> Daten, die für die Online-Anlage/Bestellung im LR-System erforderlich sind (z. B. Name, Anschrift, Kontaktdaten, ggf. Firmendaten)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">4. Zwecke und Rechtsgrundlagen</h2>
              <p className="mb-4">Wir verarbeiten Daten zu folgenden Zwecken:</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">a) Websitebetrieb und Sicherheit</h3>
                  <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem, stabilem Betrieb)</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">b) Kontaktaufnahme / Vorprüfung / Angebot</h3>
                  <p className="mb-2">Sie geben Ihre Daten vorab über ein Kontaktformular oder einen anderen Kontaktweg an, damit wir Ihr Anliegen prüfen, eine Demo koordinieren und ggf. ein Angebot erstellen können.</p>
                  <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) und/oder Art. 6 Abs. 1 lit. f DSGVO</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">c) Einrichtung, Betrieb & Support von LINA Voice</h3>
                  <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertrag/Vertragsanbahnung)</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">d) Abwicklung eines LR-Startsets / Online-Anlage im LR-System (nur wenn von Ihnen gewünscht)</h3>
                  <p className="mb-2">Wenn Sie ausdrücklich wünschen, ein LR-Startset/Business-Paket zu bestellen bzw. den LR-Partnerstatus zu nutzen, verarbeiten wir die dafür notwendigen Daten zur Online-Anlage und Bestellabwicklung.</p>
                  <p className="mb-2">Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Durchführung des gewünschten Prozesses).</p>
                  <p>Zusätzlich kann je nach konkretem Ablauf eine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) eingeholt werden, z. B. über Checkbox/Bestätigung im Formular oder im Onboarding-Prozess.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">5. Empfänger / Weitergabe von Daten</h2>
              <p className="mb-4">Wir geben personenbezogene Daten nur weiter, wenn dies für die Leistungserbringung erforderlich ist.</p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">5.1 Weitergabe an LR (nur wenn Startset/Partneranlage gewünscht)</h3>
                  <p className="mb-2">Wenn Sie ein LR-Startset/Business-Paket wünschen, übermitteln wir die für die Online-Anlage/Bestellung erforderlichen Daten an LR bzw. tragen diese im Rahmen des Online-Prozesses in das LR-System ein.</p>
                  <p className="mb-2">Empfänger (typischerweise): LR Health & Beauty Systems GmbH bzw. LR-Gesellschaften/Prozesspartner, soweit für Abwicklung erforderlich.</p>
                  <p>Zweck: Online-Anlage/Registrierung, Bestellabwicklung, Versand/Abrechnung.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">5.2 Weitergabe an unseren IT-Implementierungspartner (Einrichtung/Betrieb/Support)</h3>
                  <p className="mb-4">Für die technische Einrichtung, den Betrieb und Support arbeiten wir mit folgendem IT-Dienstleister zusammen:</p>
                  <div className="glass-card p-4 rounded-lg border border-white/10 bg-black/20 mb-4">
                    <p><strong>ESAGH IT</strong></p>
                    <p>Inhaber: Denis Esagholian</p>
                    <p>Kleiner Weg 4, 97877 Wertheim</p>
                    <p>E-Mail: info@esagh-it.de</p>
                    <p>Tel.: 0176 58557496</p>
                  </div>
                  <p>Der IT-Dienstleister erhält nur die Daten, die für Setup, Fehleranalyse, Betrieb und Support erforderlich sind. In der Regel erfolgt dies als Auftragsverarbeitung nach Art. 28 DSGVO auf Basis eines Auftragsverarbeitungsvertrags.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">5.3 Telefonie-Dienstleister (z. B. Twilio)</h3>
                  <p>Für Rufnummern, Anrufrouting, Portierung und Telefonie-Infrastruktur können Drittanbieter eingesetzt werden (z. B. Twilio). Dabei werden Verbindungs- und Kommunikationsdaten verarbeitet, soweit dies für Zustellung, Abrechnung und Sicherheit erforderlich ist.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">5.4 Voice-KI Plattform (Ultravox)</h3>
                  <p>Für die Echtzeit-Sprachverarbeitung kann die Voice-KI-Plattform Ultravox eingesetzt werden. Dabei können – je nach Konfiguration – Audio-/Transkript- und Interaktionsdaten verarbeitet werden, soweit dies für die Funktion „Telefon-KI“ erforderlich ist.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">5.5 Weitere Integrationen (optional)</h3>
                  <p>Wenn Sie Integrationen (Kalender, CRM, Ticketsystem, E-Mail, WhatsApp etc.) beauftragen, können weitere Empfänger hinzukommen. Diese werden projektbezogen dokumentiert und nur im erforderlichen Umfang eingebunden.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">6. Telefon-KI: Transparenz, Zusammenfassungen, Speicherung</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">6.1 Hinweis, dass eine KI spricht</h3>
                  <p>Bei Demo-Nummern bzw. KI-Anrufen weisen wir darauf hin, dass Sie mit einer KI-Assistenz sprechen.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">6.2 Gesprächsaufzeichnung / Wort-für-Wort Transkripte</h3>
                  <p className="mb-2">Wir speichern in unserem eigenen System standardmäßig keine Gesprächs-Audioaufzeichnungen und keine Wort-für-Wort Transkripte, sofern dies nicht ausdrücklich beauftragt und technisch aktiviert wird.</p>
                  <p>Unabhängig davon können eingesetzte Plattformen/Provider je nach Konfiguration Daten verarbeiten und ggf. speichern.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">6.3 Gesprächszusammenfassungen & Prozessdaten</h3>
                  <p>Je nach Setup können Gesprächszusammenfassungen, Terminwünsche, Rückrufwünsche und Kontaktdaten in Ihren Systemen oder im Onboarding-System gespeichert werden, um die Bearbeitung sicherzustellen.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">7. Speicherdauer</h2>
              <p>Wir speichern personenbezogene Daten nur so lange, wie dies für die genannten Zwecke erforderlich ist (Anfragebearbeitung, Vertragsdurchführung, Support), und löschen sie anschließend, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">8. Ihre Rechte</h2>
              <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch. Außerdem haben Sie das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">9. Änderungen dieser Datenschutzerklärung</h2>
              <p>Wir können diese Datenschutzerklärung anpassen, wenn sich Prozesse, eingesetzte Anbieter oder rechtliche Anforderungen ändern. Es gilt die jeweils aktuelle Version auf dieser Seite.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </>
  );
}

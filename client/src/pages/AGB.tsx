import React from 'react';
import { motion } from 'framer-motion';


export default function AGB() {
  return (
    <>
      <div className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-12">Allgemeine Geschäftsbedingungen (AGB)</h1>
          
          <div className="space-y-8 text-gray-300 font-light leading-relaxed">
            <p className="text-sm text-gray-500">Stand: 12.12.2025</p>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">1. Geltungsbereich</h2>
              <p>Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen der Online Network Vision S.L. (nachfolgend "Anbieter") und ihren Kunden (nachfolgend "Kunde") über die Nutzung der Software "LINA Voice" sowie damit verbundene Dienstleistungen. Das Angebot richtet sich ausschließlich an Unternehmer im Sinne des § 14 BGB.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">2. Vertragsgegenstand</h2>
              <p>Gegenstand des Vertrages ist die Bereitstellung der KI-basierten Sprachassistenz-Software "LINA Voice" als Software-as-a-Service (SaaS) sowie ggf. die Erbringung von Einrichtungs- und Supportleistungen.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">3. Vertragsschluss</h2>
              <p>Der Vertrag kommt durch die Annahme eines Angebots des Anbieters durch den Kunden zustande. Dies kann schriftlich, per E-Mail oder durch Online-Bestellung erfolgen.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">4. Leistungen des Anbieters</h2>
              <p>Der Anbieter stellt dem Kunden die Software "LINA Voice" zur Nutzung über das Internet zur Verfügung. Der Funktionsumfang ergibt sich aus der Leistungsbeschreibung im jeweiligen Angebot. Der Anbieter ist berechtigt, die Software weiterzuentwickeln und Funktionen zu ändern, soweit dies die vertragsgemäße Nutzung nicht wesentlich beeinträchtigt.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">5. Pflichten des Kunden</h2>
              <p>Der Kunde ist verpflichtet, die Software nur im Rahmen der vertraglichen Bestimmungen zu nutzen. Er hat insbesondere sicherzustellen, dass die Nutzung nicht gegen geltendes Recht verstößt (z.B. Datenschutzrecht, Wettbewerbsrecht). Der Kunde ist für die Sicherung seiner Zugangsdaten verantwortlich.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">6. Vergütung und Zahlungsbedingungen</h2>
              <p>Die Vergütung richtet sich nach der jeweils gültigen Preisliste oder dem individuellen Angebot. Alle Preise verstehen sich zuzüglich der gesetzlichen Umsatzsteuer. Rechnungen sind sofort nach Erhalt ohne Abzug zahlbar.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">7. Laufzeit und Kündigung</h2>
              <p>Soweit nicht anders vereinbart, wird der Vertrag auf unbestimmte Zeit geschlossen. Die Kündigungsfrist beträgt 30 Tage zum Monatsende. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">8. Haftung</h2>
              <p>Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit. Für leichte Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten), wobei die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt ist.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">9. Datenschutz</h2>
              <p>Die Parteien verpflichten sich zur Einhaltung der geltenden Datenschutzbestimmungen. Soweit der Anbieter personenbezogene Daten im Auftrag des Kunden verarbeitet, schließen die Parteien einen Auftragsverarbeitungsvertrag (AVV).</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">10. Schlussbestimmungen</h2>
              <p>Es gilt das Recht des Königreichs Spanien unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz des Anbieters. Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </>
  );
}

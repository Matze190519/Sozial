import ScrollReveal from '../components/ScrollReveal';
import { NeonButton } from '../components/ui/NeonButton';
import PricingCalculator from '../components/PricingCalculator';
import { Check, Phone, Users, Clock, Calendar, ShieldCheck, Car, X } from 'lucide-react';

export default function Concept() {
  return (
    <main className="relative z-10 pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1 rounded-full bg-electric-purple/20 border border-electric-purple/50 text-neon-cyan text-sm font-bold mb-6">
              Das Geschäftsmodell
            </div>
            <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 leading-tight text-white">
              Warum LINA Voice? <br />
              <span className="text-neon-cyan">Der Vergleich.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              Drei Wege zur Telefon-KI. Nur einer ist wirklich unternehmerfreundlich.
            </p>
          </div>
        </ScrollReveal>

        {/* Comparison Table */}
        <ScrollReveal delay={0.1}>
          <div className="mb-32 overflow-x-auto">
            <div className="min-w-[900px]">
              <div className="grid grid-cols-4 gap-4 mb-4 px-6">
                <div className="font-bold text-gray-500 uppercase text-sm tracking-wider">Kriterium</div>
                <div className="font-bold text-white text-lg">Klassische Voice-Agentur</div>
                <div className="font-bold text-white text-lg">DIY mit Ultravox & Twilio</div>
                <div className="font-bold text-neon-cyan text-lg">LINA Voice (Ultravox v0.7)</div>
              </div>
              
              <div className="space-y-4">
                {/* Row 1 */}
                <div className="grid grid-cols-4 gap-4 p-6 rounded-xl bg-white/5 border border-white/10 items-center hover:bg-white/10 transition-colors">
                  <div className="font-bold text-gray-300">Setup-Kosten</div>
                  <div className="text-gray-400">2.500 € – 5.000 € einmalig (oft mehr)</div>
                  <div className="text-gray-400">0 € Setup, aber hoher Eigenaufwand</div>
                  <div className="text-white font-medium">Kein Agentur-Setup, Einstieg über Business Set Pro (742,40 €)</div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-4 gap-4 p-6 rounded-xl bg-white/5 border border-white/10 items-center hover:bg-white/10 transition-colors">
                  <div className="font-bold text-gray-300">Monatliche Fixkosten</div>
                  <div className="text-gray-400">300 € – 2.500 €/Monat + Minutenpreise</div>
                  <div className="text-gray-400">Keine Fixkosten, reine Usage-Kosten</div>
                  <div className="text-white font-medium">Keine Fixkosten, nur Minutenpreise + LR-Vorteile</div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-4 gap-4 p-6 rounded-xl bg-white/5 border border-white/10 items-center hover:bg-white/10 transition-colors">
                  <div className="font-bold text-gray-300">Technikaufwand</div>
                  <div className="text-gray-400">Abstimmung mit Entwicklern, Wochen/Monate</div>
                  <div className="text-gray-400">Hoher Aufwand: APIs, Doku, alles selbst bauen</div>
                  <div className="text-white font-medium">IT-Partner richtet alles schlüsselfertig ein</div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-4 gap-4 p-6 rounded-xl bg-white/5 border border-white/10 items-center hover:bg-white/10 transition-colors">
                  <div className="font-bold text-gray-300">Modell & Technologie</div>
                  <div className="text-gray-400">Oft Pipeline (STT → LLM → TTS), spürbare Latenz</div>
                  <div className="text-gray-400">Ultravox Realtime direkt, aber "roh"</div>
                  <div className="text-white font-medium">Ultravox v0.7 (GLM 4.6, RAG, Tools) + fertige Branchen-Dialoge</div>
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-4 gap-4 p-6 rounded-xl bg-white/5 border border-white/10 items-center hover:bg-white/10 transition-colors">
                  <div className="font-bold text-gray-300">Datenschutz</div>
                  <div className="text-gray-400">Oft intransparente Blackbox</div>
                  <div className="text-gray-400">Datenschutz-Verantwortung liegt beim Nutzer</div>
                  <div className="text-white font-medium">Infrastruktur in D, Ultravox-USA mit DPA, transparente Abrechnung</div>
                </div>

                {/* Row 6 */}
                <div className="grid grid-cols-4 gap-4 p-6 rounded-xl bg-white/5 border border-white/10 items-center hover:bg-white/10 transition-colors">
                  <div className="font-bold text-gray-300">Für wen geeignet?</div>
                  <div className="text-gray-400">Konzerne mit Budget & interner IT</div>
                  <div className="text-gray-400">Tech-affine Firmen mit Dev-Team</div>
                  <div className="text-white font-medium">Mittelstand, Praxen, Handwerk – die Ergebnisse wollen</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Pricing Overview */}
        <ScrollReveal delay={0.2}>
          <div className="mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-white">Was kostet LINA Voice wirklich?</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Kein Lizenz-Dschungel, keine versteckten Setups. Sie zahlen einmalig für den Einstieg – und danach nur, wenn LINA wirklich telefoniert.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-4 px-6 text-gray-300 font-bold">Baustein</th>
                      <th className="py-4 px-6 text-gray-300 font-bold">Wofür genau?</th>
                      <th className="py-4 px-6 text-gray-300 font-bold">Rechnungssteller</th>
                      <th className="py-4 px-6 text-gray-300 font-bold">Typische Kosten*</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-400">
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-medium text-white">Business Set Pro (einmalig)</td>
                      <td className="py-4 px-6">LR-Produktpaket (~1.500 € Wert) + Partnerstatus + LINA-Start</td>
                      <td className="py-4 px-6">LR Health & Beauty</td>
                      <td className="py-4 px-6 text-neon-cyan font-bold">742,40 € einmalig</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-medium text-white">Ultravox Realtime</td>
                      <td className="py-4 px-6">KI-Sprachverarbeitung (STT + LLM + TTS in Echtzeit)</td>
                      <td className="py-4 px-6">Ultravox direkt</td>
                      <td className="py-4 px-6">0,05 $/Minute (Pay-as-you-go)</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-medium text-white">Telefondienstleister</td>
                      <td className="py-4 px-6">Ein- & ausgehende Telefonie (z. B. Twilio)</td>
                      <td className="py-4 px-6">Dienstleister direkt</td>
                      <td className="py-4 px-6">ca. 0,01–0,02 $/Minute</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-medium text-white">LINA Voice Service</td>
                      <td className="py-4 px-6">Einrichtung, Dialogdesign, Optimierung & Support</td>
                      <td className="py-4 px-6">Ihre IT-Firma</td>
                      <td className="py-4 px-6 text-neon-cyan font-bold">0,20 €/Minute</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-xs text-gray-500 italic px-6">
                *Alle Preise sind Richtwerte, Stand heute. Wechselkurse, Zielnummern und Tarifoptionen können zu Abweichungen führen. Ultravox berechnet 0,05 $/Minute ab der ersten verbrauchten Minute.
              </p>
            </div>

            {/* Calculation Example */}
            <div className="mt-12">
              <PricingCalculator />
            </div>
          </div>
        </ScrollReveal>

        {/* FAQ Section */}
        <ScrollReveal delay={0.3}>
          <div className="max-w-4xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-white">Häufige Fragen</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Klartext zu Kosten, Technik und Datenschutz.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Was kostet LINA Voice wirklich?",
                  a: "Der Einstieg erfolgt über das Business Set Pro (742,40 € einmalig). Danach fallen keine monatlichen Grundgebühren an, sondern nur nutzungsabhängige Kosten: ca. 0,20 € pro Minute für den LINA Voice Service plus geringe Gebühren für Telefonie (Twilio) und KI-Engine (Ultravox)."
                },
                {
                  q: "Wie funktioniert der Datenfluss?",
                  a: "Anrufe gehen über einen deutschen oder europäischen Telefondienstleister (z.B. Twilio) an die Ultravox-Plattform (USA) zur Verarbeitung. Die Konfiguration und Steuerung erfolgt durch unseren IT-Partner in Deutschland."
                },
                {
                  q: "Ist das DSGVO-konform?",
                  a: "Wir setzen auf Transparenz: Für die Nutzung von US-Diensten wie Ultravox werden Standardvertragsklauseln (SCCs) und Auftragsverarbeitungsverträge (AVV) geschlossen. Wir unterstützen Sie bei der korrekten Datenschutzerklärung."
                },
                {
                  q: "Was ist der Unterschied zu einer klassischen Agentur?",
                  a: "Agenturen verlangen oft 2.500 € bis 10.000 € Setup-Gebühr und hohe monatliche Pauschalen. LINA Voice nutzt ein Partner-Modell: Durch das Business Set Pro finanzieren wir das Setup quer, sodass Sie nur minimale Einstiegskosten haben."
                },
                {
                  q: "Wie funktioniert das Autokonzept?",
                  a: "Als Partner im LR-Netzwerk erhalten Sie Zugriff auf Großkunden-Leasingkonditionen. Nach Qualifikation (z.B. 4.000 PW Umsatz) können Sie Fahrzeuge wie Audi, Mercedes oder VW zu Raten leasen, die oft 70-80% unter marktüblichen Preisen liegen."
                },
                {
                  q: "Was bedeutet 'A-Bonus'?",
                  a: "Der Autobonus ist ein zusätzlicher Zuschuss von LR, der Ihre Leasingrate weiter senkt oder komplett übernimmt, wenn Sie bestimmte Umsatzziele erreichen."
                },
                {
                  q: "Kann LINA Termine vereinbaren?",
                  a: "Ja. LINA kann mit Ihrem Kalender (Google, Outlook, etc.) verbunden werden, freie Zeiten prüfen und Termine direkt eintragen."
                },
                {
                  q: "Kann ich LINA selbst anpassen?",
                  a: "Grundsätzliche Änderungen (Öffnungszeiten, Begrüßung) können schnell angepasst werden. Für komplexe Änderungen am Gesprächsleitfaden steht Ihnen unser IT-Support zur Verfügung."
                },
                {
                  q: "Gibt es eine Mindestvertragslaufzeit?",
                  a: "Nein. Sie zahlen nur für die Nutzung. Das Business Set Pro gehört Ihnen sofort."
                },
                {
                  q: "Brauche ich technisches Vorwissen?",
                  a: "Nein. Die komplette technische Einrichtung übernimmt unser IT-Partner für Sie."
                },
                {
                  q: "Kann ich meine alte Nummer behalten?",
                  a: "Ja. Sie richten einfach eine Rufumleitung von Ihrer bestehenden Nummer auf die LINA-Nummer ein."
                },
                {
                  q: "Was passiert, wenn LINA etwas nicht versteht?",
                  a: "LINA fragt höflich nach oder leitet das Gespräch (wenn gewünscht) an einen menschlichen Mitarbeiter weiter oder nimmt eine Nachricht auf."
                }
              ].map((faq, index) => (
                <div key={index} className="glass-card rounded-xl border border-white/10 overflow-hidden">
                  <details className="group">
                    <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                      <span className="font-bold text-white text-lg">{faq.q}</span>
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="text-gray-400 px-6 pb-6 leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Tech Stack Highlight */}
        <ScrollReveal delay={0.3}>
          <div className="max-w-4xl mx-auto text-center mb-20">
            <div className="glass-card p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-electric-purple/10 to-transparent">
              <h2 className="text-2xl font-playfair font-bold mb-6 text-white">Warum LINA + Ultravox v0.7?</h2>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div>
                  <h4 className="font-bold text-neon-cyan mb-2">Technologie</h4>
                  <p className="text-sm text-gray-400">
                    LINA läuft auf Ultravox v0.7 – basierend auf GLM 4.6, mit 26 Sprachen, RAG, Tool-Calling und extrem niedriger Latenz.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-neon-cyan mb-2">Setup & Betreuung</h4>
                  <p className="text-sm text-gray-400">
                    Statt teurer Agenturprojekte bekommen Sie eine fertig konfigurierte Telefon-KI – eingerichtet von einer deutschen IT-Firma.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-neon-cyan mb-2">Kostenmodell</h4>
                  <p className="text-sm text-gray-400">
                    Keine fünfstelligen Setup-Gebühren, keine teuren Lizenzen. Einmaliger Einstieg, danach minutengenaue Abrechnung.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}

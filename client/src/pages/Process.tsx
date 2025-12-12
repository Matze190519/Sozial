import ScrollReveal from '../components/ScrollReveal';
import { NeonButton } from '../components/ui/NeonButton';
import { Phone, Package, Settings, Play, Rocket, Check } from 'lucide-react';

export default function Process() {
  return (
    <main className="relative z-10 pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1 rounded-full bg-electric-purple/20 border border-electric-purple/50 text-neon-cyan text-sm font-bold mb-6">
              Der Ablauf
            </div>
            <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 leading-tight text-white">
              Der Weg zu Ihrer <br />
              <span className="text-neon-cyan">eigenen Telefon-KI</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              Wir haben den Weg zu LINA Voice so klar wie möglich gemacht. Statt monatelanger IT-Projekte gibt es einen strukturierten Prozess in wenigen Schritten.
            </p>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <div className="max-w-4xl mx-auto space-y-8 mb-32">
          {/* Step 1 */}
          <ScrollReveal delay={0.1}>
            <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="text-9xl font-bold text-white">1</span>
              </div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-16 h-16 rounded-2xl bg-electric-purple/20 flex items-center justify-center shrink-0 border border-electric-purple/50">
                  <Phone className="w-8 h-8 text-neon-cyan" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Erstgespräch & Anforderungscheck</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-cyan mt-1 shrink-0" />
                      <span>Kurzes Online- oder Telefonat mit Ihnen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-cyan mt-1 shrink-0" />
                      <span>Analyse: Wie laufen Ihre Anrufe heute? Wo hakt es?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-cyan mt-1 shrink-0" />
                      <span>Definition: Was soll LINA auf jeden Fall übernehmen (Termine, Rückrufe, Standardfragen)?</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Step 2 */}
          <ScrollReveal delay={0.2}>
            <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="text-9xl font-bold text-white">2</span>
              </div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-16 h-16 rounded-2xl bg-electric-purple/20 flex items-center justify-center shrink-0 border border-electric-purple/50">
                  <Package className="w-8 h-8 text-neon-cyan" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Business Set Pro & technische Basis</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-cyan mt-1 shrink-0" />
                      <span>Sie bestellen einmalig das Business Set Pro (742,40 €).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-cyan mt-1 shrink-0" />
                      <span>Sie erhalten Ihr LR-Produktpaket und Ihren LR-Partnerstatus.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-cyan mt-1 shrink-0" />
                      <span>Parallel richten wir die technischen Zugänge ein: Ultravox-Account, Telefondienstleister, ggf. Kalender-Anbindung.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Step 3 */}
          <ScrollReveal delay={0.3}>
            <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="text-9xl font-bold text-white">3</span>
              </div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-16 h-16 rounded-2xl bg-electric-purple/20 flex items-center justify-center shrink-0 border border-electric-purple/50">
                  <Settings className="w-8 h-8 text-neon-cyan" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Dialog-Design & Konfiguration</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-cyan mt-1 shrink-0" />
                      <span>Wir legen fest, wie LINA Ihre Kunden begrüßt und welche Fragen sie stellt.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-cyan mt-1 shrink-0" />
                      <span>Wir definieren Regeln: Was darf LINA alleine lösen? Wann wird weitergeleitet?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-cyan mt-1 shrink-0" />
                      <span>LINA wird so konfiguriert, dass sie Ihre Abläufe widerspiegelt – nicht umgekehrt.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Step 4 */}
          <ScrollReveal delay={0.4}>
            <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="text-9xl font-bold text-white">4</span>
              </div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-16 h-16 rounded-2xl bg-electric-purple/20 flex items-center justify-center shrink-0 border border-electric-purple/50">
                  <Play className="w-8 h-8 text-neon-cyan" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Testphase im geschützten Rahmen</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-cyan mt-1 shrink-0" />
                      <span>Zuerst testen wir LINA intern (mit Testanrufen).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-cyan mt-1 shrink-0" />
                      <span>Danach schalten wir sie in einem definierten Rahmen live (z. B. außerhalb der Öffnungszeiten).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-cyan mt-1 shrink-0" />
                      <span>Sie bekommen Feedback & Auswertungen zur Optimierung.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Step 5 */}
          <ScrollReveal delay={0.5}>
            <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden bg-gradient-to-br from-electric-purple/10 to-neon-cyan/5">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="text-9xl font-bold text-white">5</span>
              </div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-16 h-16 rounded-2xl bg-neon-cyan/20 flex items-center justify-center shrink-0 border border-neon-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <Rocket className="w-8 h-8 text-neon-cyan" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Go-Live & laufende Optimierung</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-cyan mt-1 shrink-0" />
                      <span>Nach der Testphase schalten wir LINA voll in Ihren gewünschten Betriebsmodus.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-cyan mt-1 shrink-0" />
                      <span>Unser IT-Partner überwacht das System technisch, wir optimieren bei Bedarf die Dialoge.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-cyan mt-1 shrink-0" />
                      <span>Sie behalten jederzeit die Kontrolle: Pausieren, anpassen oder erweitern.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="text-center">
            <h2 className="text-3xl font-playfair font-bold mb-8 text-white">Bereit für den Start?</h2>
            <NeonButton href="mailto:info@lr-lifestyle.info">
              Jetzt Erstgespräch vereinbaren
            </NeonButton>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}

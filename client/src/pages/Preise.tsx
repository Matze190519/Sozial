import ScrollReveal from '../components/ScrollReveal';
import { NeonButton } from '../components/ui/NeonButton';
import { Check, Gift, Package, Phone, Zap, Globe } from 'lucide-react';

export default function Preise() {
  return (
    <main className="relative z-10 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-center mb-6">
            Transparente <span className="text-neon-cyan">Kosten</span>
          </h1>
          <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-16">
            Sie zahlen nur, was Sie wirklich nutzen. Keine versteckten Gebühren.
          </p>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-20">
          {/* IT Support & Betrieb */}
          <ScrollReveal delay={0.2} className="h-full">
            <div className="glass-card p-8 rounded-2xl border border-white/10 h-full flex flex-col">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-electric-purple/20 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-neon-cyan" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">IT Support & Betrieb</h2>
                <p className="text-gray-400 text-sm">Für Wartung, Updates und persönlichen Support</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">0,20 €</span>
                  <span className="text-gray-400">/ Minute</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Monatlich minutengenau abgerechnet</p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-neon-cyan flex-shrink-0" />
                  <span className="text-gray-300">Laufende System-Updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-neon-cyan flex-shrink-0" />
                  <span className="text-gray-300">Persönlicher Ansprechpartner</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-neon-cyan flex-shrink-0" />
                  <span className="text-gray-300">Anpassung von Prompts & Wissen</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Provider Kosten */}
          <ScrollReveal delay={0.3} className="h-full">
            <div className="glass-card p-8 rounded-2xl border border-white/10 h-full flex flex-col">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Provider Kosten</h2>
                <p className="text-gray-400 text-sm">Direkt an Ultravox & Twilio (ca. Werte)</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">~ 0,15 €</span>
                  <span className="text-gray-400">/ Minute</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Abhängig von aktuellem Dollarkurs & Modell</p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-gray-300">Ultravox KI-Engine Nutzung</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-gray-300">Twilio Telefonie-Gebühren</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-gray-300">Volle Kostentransparenz (eigene Accounts)</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Optional: LR Startset */}
        <ScrollReveal delay={0.4}>
          <div className="max-w-4xl mx-auto glass-card p-8 rounded-2xl border border-electric-purple/30 bg-deep-navy/40">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/3">
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-lg">
                  <img 
                    src="/images/lr-profi-set.jpg" 
                    alt="LR Profi Business Pro Set" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3 text-left">
                <div className="inline-block px-3 py-1 rounded-full bg-electric-purple/20 border border-electric-purple/50 text-neon-cyan text-xs font-bold mb-4">
                  OPTIONAL
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Business Set Pro</h3>
                <p className="text-gray-400 mb-6">
                  Für Unternehmer, die zusätzlich von LR-Vorteilen profitieren möchten. Einmaliges Investitionspaket mit realem Warenwert.
                </p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <span className="block text-sm text-gray-500">Einmalig</span>
                    <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white">742,40 €</span>
                    <span className="text-xs text-gray-400">(712,50 € Set + 29,90 € Setup)</span>
                  </div>
                  </div>
                  <NeonButton href="/kontakt" variant="secondary" className="text-sm px-6">
                    Infos anfordern
                  </NeonButton>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="mt-12 text-center text-gray-400">
              <p className="mb-2">Haben Sie Fragen zum Angebot?</p>
              <a 
                href="tel:+491715060008" 
                className="text-neon-cyan hover:text-electric-purple transition-colors font-semibold flex items-center gap-2 justify-center text-lg"
              >
                <Phone className="w-5 h-5" />
                +49 171 5060008
              </a>
            </div>
          </ScrollReveal>
      </div>
    </main>
  );
}

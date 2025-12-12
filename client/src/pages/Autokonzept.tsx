import ScrollReveal from '../components/ScrollReveal';
import { NeonButton } from '../components/ui/NeonButton';
import { Check, Shield, Zap, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Autokonzept() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Wie schnell kann ich ein Fahrzeug bestellen?",
      answer: "Sobald Sie sich qualifiziert haben (z.B. durch das Profi Business Startpaket und 2 Empfehlungen), sind Sie sofort bestellberechtigt. Die Lieferzeit hängt vom jeweiligen Hersteller und Modell ab, viele Fahrzeuge sind jedoch kurzfristig verfügbar."
    },
    {
      question: "Wirklich keine Anzahlung?",
      answer: "Ja, korrekt. Bei unserem Autokonzept zahlen Sie keine Anzahlung und keine Schlussrate. Sie zahlen lediglich die monatliche Leasingrate, was Ihre Liquidität schont."
    },
    {
      question: "Kann ich das Fahrzeug auch privat nutzen?",
      answer: "Selbstverständlich. Die Fahrzeuge können sowohl geschäftlich als auch privat genutzt werden. Die Versteuerung erfolgt wie bei jedem Firmenwagen (z.B. 1%-Regelung)."
    },
    {
      question: "Welche Marken stehen zur Verfügung?",
      answer: "Wir arbeiten primär mit deutschen Premium-Herstellern wie Mercedes-Benz, Audi, VW und BMW zusammen, um Ihnen höchste Qualität und Zuverlässigkeit zu garantieren."
    }
  ];

  return (
    <main className="relative z-10 pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1 rounded-full bg-electric-purple/20 border border-electric-purple/50 text-neon-cyan text-sm font-bold mb-6">
              Fuhrpark-Management 2.0
            </div>
            <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 leading-tight text-white">
              Intelligente <span className="text-neon-cyan">Mobilität</span><br />
              für Ihr Unternehmen.
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              Warum marktübliche Leasingraten zahlen? Nutzen Sie unser Großkunden-Konzept als strategischen Wettbewerbsvorteil.
              <br /><span className="text-white font-bold">Keine Anzahlung. Sofort verfügbar.</span>
              <br /><br />
              Durch die enormen Abnahmemengen von LR profitieren Sie von Leasingraten, die <span className="text-neon-cyan font-bold">ca. 70-80% unter den marktüblichen Kosten</span> liegen.
              <br />
              <span className="text-sm text-gray-400 mt-2 block">Einmal qualifizieren, sofort bestellen.</span>
              <span className="text-xs text-gray-500 mt-4 block">* Details laut offizieller LR Unterlagen.</span>
            </p>
            <NeonButton href="tel:+491715060008">
              Konditionen prüfen
            </NeonButton>
          </div>
        </ScrollReveal>

        {/* Key Facts */}
        <ScrollReveal delay={0.2}>
          <div className="grid md:grid-cols-3 gap-8 mb-32">
            <div className="glass-card p-8 rounded-2xl border border-white/10 hover:border-neon-cyan/50 transition-colors">
              <div className="w-12 h-12 bg-electric-purple/20 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-neon-cyan" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Keine Anzahlung</h3>
              <p className="text-gray-400">
                Schonen Sie Ihre Liquidität. Unsere Fahrzeuge bestellen Sie <span className="text-white font-bold">ohne Anzahlung</span> und ohne Schlussrate. Volle Kostentransparenz ab dem ersten Kilometer.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl border border-white/10 hover:border-neon-cyan/50 transition-colors">
              <div className="w-12 h-12 bg-electric-purple/20 rounded-xl flex items-center justify-center mb-6">
                <Check className="w-6 h-6 text-neon-cyan" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Einmalige Qualifikation</h3>
              <p className="text-gray-400">
                Kein monatlicher Druck. Sie qualifizieren sich <span className="text-white font-bold">ein einziges Mal</span> (durch Ihr Startpaket + 2 Empfehlungen) und sind sofort bestellberechtigt.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl border border-white/10 hover:border-neon-cyan/50 transition-colors">
              <div className="w-12 h-12 bg-electric-purple/20 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-neon-cyan" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Sofortiger Zugriff</h3>
              <p className="text-gray-400 mb-4">
                Mit Ihrem <span className="text-white font-bold">Profi Business Startpaket</span> (2.000 PW) und nur <span className="text-white font-bold">zwei Empfehlungen</span> (d.h. Sie gewinnen zwei weitere Nutzer für das Business Set) erreichen Sie die nötigen 4.000 PW. Damit sind Sie sofort bestellberechtigt.
              </p>
              <div className="text-xs text-gray-500 bg-white/5 p-3 rounded-lg border border-white/5">
                <span className="text-neon-cyan font-bold">* Info:</span> 1 PW (Punktwert) entspricht ca. 0,50 € Netto-Umsatz. 4.000 PW sind also ca. 2.000 € Umsatzvolumen.
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Fleet Showcase */}
        <div className="mb-32">
          <ScrollReveal>
            <h2 className="text-4xl font-playfair font-bold text-center mb-4 text-white">
              Premium-Flotte <span className="text-neon-cyan">Sofort bestellbar</span>
            </h2>
            <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
              Dies sind nur einige Beispiele. Aktuell stehen ca. 20 verschiedene Modelle für Sie zur Verfügung.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Audi Q8 */}
            <ScrollReveal delay={0.1}>
              <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-white border border-white/10 shadow-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-electric-purple/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src="/images/cars/audi-q8.png" 
                  alt="Audi Q8" 
                  className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110 relative z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end z-20">
                  <h3 className="text-2xl font-bold mb-1 text-white">Audi Q8</h3>
                  <p className="text-gray-300 mb-4 text-sm">SUV Coupé, S-Line</p>
                  <div className="flex items-center justify-between">
                    <div className="text-neon-cyan font-bold text-xl">
                      ab 349€ <span className="text-xs text-gray-400 font-normal">/Monat</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-neon-cyan group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Audi A4 Avant */}
            <ScrollReveal delay={0.2}>
              <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-white border border-white/10 shadow-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-cyan/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src="/images/cars/audi-a4-avant.png" 
                  alt="Audi A4 Avant" 
                  className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110 relative z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end z-20">
                  <h3 className="text-2xl font-bold mb-1 text-white">Audi A4 Avant</h3>
                  <p className="text-gray-300 mb-4 text-sm">Business Kombi</p>
                  <div className="flex items-center justify-between">
                    <div className="text-neon-cyan font-bold text-xl">
                      ab 249€ <span className="text-xs text-gray-400 font-normal">/Monat</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-neon-cyan group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Mercedes CLA */}
            <ScrollReveal delay={0.3}>
              <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-white border border-white/10 shadow-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-electric-purple/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src="/images/cars/mercedes-cla.png" 
                  alt="Mercedes CLA" 
                  className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110 relative z-10"
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end z-20">
                  <h3 className="text-2xl font-bold mb-1 text-white">Mercedes CLA</h3>
                  <p className="text-gray-300 mb-4 text-sm">Coupé, AMG Line</p>
                  <div className="flex items-center justify-between">
                    <div className="text-neon-cyan font-bold text-xl">
                      ab 199€ <span className="text-xs text-gray-400 font-normal">/Monat</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-neon-cyan group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-32">
          <ScrollReveal>
            <h2 className="text-3xl font-playfair font-bold text-center mb-12 text-white">Häufige Fragen von Unternehmern</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div 
                  key={i} 
                  className="glass-card rounded-xl border border-white/5 hover:border-neon-cyan/30 transition-all duration-300 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  >
                    <span className="font-semibold text-white text-lg">{faq.question}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-neon-cyan transition-transform duration-300 ${openFaqIndex === i ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  <AnimatePresence>
                    {openFaqIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* CTA Section */}
        <ScrollReveal>
          <div className="text-center bg-gradient-to-r from-electric-purple/20 to-neon-cyan/20 rounded-3xl p-12 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <h2 className="text-4xl font-playfair font-bold mb-6 text-white relative z-10">Optimieren Sie jetzt Ihren Fuhrpark</h2>
            <p className="text-xl text-gray-300 mb-8 relative z-10">
              Business Hotline: <a href="tel:+491715060008" className="text-white font-bold hover:text-neon-cyan transition-colors">+49 171 5060008</a>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <NeonButton href="mailto:info@lr-lifestyle.info">
                Angebot anfordern
              </NeonButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}

import ScrollReveal from '../components/ScrollReveal';
import { NeonButton } from '../components/ui/NeonButton';
import { User, Cpu, Code, MessageSquare, Rocket, Shield, CheckCircle, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <main className="relative z-10 pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1 rounded-full bg-electric-purple/20 border border-electric-purple/50 text-neon-cyan text-sm font-bold mb-6">
              Die Geschichte hinter LINA
            </div>
            <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 leading-tight text-white">
              Wer hinter <span className="text-neon-cyan">LINA Voice</span> steht
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              LINA Voice ist nicht im Meetingraum entstanden, sondern im echten Geschäftsalltag.
            </p>
          </div>
        </ScrollReveal>

        {/* Founder Story */}
        <section className="mb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-electric-purple to-neon-cyan opacity-20 blur-xl rounded-full"></div>
                <div className="relative glass-card p-8 rounded-2xl border border-white/10 overflow-hidden">
                  <div className="mb-6 rounded-xl overflow-hidden aspect-square border border-white/10 shadow-lg">
                    <img 
                      src="/images/mathias-vinzing.png" 
                      alt="Mathias Vinzing" 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h2 className="text-3xl font-playfair font-bold text-white mb-6">Aus der Praxis für die Praxis</h2>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    Ich bin <strong>Mathias Vinzing</strong>, Platin-Orgaleiter bei LR Health & Beauty und baue seit Monaten skalierbare Vertriebs- und Automatisierungssysteme.
                  </p>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    LINA ist aus echten Abläufen im Tagesgeschäft entstanden – nicht aus Theorie. Ich baue seit Monaten Systeme, die Vertrieb und Kommunikation messbar entlasten: Prozesse, Funnels, Automatisierungen – und KI, die im Alltag wirklich funktioniert.
                  </p>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    <strong>Was mich dabei immer gestört hat:</strong><br/>
                    Unternehmen verlieren täglich Zeit durch wiederkehrende Anfragen – am Telefon, per WhatsApp, per Website. Genau dort muss Technologie helfen: schnell, zuverlässig, klar integriert.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-white mb-4">Von der Idee zur marktreifen Lösung</h3>
                <p className="text-gray-400 leading-relaxed">
                  LINA ist kein Schnellschuss und kein „Tool von der Stange“. Sie ist das Ergebnis von monatelanger Entwicklung, Tests und echter Nutzung – inklusive sauberer Prozesslogik (Weiterleitung, Rückrufe, Terminregeln, Eskalationen) und einer Infrastruktur, die im Betrieb stabil bleibt.
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Erst als LINA intern zuverlässig lief, haben wir sie als Lösung für Unternehmen geöffnet.
                </p>

                <div className="grid grid-cols-1 gap-4">
                  <div className="glass-card p-4 rounded-xl border border-white/5 flex items-start gap-4">
                    <div className="bg-white/5 p-2 rounded-lg"><Cpu className="w-5 h-5 text-neon-cyan" /></div>
                    <div>
                      <strong className="text-white block">LINA Voice (Telefon-KI)</strong>
                      <span className="text-sm text-gray-400">Nimmt Anrufe entgegen, erfasst Anliegen, organisiert Rückrufe und kann – je nach Setup – Termine eintragen oder an Mitarbeitende übergeben.</span>
                    </div>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-white/5 flex items-start gap-4">
                    <div className="bg-white/5 p-2 rounded-lg"><Shield className="w-5 h-5 text-neon-cyan" /></div>
                    <div>
                      <strong className="text-white block">Setup & Betrieb durch IT-Team</strong>
                      <span className="text-sm text-gray-400">Die technische Implementierung und Betreuung erfolgt über ESAGH IT (Wertheim) – damit aus einer Demo ein echtes System wird, das läuft.</span>
                    </div>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-white/5 flex items-start gap-4">
                    <div className="bg-white/5 p-2 rounded-lg"><Rocket className="w-5 h-5 text-neon-cyan" /></div>
                    <div>
                      <strong className="text-white block">Integrationen & Abläufe</strong>
                      <span className="text-sm text-gray-400">Kalender, CRM, E-Mail/WhatsApp und Übergaben werden nach deinen Regeln umgesetzt (je nach Projektumfang).</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Roadmap / Future Section */}
        <section className="mb-32">
          <ScrollReveal>
            <div className="glass-card p-8 md:p-12 rounded-3xl border border-electric-purple/30 bg-gradient-to-br from-deep-navy via-background to-deep-navy relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-xs font-bold mb-4">
                      ROADMAP 2026
                    </div>
                    <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-2">
                      Blick nach vorne: <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-electric-purple">LINA Chat</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl">
                      Parallel zu LINA Voice läuft bei uns bereits ein leistungsfähiger LINA Chatbot im Teambetrieb. Ab 2026 bringen wir daraus eine "Light"-Version für Unternehmen aller Branchen.
                    </p>
                  </div>
                  <NeonButton href="/kontakt" className="shrink-0">
                    Jetzt vormerken lassen <ArrowRight className="w-4 h-4 ml-2" />
                  </NeonButton>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-neon-cyan/30 transition-colors">
                    <MessageSquare className="w-8 h-8 text-neon-cyan mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">WhatsApp-Chatbot</h3>
                    <p className="text-sm text-gray-400">24/7 Antworten, Vorqualifizierung, Unterlagen/Infos, strukturierte Übergabe an dein Team.</p>
                  </div>
                  
                  <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-neon-cyan/30 transition-colors">
                    <Code className="w-8 h-8 text-neon-cyan mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Website-Chat (Widget)</h3>
                    <p className="text-sm text-gray-400">Per Code in jede Website integrierbar – als smarter FAQ- & Lead-Assistent.</p>
                  </div>
                  
                  <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-neon-cyan/30 transition-colors">
                    <Cpu className="w-8 h-8 text-neon-cyan mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Wissensbasis</h3>
                    <p className="text-sm text-gray-400">LINA antwortet auf Basis deiner Inhalte (Dokumente, FAQs, Prozesse).</p>
                  </div>
                  
                  <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-neon-cyan/30 transition-colors">
                    <Rocket className="w-8 h-8 text-neon-cyan mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Onboarding & Training</h3>
                    <p className="text-sm text-gray-400">Schnelle Einarbeitung neuer Mitarbeiter mit Playbooks, Vorlagen und Gesprächssimulationen.</p>
                  </div>
                </div>
                
                <div className="mt-10 pt-8 border-t border-white/10 text-center">
                  <p className="text-lg text-white font-medium">
                    Ziel: Telefon + Chat + Prozesslogik aus einer Hand – mit klarer Struktur und ohne Agentur-Chaos.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold text-white mb-4">Wofür wir stehen</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 rounded-xl border border-white/10 text-center">
                <h3 className="text-lg font-bold text-white mb-3">Praxis statt Theorie</h3>
                <p className="text-sm text-gray-400">Gebaut aus echten Abläufen, nicht am Reißbrett.</p>
              </div>
              <div className="glass-card p-6 rounded-xl border border-white/10 text-center">
                <h3 className="text-lg font-bold text-white mb-3">Transparenz</h3>
                <p className="text-sm text-gray-400">Klare Kostenstruktur und klare Rollen (wer macht was, wer verarbeitet was).</p>
              </div>
              <div className="glass-card p-6 rounded-xl border border-white/10 text-center">
                <h3 className="text-lg font-bold text-white mb-3">Qualität im Betrieb</h3>
                <p className="text-sm text-gray-400">Nicht nur „nice Demo“, sondern laufend betreut und optimiert.</p>
              </div>
              <div className="glass-card p-6 rounded-xl border border-white/10 text-center">
                <h3 className="text-lg font-bold text-white mb-3">Seriöse Kommunikation</h3>
                <p className="text-sm text-gray-400">Keine Wunder-Versprechen, keine Erfolgs-Garantien.</p>
              </div>
            </div>
          </ScrollReveal>
        </section>
        
        <div className="text-center text-xs text-gray-600 mt-20">
          Hinweis: Wir sind unabhängige Partner und keine offizielle LR-Website.
        </div>
      </div>
    </main>
  );
}

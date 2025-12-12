import { Phone, CheckCircle, Play, ArrowRight, Clock, Globe, Zap, Calendar } from 'lucide-react';
import { NeonButton } from '../components/ui/NeonButton';
import ScrollReveal from '../components/ScrollReveal';
import AICore from '../components/3d/AICore';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="relative z-10">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center py-24 lg:py-32 relative overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-60"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] opacity-[0.03] bg-repeat"></div>
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] animate-pulse-slow mix-blend-screen"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[150px] animate-pulse-slow delay-1000 mix-blend-screen"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row lg:flex-nowrap items-center gap-12 lg:gap-20">
            {/* Left: Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col items-start shrink-0 relative z-50 pointer-events-none">
              <div className="pointer-events-auto w-full">
                <ScrollReveal>
                  <div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="inline-block px-4 py-2 rounded-full glass-panel border border-electric-purple/30 mb-6 bg-deep-navy/50 backdrop-blur-sm relative z-50"
                    >
                      <span className="text-sm font-jetbrains text-neon-cyan flex items-center gap-2">
                        <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></span>
                        ULTRAVOX v0.7 ENGINE ONLINE
                      </span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight text-white tracking-tight">
                      Telefon-KI, die Anrufe übernimmt und<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-white to-secondary animate-shimmer bg-[length:200%_100%]">
                        Termine organisiert.
                      </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 mb-10 leading-relaxed max-w-xl font-light">
                      Echtzeit-Gespräche, Weiterleitung, Rückruflogik, Kalender/CRM – eingerichtet durch unser IT-Team.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10 relative z-50 pointer-events-auto">
                      <NeonButton href="tel:+4951116653654" className="w-full sm:w-auto justify-center group cursor-pointer relative z-50">
                        <Phone className="w-5 h-5 inline mr-2 group-hover:scale-110 transition-transform" />
                        Jetzt anrufen & testen
                      </NeonButton>
                      <NeonButton href="/kontakt" variant="secondary" className="w-full sm:w-auto justify-center group cursor-pointer relative z-50">
                        Setup anfragen
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </NeonButton>
                    </div>

                    <p className="text-xs text-gray-500 mb-8 max-w-md leading-relaxed">
                      <span className="text-neon-cyan font-bold">* Test-Nummer (+49 511 16653654):</span> 5-Minuten-Limit. 
                      Demonstriert allgemeine Fähigkeiten. Ihre KI wird später individuell angepasst.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Right: Video / Visual */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end shrink-0 mt-12 lg:mt-0 relative z-20 pointer-events-none lg:pointer-events-auto">
              <div id="demo" className="pointer-events-auto w-full flex justify-center lg:justify-end relative scroll-mt-32">
                {/* Mobile: Centered and larger orb behind video */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] md:w-[600px] md:h-[600px] md:-top-40 md:-right-40 md:translate-x-0 md:translate-y-0 opacity-60 pointer-events-none z-0 group-hover:opacity-80 transition-opacity duration-500">
                   <AICore />
                </div>
                
                {/* AI Core Description - Floating Label */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute right-0 -top-20 md:-right-12 md:-top-12 z-30 block"
                >
                  <div className="glass-panel px-4 py-2 rounded-lg border border-neon-cyan/30 bg-black/40 backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></div>
                      <span className="text-xs font-bold text-neon-cyan tracking-wider">AI CORE ACTIVE</span>
                    </div>
                    <p className="text-[10px] text-gray-400 max-w-[120px] leading-tight">
                      Neuronales Netzwerk verarbeitet Sprache in Echtzeit
                    </p>
                  </div>
                  <div className="w-px h-12 bg-gradient-to-b from-neon-cyan/50 to-transparent absolute left-4 top-full hidden md:block"></div>
                </motion.div>
              </div>
              <ScrollReveal delay={0.2} className="w-full max-w-full md:max-w-lg relative z-10 pointer-events-auto px-4 md:px-0">
                <div className="relative aspect-video glass-card rounded-2xl flex items-center justify-center border border-electric-purple/20 bg-deep-navy/30 backdrop-blur-md overflow-hidden group shadow-2xl shadow-electric-purple/20 transition-all duration-500 hover:shadow-neon-cyan/20 hover:border-neon-cyan/30">
                  <video 
                    className="w-full h-full object-cover rounded-2xl transform transition-transform duration-700 group-hover:scale-105"
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    controls
                    poster="/images/video-poster.jpg"
                  >
                    <source src="/videos/lina-demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-6 left-6 flex items-center gap-3 pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-neon-cyan/20 backdrop-blur-md flex items-center justify-center border border-neon-cyan/50 animate-pulse">
                      <Play className="w-4 h-4 text-neon-cyan fill-neon-cyan" />
                    </div>
                    <div>
                      <p className="text-xs text-neon-cyan font-bold tracking-wider">LIVE DEMO</p>
                      <p className="text-xs text-gray-300">Lina in Aktion</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Was LINA kann */}
      <section className="py-20 bg-deep-navy/30 relative" id="features">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-white">Was LINA kann</h2>
                <p className="text-xl text-gray-400">Belegbare Features für Ihren Geschäftsalltag</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Phone, title: "Weiterleitung / Durchstellen", desc: "Verbindet Anrufer direkt mit dem richtigen Ansprechpartner." },
                  { icon: Clock, title: "Rückruf & Follow-up", desc: "Nimmt Rückrufbitten auf und organisiert die Wiedervorlage." },
                  { icon: Calendar, title: "Terminmanagement", desc: "Bucht, verschiebt oder sagt Termine direkt in Ihrem Kalender ab." },
                  { icon: Globe, title: "Mehrsprachigkeit", desc: "Kommuniziert fließend in mehreren Sprachen (wenn aktiviert)." },
                  { icon: CheckCircle, title: "Zusammenfassung", desc: "Erstellt Gesprächsprotokolle und übergibt sie an Ihr Team." },
                  { icon: Zap, title: "24/7 Erreichbarkeit", desc: "Nimmt jeden Anruf an – auch nachts und am Wochenende." }
                ].map((feature, i) => (
                  <div key={i} className="glass-card p-6 rounded-xl border border-white/5 hover:border-neon-cyan/30 transition-colors group">
                    <feature.icon className="w-10 h-10 text-neon-cyan mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Process Section - So läuft's ab */}
      <section className="py-20 bg-background relative border-t border-white/5">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16 text-center text-white">So läuft's ab</h2>
              
              <div className="grid md:grid-cols-3 gap-12 relative">
                {/* Connector Line */}
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-electric-purple/0 via-electric-purple/50 to-electric-purple/0"></div>
                
                {[
                  { step: "01", title: "Anfrage & Bedarf", desc: "Sie schildern uns kurz Ihre Situation und was die KI übernehmen soll." },
                  { step: "02", title: "Einrichtung", desc: "Wir passen Stimme, Wissen und Regeln exakt an Ihr Unternehmen an." },
                  { step: "03", title: "Live & Support", desc: "LINA geht ans Telefon. Wir kümmern uns um den laufenden Betrieb." }
                ].map((item, i) => (
                  <div key={i} className="relative flex flex-col items-center text-center z-10">
                    <div className="w-24 h-24 rounded-full bg-deep-navy border border-electric-purple/30 flex items-center justify-center mb-6 shadow-[0_0_30px_-10px_rgba(124,58,237,0.3)]">
                      <span className="text-3xl font-bold text-neon-cyan font-heading">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-navy to-black z-0"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">
              Bereit für die <span className="text-neon-cyan">Zukunft?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Lassen Sie uns gemeinsam herausfinden, wie LINA Voice Ihr Unternehmen entlasten kann.
            </p>
            <NeonButton href="/kontakt" className="text-lg px-12 py-4">
              Jetzt Kontakt aufnehmen
            </NeonButton>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}

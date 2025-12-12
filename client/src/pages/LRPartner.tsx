import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ShieldCheck, Globe, Package, Building2 } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollReveal from "@/components/ScrollReveal";

export default function LRPartner() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="pb-20 pt-20">
      <ContactForm open={isContactOpen} onOpenChange={setIsContactOpen} />
      {/* Fallback for mobile if dialog fails */}
      <div id="contact-fallback" className="hidden"></div>
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-deep-space border-b border-white/10">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="inline-block px-4 py-1 rounded-full bg-electric-purple/20 border border-electric-purple/50 text-neon-cyan text-sm font-bold mb-6">
              Unser Produkt-Partner
            </div>
            <h1 className="text-5xl md:text-7xl font-playfair font-bold leading-tight mb-6 text-white">
              LR Health & Beauty <br />
              <span className="text-gray-400">Der Lieferant Ihres Business-Pakets.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Warum LR? Wir nutzen die Infrastruktur und die hochwertigen Produkt-Bundles eines der größten deutschen Direktvertriebsunternehmen als Basis für unser Geschäftsmodell.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Startset Detail Section */}
      <section className="py-24 bg-deep-navy/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto glass-card p-8 md:p-12 rounded-3xl border border-electric-purple/30 bg-deep-navy/50">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(124,58,237,0.3)] group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <img 
                      src="/images/lr-profi-set-gold.png" 
                      alt="LR Profi Business Pro Set" 
                      className="w-full h-auto object-contain bg-white/5 transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="bg-neon-cyan text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Bestseller
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 text-left">
                  <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-white">
                    Das <span className="text-neon-cyan">Profi Business Set</span>
                  </h2>
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    Ihr Einstiegspaket enthält hochwertige Produkte im Wert von über 1.500€. 
                    Es ist der physische Gegenwert für Ihre Investition und ermöglicht Ihnen den sofortigen Start.
                  </p>
                  
                  <div className="space-y-6 mb-8">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                      <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5 text-neon-cyan" />
                        Inhalt des Sets:
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-neon-cyan mt-1">•</span>
                          <span><strong>Zeitgard Pro Cosmetic Device</strong> (inkl. Face Cleansing Tool, Face Smoothing Tool, Body Skincare Tool, Face Peeling Tool)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-neon-cyan mt-1">•</span>
                          <span><strong>Aloe Vera All-in One Set</strong> (inkl. Special Care Bag, Cleansing Cream, Drinking Gel Honey, etc.)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-neon-cyan mt-1">•</span>
                          <span><strong>Mind Master Formula Gold</strong> & <strong>5in1 Beauty Elixir</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-neon-cyan mt-1">•</span>
                          <span><strong>LR Discovery Box</strong> & <strong>ProBalance</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-neon-cyan mt-1">•</span>
                          <span><strong>Zeitgard Face Tonic</strong> & <strong>Körpercreme</strong></span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-6">
                    <div>
                      <span className="block text-sm text-gray-500 uppercase tracking-wider">Investition (Einmalig)</span>
                      <div className="flex flex-col">
                        <span className="text-3xl font-bold text-white">742,40 €</span>
                        <span className="text-xs text-gray-400">(712,50 € Set + 29,90 € Setup)</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setIsContactOpen(true)}
                      className="bg-neon-cyan text-black hover:bg-white font-bold"
                    >
                      Details anfragen
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Key Facts Grid */}
      <section className="py-24 bg-deep-navy/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="glass-card p-8 rounded-2xl border border-white/10 hover:border-neon-cyan/30 transition-colors h-full">
                <div className="mb-6 p-4 w-fit rounded-xl bg-electric-purple/10">
                  <Building2 className="w-10 h-10 text-neon-cyan" />
                </div>
                <h3 className="font-playfair font-bold text-2xl text-white mb-4">Deutsches Unternehmen</h3>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Gegründet 1985 in Ahlen (Westfalen). Ein seriöser Partner mit über 40 Jahren Marktbestandigkeit.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="glass-card p-8 rounded-2xl border border-white/10 hover:border-neon-cyan/30 transition-colors h-full">
                <div className="mb-6 p-4 w-fit rounded-xl bg-electric-purple/10">
                  <ShieldCheck className="w-10 h-10 text-neon-cyan" />
                </div>
                <h3 className="font-playfair font-bold text-2xl text-white mb-4">Keine Verpflichtungen</h3>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Sie erwerben lediglich das Startpaket. Es bestehen keine Abnahmeverpflichtungen, keine Mindestumsätze und keine Tätigkeitspflichten.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="glass-card p-8 rounded-2xl border border-white/10 hover:border-neon-cyan/30 transition-colors h-full">
                <div className="mb-6 p-4 w-fit rounded-xl bg-electric-purple/10">
                  <Package className="w-10 h-10 text-neon-cyan" />
                </div>
                <h3 className="font-playfair font-bold text-2xl text-white mb-4">Logistik & Fulfillment</h3>
                <p className="text-lg text-gray-400 leading-relaxed">
                  LR liefert das "Profi Business Set" (Zeitgard Pro, etc.), das als materieller Gegenwert Ihres Einstiegs dient.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Clarification Section */}
      <section className="py-24 bg-deep-space">
        <div className="container mx-auto px-4 max-w-5xl">
          <ScrollReveal>
            <div className="glass-card p-10 rounded-3xl border border-electric-purple/30 bg-deep-navy/50">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-8 text-white text-center">
                Das Prinzip: Produktwert statt Setup-Kosten
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed text-center max-w-3xl mx-auto">
                Anstatt einer hohen Einrichtungsgebühr für die KI-Integration erwerben Sie das <strong className="text-white">LR Profi Business Set</strong>. 
                Dies dient als "Eintrittskarte" in unsere Plattform.
              </p>
              
              <div className="grid md:grid-cols-2 gap-12 mt-12">
                <div className="bg-black/20 p-8 rounded-2xl border border-white/5">
                  <h3 className="font-bold text-2xl mb-6 flex items-center gap-3 text-white">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                    Was Sie bekommen
                  </h3>
                  <ul className="space-y-4 text-lg text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Vollständige Einrichtung Ihrer Lina Voice KI</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Das hochwertige LR Profi Business Set (Warenwert &gt; 1.500€)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Zugang zum LR Autokonzept (optionales Firmenleasing)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Einkaufskonditionen (-30%) für Eigenbedarf</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-black/20 p-8 rounded-2xl border border-white/5">
                  <h3 className="font-bold text-2xl mb-6 flex items-center gap-3 text-white">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/50">
                      <span className="text-red-500 font-bold text-lg">✕</span>
                    </div>
                    Was Sie NICHT tun müssen
                  </h3>
                  <ul className="space-y-4 text-lg text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Sie <strong>müssen</strong> kein Team aufbauen oder aktiv Network Marketing betreiben.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Es gibt <strong>keine Verpflichtung</strong>, Produkte weiterzuverkaufen.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Es gibt <strong>keine monatlichen Mindestabnahmen</strong>, wenn Sie das Profi Business Set nur als Unternehmer-Paket für Lina Voice nutzen.</span>
                    </li>
                  </ul>
                  <p className="mt-6 text-gray-400 text-sm italic">
                    Natürlich haben Sie die Möglichkeit, das LR-Geschäft bei Interesse zusätzlich aufzubauen – das ist aber optional und kein Bestandteil unseres KI-Telefonservice-Angebots.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>



      {/* FAQ Section */}
      <section className="py-24 bg-deep-navy/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-12 text-center text-white">Häufige Fragen zum Partner LR</h2>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border border-white/10 rounded-xl bg-black/20 px-4">
                <AccordionTrigger className="text-xl font-medium text-white hover:text-neon-cyan hover:no-underline py-6">
                  Warum läuft die Abwicklung über LR?
                </AccordionTrigger>
                <AccordionContent className="text-lg text-gray-400 pb-6 leading-relaxed">
                  Wir nutzen das LR Profi Business Set als standardisiertes Business-Paket. Dies ermöglicht uns, die KI-Einrichtung ohne separate Agentur-Rechnung anzubieten. Sie erhalten für Ihr Geld also echten Warenwert statt nur einer Dienstleistung.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border border-white/10 rounded-xl bg-black/20 px-4">
                <AccordionTrigger className="text-xl font-medium text-white hover:text-neon-cyan hover:no-underline py-6">
                  Bin ich dann LR-Vertreter?
                </AccordionTrigger>
                <AccordionContent className="text-lg text-gray-400 pb-6 leading-relaxed">
                  Formal werden Sie als LR-Partner registriert, um das Profi Business Set zu beziehen und z. B. Zugang zum Autokonzept zu erhalten. Sie <strong>müssen</strong> jedoch nicht aktiv als Vertriebspartner auftreten. Sie können LR rein als Infrastruktur für Ihr Unternehmer-Paket mit Lina Voice nutzen – alles Weitere ist optional.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border border-white/10 rounded-xl bg-black/20 px-4">
                <AccordionTrigger className="text-xl font-medium text-white hover:text-neon-cyan hover:no-underline py-6">
                  Gibt es versteckte Kosten?
                </AccordionTrigger>
                <AccordionContent className="text-lg text-gray-400 pb-6 leading-relaxed">
                  Nein. Nach dem Kauf des Startsets zahlen Sie für die KI-Nutzung lediglich die reinen Verbrauchskosten (Minutenpreise für Telefonie/KI), die direkt abgerechnet werden. Es gibt keine LR-Abos oder versteckte Gebühren.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-electric-purple/20 to-neon-blue/20 blur-3xl opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-8 text-white">Fokus auf Ihr Business – mit starker Infrastruktur</h2>
            <Button 
              className="bg-white text-black hover:bg-primary hover:text-white font-bold text-xl px-10 py-6 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(196,155,255,0.8)] transition-all transform hover:scale-105"
              onClick={() => setIsContactOpen(true)}
            >
              Startpaket anfordern
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

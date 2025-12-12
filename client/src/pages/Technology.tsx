import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Zap, Cpu, Lock, Activity, Phone, Server, Database, Globe } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

export default function Technology() {
  return (
    <div className="pb-20 pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="inline-block px-4 py-1 rounded-full bg-electric-purple/20 border border-electric-purple/50 text-neon-cyan text-sm font-bold mb-6">
              Ultravox v0.7 Core
            </div>
            <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 leading-tight text-white">
              Die Technologie hinter <br />
              <span className="text-neon-cyan">LINA Voice</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              LINA Voice kombiniert modernste Echtzeit-Voice-KI mit einer stabilen Infrastruktur in Deutschland. 
              Im Hintergrund arbeitet Ultravox v0.7 – ein spezialisiertes Speech-Language-Modell auf Basis von GLM 4.6.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-white">Enterprise-Features & Automatisierung</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                LINA ist weit mehr als eine „intelligente Telefonzentrale“. Hinter der Voice-Ebene läuft eine komplette Automatisierungs- und Vertriebslogik.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <ScrollReveal delay={0.1}>
              <div className="space-y-8">
                <div className="glass-card p-8 rounded-2xl border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <Database className="w-6 h-6 text-neon-cyan" />
                    1. Kontakte, Daten & Wissen
                  </h3>
                  <ul className="space-y-4 text-gray-400 text-sm">
                    <li>
                      <strong className="text-white block mb-1">Import von Kontaktlisten</strong>
                      LINA kann Kontaktlisten (z. B. CSV) übernehmen und für Kampagnen oder Rückrufaktionen nutzen.
                    </li>
                    <li>
                      <strong className="text-white block mb-1">Gesprächshistorien im Blick</strong>
                      Kontakte werden inkl. Historie geführt – so wissen Sie jederzeit, was besprochen wurde.
                    </li>
                    <li>
                      <strong className="text-white block mb-1">Vektordatenbanken für Ihr Wissen</strong>
                      Echtzeit-Zugriff auf individuelles Unternehmenswissen (FAQ, Produkte) statt nur generisches KI-Wissen.
                    </li>
                  </ul>
                </div>

                <div className="glass-card p-8 rounded-2xl border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <Zap className="w-6 h-6 text-neon-cyan" />
                    2. Automatisierung im Vertrieb
                  </h3>
                  <ul className="space-y-4 text-gray-400 text-sm">
                    <li>
                      <strong className="text-white block mb-1">Aus kalten Leads werden warme Kontakte</strong>
                      LINA qualifiziert Anrufer vor, fragt Bedarf ab und bereitet Leads für den Vertrieb vor.
                    </li>
                    <li>
                      <strong className="text-white block mb-1">Automatische Terminvereinbarung</strong>
                      Termine landen direkt im Kalender – inkl. Gesprächszusammenfassung für Ihr Team.
                    </li>
                    <li>
                      <strong className="text-white block mb-1">Outbound-Kampagnen</strong>
                      Skalierbare Kampagnensteuerung: LINA ruft Listen ab und protokolliert Ergebnisse.
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-8">
                <div className="glass-card p-8 rounded-2xl border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <Activity className="w-6 h-6 text-neon-cyan" />
                    3. Qualität & Reporting
                  </h3>
                  <ul className="space-y-4 text-gray-400 text-sm">
                    <li>
                      <strong className="text-white block mb-1">Standardisierte Auswertung</strong>
                      Strukturierte Protokolle machen den Erfolg von Kampagnen messbar.
                    </li>
                    <li>
                      <strong className="text-white block mb-1">Steigerung der Effizienz</strong>
                      Wiederkehrende Aufgaben werden ausgelagert, Ressourcen werden frei.
                    </li>
                    <li>
                      <strong className="text-white block mb-1">Reduzierung von Aufwänden</strong>
                      Informationen landen direkt im System statt auf Zetteln.
                    </li>
                  </ul>
                </div>

                <div className="glass-card p-8 rounded-2xl border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <Cpu className="w-6 h-6 text-neon-cyan" />
                    4. Performance & Latenz
                  </h3>
                  <ul className="space-y-4 text-gray-400 text-sm">
                    <li>
                      <strong className="text-white block mb-1">Edge-Cutting-Technologie</strong>
                      Antwortzeiten im Bereich von rund 150-200 ms auf Modellseite für absolut flüssige Echtzeit-Interaktion.
                    </li>
                    <li>
                      <strong className="text-white block mb-1">Was bedeutet Latenz?</strong>
                      Die Zeit zwischen "Kunde spricht" und "LINA antwortet". Wenige hundert Millisekunden wirken natürlich.
                    </li>
                    <li>
                      <strong className="text-white block mb-1">Skalierung auf viele Agenten</strong>
                      Ob 10 oder 100 parallele Calls: LINA skaliert ohne Personalaufbau.
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-white">Architektur im Überblick</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Von der Rufnummer bis zum Termin – ein typischer Anruf mit LINA läuft in vier technischen Schritten:
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-6">
            <ScrollReveal delay={0.1}>
              <div className="glass-card p-6 rounded-xl border border-white/10 h-full">
                <div className="w-12 h-12 bg-electric-purple/20 rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-neon-cyan" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">1. Telefonie-Ebene</h3>
                <p className="text-sm text-gray-400">
                  Ein Anrufer wählt Ihre Nummer. Die Verbindung wird über einen Telefondienstleister (z. B. Twilio) aufgebaut.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="glass-card p-6 rounded-xl border border-white/10 h-full">
                <div className="w-12 h-12 bg-electric-purple/20 rounded-full flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-neon-cyan" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">2. Voice-KI (Ultravox)</h3>
                <p className="text-sm text-gray-400">
                  Ultravox v0.7 versteht Sprache direkt (ohne ASR). LINA "denkt", plant Antworten und entscheidet über Tool-Aufrufe.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="glass-card p-6 rounded-xl border border-white/10 h-full">
                <div className="w-12 h-12 bg-electric-purple/20 rounded-full flex items-center justify-center mb-4">
                  <Server className="w-6 h-6 text-neon-cyan" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">3. Orchestrierung</h3>
                <p className="text-sm text-gray-400">
                  Unsere IT-Firma in Frankfurt steuert Integrationen und Monitoring. Hier wird festgelegt, welche Daten wohin fließen.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="glass-card p-6 rounded-xl border border-white/10 h-full">
                <div className="w-12 h-12 bg-electric-purple/20 rounded-full flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-neon-cyan" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">4. Ihre Systeme</h3>
                <p className="text-sm text-gray-400">
                  Kalender, CRM, E-Mail. LINA ist die Schnittstelle zwischen Kunde, Telefon und Ihren internen Prozessen.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Ultravox Deep Dive */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-white">
                Ultravox v0.7 – <br />
                <span className="text-neon-cyan">Native Voice-KI</span>
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Statt einer Kette aus "Spracherkennung → Text-KI → Sprachausgabe" nutzt LINA eine native Sprach-KI. 
                Das reduziert Latenz, macht Gespräche natürlicher und erhöht die Zuverlässigkeit.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-neon-cyan mt-1" />
                  <div>
                    <strong className="text-white block">26 Sprachen</strong>
                    <span className="text-sm text-gray-400">Deutsch, Englisch, Französisch, Türkisch u.v.m.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-neon-cyan mt-1" />
                  <div>
                    <strong className="text-white block">Tools / Function Calling</strong>
                    <span className="text-sm text-gray-400">LINA kann während des Gesprächs Funktionen ausführen (z. B. Termin anlegen).</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-neon-cyan mt-1" />
                  <div>
                    <strong className="text-white block">Sehr niedrige Latenz</strong>
                    <span className="text-sm text-gray-400">Antwortzeiten im Bereich von ca. 150-200 ms für absolut flüssige Echtzeit-Interaktion.</span>
                  </div>
                </li>
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="glass-card p-8 rounded-2xl border border-white/10 bg-black/40">
                <h3 className="text-xl font-bold text-white mb-6">Für Ihre IT-Abteilung</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                    <h4 className="font-bold text-neon-cyan text-sm mb-1">Echtzeit-Streaming</h4>
                    <p className="text-xs text-gray-400">Bidirektionale Audio-Verbindung (WebRTC/Telephony), keine statischen Bandansagen.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                    <h4 className="font-bold text-neon-cyan text-sm mb-1">Native Speech-LLM</h4>
                    <p className="text-xs text-gray-400">Kein separater ASR-Schritt, direkte Verarbeitung von Audio-Tokens.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                    <h4 className="font-bold text-neon-cyan text-sm mb-1">Logging & Monitoring</h4>
                    <p className="text-xs text-gray-400">Technische Ereignisse (Call Start/End, Errors, Tool Calls) werden protokolliert.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                    <h4 className="font-bold text-neon-cyan text-sm mb-1">Verantwortlichkeiten</h4>
                    <p className="text-xs text-gray-400">Ultravox (Voice-Infrastruktur) vs. IT-Firma Frankfurt (Orchestrierung & Logik).</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Integration Details */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-white">Integrationen</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                LINA ist keine Insel, sondern vernetzt sich intelligent mit Ihren bestehenden Systemen.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="glass-card p-8 rounded-2xl border border-white/10 h-full">
                <h3 className="text-xl font-bold text-white mb-4">Intelligente Weiterleitung</h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-neon-cyan mt-0.5" /> Routing auf Durchwahlen (Empfang, Notdienst)</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-neon-cyan mt-0.5" /> Erkennung von Notfällen oder Eskalationen</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-neon-cyan mt-0.5" /> Nahtlose Übergabe an menschliche Mitarbeiter</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="glass-card p-8 rounded-2xl border border-white/10 h-full">
                <h3 className="text-xl font-bold text-white mb-4">Terminbuchung & -änderung</h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-neon-cyan mt-0.5" /> Anbindung an Online-Kalender / Buchungstools</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-neon-cyan mt-0.5" /> Echtzeit-Prüfung freier Slots</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-neon-cyan mt-0.5" /> Dokumentation von Verschiebungen & Absagen</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="glass-card p-8 rounded-2xl border border-white/10 h-full">
                <h3 className="text-xl font-bold text-white mb-4">Rückrufe & Leads</h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-neon-cyan mt-0.5" /> Strukturierte Aufnahme von Kontaktdaten</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-neon-cyan mt-0.5" /> Erfassung von Anliegen und Dringlichkeit</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-neon-cyan mt-0.5" /> Automatische Benachrichtigung (Mail, CRM)</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Building2, Users, Play, ExternalLink, HelpCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PartnerContactForm from "@/components/PartnerContactForm";

export default function Karriere() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Karriere & Partnerschaft
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Für LR Partner – und alle, die es werden wollen.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Wenn du ein modernes, duplizierbares System aufbauen willst, bist du hier richtig: KI (LINA) + klare Prozesse + Unternehmer als neue Zielgruppe.
          </p>
        </motion.div>

        {/* Main Grid Section */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {/* Kachel A: Unternehmer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full bg-card/50 border-primary/10 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Für Unternehmer</CardTitle>
                <CardDescription className="text-lg">
                  LINA Voice im Unternehmen einsetzen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {[
                    "Telefon-KI nimmt Anrufe im Firmennamen an (24/7)",
                    "Qualifiziert Anliegen, löst Rückrufe aus, leitet weiter",
                    "Termin-Anbahnung/Eintrag möglich (je nach Setup)",
                    "Strukturierte Gesprächszusammenfassungen fürs Team",
                    "Einrichtung & Support durch IT-Team"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/kontakt">
                    <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                      Setup anfragen
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/#demo">
                    <Button variant="outline" className="w-full sm:w-auto border-primary/20 hover:bg-primary/5">
                      Demo hören
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Kachel B: Partner */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full bg-card/50 border-cyan-500/10 hover:border-cyan-500/30 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-cyan-500" />
                </div>
                <CardTitle className="text-2xl">Für LR Partner & Interessenten</CardTitle>
                <CardDescription className="text-lg">
                  Teamweg: duplizierbar, modern, KI-gestützt
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {[
                    "Unternehmer als Zielgruppe: Ansprache, Demo, Follow-ups",
                    "Vorlagen, Scripts, Einwandbehandlung – Schritt-für-Schritt",
                    "Fokus: echte Lösung anbieten (Telefon-KI + Prozesse)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/10 text-sm text-cyan-200/80">
                  <p className="mb-2 font-medium text-cyan-400">Exklusiv im Team:</p>
                  <p className="mb-3">LR Partner in unserem Team erhalten LINA Chat (Hauptversion) als Unterstützung.</p>
                  <p className="text-xs opacity-70 italic">Ab 2026: LINA Chat Light – WhatsApp- & Website-Chatbot für Unternehmen aller Branchen.</p>
                </div>

                <div className="pt-2">
                  <a href="#lr-praesentation" className="block w-full">
                    <Button className="w-full bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 border border-cyan-500/20">
                      Zur LR Geschäftspräsentation
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* LR Geschäftspräsentation Section */}
        <motion.div
          id="lr-praesentation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto mb-20 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">LR Geschäftspräsentation</h2>
          <p className="text-muted-foreground mb-8">
            Hier kannst du dich schnell informieren – als Klick-Präsi oder Video:
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://dein-lr-business.de/presentation.html#folie_01" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border-0">
                <ExternalLink className="mr-2 w-5 h-5" />
                Präsentation zum Durchklicken
              </Button>
            </a>
            
            <a 
              href="https://youtu.be/N-soKAiyjsA?si=hgXTIzLd9KB4lxqj" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/10 hover:bg-white/5">
                <Play className="mr-2 w-5 h-5 fill-current" />
                YouTube Geschäftspräsentation
              </Button>
            </a>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="flex items-center gap-3 mb-8 justify-center">
            <HelpCircle className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">Häufige Fragen</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                q: "Für wen ist der Partnerweg gedacht?",
                a: "Für alle, die sich ein zweites Standbein aufbauen oder ein bestehendes Business erweitern wollen. Ideal für Menschen, die unternehmerisch denken und von KI-Trends profitieren möchten."
              },
              {
                q: "Brauche ich technisches Vorwissen?",
                a: "Nein. Wir stellen alle Tools, Vorlagen und Schulungen zur Verfügung. Du musst kein Programmierer sein, um LINA Voice zu empfehlen."
              },
              {
                q: "Wie funktioniert die Vergütung?",
                a: "Die Vergütung erfolgt über den LR Marketingplan. Details dazu erläutern wir transparent in der Geschäftspräsentation und im persönlichen Gespräch."
              },
              {
                q: "Ist das ein Schneeballsystem?",
                a: "Nein. LR ist ein seit 1985 bestehendes, seriöses Direktvertriebsunternehmen. Der Fokus liegt auf Produktverkauf und echtem Markenaufbau, nicht auf Kopfgeldprämien."
              },
              {
                q: "Kann ich LINA Voice auch selbst nutzen?",
                a: "Ja, natürlich. Viele unserer Partner nutzen LINA Voice selbst in ihrem Hauptgeschäft und empfehlen es dann weiter."
              },
              {
                q: "Wie viel Zeit muss ich investieren?",
                a: "Das entscheidest du selbst. Der Partnerweg ist flexibel gestaltbar – von wenigen Stunden pro Woche bis hin zum Vollzeit-Business."
              },
              {
                q: "Gibt es Fixkosten?",
                a: "Der Einstieg ist mit geringen einmaligen Kosten für dein Starterpaket verbunden (Produkte + Lizenz). Danach gibt es keine monatlichen Pflichtabnahmen."
              },
              {
                q: "Bekomme ich Unterstützung?",
                a: "Ja. Du erhältst Zugang zu unserer Team-Akademie, regelmäßigen Calls, WhatsApp-Support und natürlich unserer eigenen KI-Assistenz."
              }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-white/10 bg-card/30 rounded-lg px-4">
                <AccordionTrigger className="text-left hover:text-primary transition-colors py-4 text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Partner Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <PartnerContactForm />
        </motion.div>

        {/* Compliance Note */}
        <div className="max-w-3xl mx-auto text-center border-t border-white/5 pt-8">
          <p className="text-xs text-muted-foreground/50 leading-relaxed">
            Kein Erfolgs- oder Einkommensversprechen. Voraussetzungen und Vorteile erklären wir transparent im persönlichen Gespräch. LINA Voice ist ein eigenständiges Angebot; LR ist weder Anbieter noch Verantwortlicher für unseren KI-Service.
          </p>
        </div>
      </div>
    </div>
  );
}

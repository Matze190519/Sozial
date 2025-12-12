import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Users, TrendingUp, ShieldCheck, Rocket, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const formSchema = z.object({
  companyName: z.string().min(2, "Firmenname muss mindestens 2 Zeichen lang sein"),
  contactName: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  phone: z.string().min(6, "Telefonnummer ist erforderlich"),
  website: z.string().url("Bitte geben Sie eine gültige URL ein").optional().or(z.literal("")),
  partnerType: z.string().min(1, "Bitte wählen Sie einen Partnertyp"),
  clientBaseSize: z.string().min(1, "Bitte geben Sie die Größe Ihres Kundenstamms an"),
  message: z.string().optional(),
});

export default function Partners() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      website: "",
      partnerType: "",
      clientBaseSize: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would send data to an API
    console.log(values);
    toast.success("Vielen Dank für Ihre Bewerbung! Wir melden uns in Kürze.");
    form.reset();
  }
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-4 relative z-10">
          <Badge className="bg-white/10 text-white border-white/20 mb-6 hover:bg-white/20">Lina Partner Program</Badge>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
            Wachsen Sie mit der <br />
            <span className="text-secondary">Stimme der Zukunft.</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl leading-relaxed mb-8">
            Erweitern Sie Ihr Portfolio um die fortschrittlichste Voice-AI am Markt. 
            Für Agenturen, Consultants und Integratoren, die ihren Kunden echten Vorsprung bieten wollen.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#apply" className="bg-white text-primary font-bold py-4 px-8 rounded-sm hover:bg-secondary transition-colors shadow-lg inline-flex items-center">
              <Rocket className="w-5 h-5 mr-2" />
              Partner werden
            </a>
            <Link href="/technology" className="bg-transparent border border-white/30 text-white font-bold py-4 px-8 rounded-sm hover:bg-white/10 transition-colors inline-flex items-center">
              Technologie ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Why Partner? */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-primary">Warum Lina Voice?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Wir bieten nicht nur Software, sondern ein komplettes Geschäftsmodell für Ihren Erfolg.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card border-border hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="font-heading text-2xl">Attraktive Margen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Profitieren Sie von wiederkehrenden Einnahmen (Revenue Share) und attraktiven Setup-Gebühren. 
                  Unser Modell ist auf langfristiges, gemeinsames Wachstum ausgelegt.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-border hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <ShieldCheck className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="font-heading text-2xl">Exklusive Technologie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Bieten Sie Ihren Kunden etwas, das sie woanders nicht bekommen: 
                  Echte Echtzeit-Kommunikation mit ca. 150-200 ms Latenz dank Ultravox v0.7 Core.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-border hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="font-heading text-2xl">Full-Service Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Sie verkaufen, wir liefern. Unser technisches Team übernimmt auf Wunsch das komplette Onboarding 
                  und die Einrichtung für Ihre Kunden.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-primary">Für wen ist das Partnerprogramm?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1">
                    <Globe className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Digital- & Marketing-Agenturen</h3>
                    <p className="text-muted-foreground">
                      Erweitern Sie Ihr Service-Angebot. Helfen Sie Ihren Kunden nicht nur bei der Lead-Generierung, 
                      sondern auch bei der automatisierten Lead-Qualifizierung und Terminbuchung.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Unternehmensberater</h3>
                    <p className="text-muted-foreground">
                      Optimieren Sie die Prozesse Ihrer Mandanten. Implementieren Sie KI-Lösungen, die messbar 
                      Kosten senken und die Erreichbarkeit auf 24/7 erhöhen.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1">
                    <Rocket className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">IT-Systemhäuser & Integratoren</h3>
                    <p className="text-muted-foreground">
                      Integrieren Sie Lina tief in die CRM- und ERP-Landschaften Ihrer Kunden. 
                      Nutzen Sie unsere API und Webhooks für maßgeschneiderte Lösungen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-panel p-8 rounded-2xl border border-white/10 relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
              <h3 className="text-2xl font-heading font-bold mb-6">Partner Benefits</h3>
              <ul className="space-y-4">
                {[
                  "Attraktive Lifetime-Provisionen",
                  "White-Label Optionen verfügbar",
                  "Priorisierter technischer Support",
                  "Zugang zu Beta-Features",
                  "Co-Marketing Materialien",
                  "Persönlicher Partner Manager"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-green-500" />
                    </div>
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-sm text-muted-foreground mb-4">
                  "Durch die Partnerschaft mit Lina konnten wir unseren Kunden endlich eine funktionierende KI-Telefonie-Lösung anbieten. Die Einrichtung ist kinderleicht."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full" />
                  <div>
                    <p className="font-bold text-sm">Michael Weber</p>
                    <p className="text-xs text-muted-foreground">CEO, WebScale Agency</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="container mx-auto px-4 mt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-primary">Werden Sie Teil der Revolution.</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Die Nachfrage nach Voice AI explodiert. Positionieren Sie sich jetzt als Vorreiter. 
              Füllen Sie das Formular aus, um sich für das Partnerprogramm zu bewerben.
            </p>
            
            <div className="bg-muted/30 p-8 rounded-xl border border-border mb-8">
              <h3 className="text-xl font-bold mb-4">Ihr direkter Draht</h3>
              <p className="text-muted-foreground mb-6">
                Sie haben vorab Fragen? Unser Partner-Management steht Ihnen gerne zur Verfügung.
              </p>
              <a href="tel:+491715060008" className="flex items-center gap-3 text-primary font-bold hover:underline text-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                +49 171 5060008
              </a>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Partner-Bewerbung</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Firmenname</FormLabel>
                        <FormControl>
                          <Input placeholder="Ihre Agentur GmbH" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ansprechpartner</FormLabel>
                        <FormControl>
                          <Input placeholder="Max Mustermann" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-Mail</FormLabel>
                        <FormControl>
                          <Input placeholder="partner@firma.de" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon</FormLabel>
                      <FormControl>
                        <Input placeholder="+49 ..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="partnerType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Art der Partnerschaft</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Bitte wählen" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="agency">Agentur / Reseller</SelectItem>
                            <SelectItem value="consultant">Unternehmensberater</SelectItem>
                            <SelectItem value="integrator">IT-Integrator</SelectItem>
                            <SelectItem value="affiliate">Affiliate / Tippgeber</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clientBaseSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Anzahl B2B Kunden</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Bitte wählen" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-10">1 - 10</SelectItem>
                            <SelectItem value="11-50">11 - 50</SelectItem>
                            <SelectItem value="51-200">51 - 200</SelectItem>
                            <SelectItem value="200+">200+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nachricht (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Erzählen Sie uns kurz von Ihren Plänen..." 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-primary text-white font-bold py-6 text-lg shadow-lg hover:bg-primary/90">
                  Jetzt Bewerben
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper component for the phone icon in the CTA
function Phone({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

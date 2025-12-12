import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { NeonButton } from "@/components/ui/NeonButton";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  phone: z.string().min(6, "Telefonnummer ist erforderlich"),
  company: z.string().optional(),
  message: z.string().min(10, "Nachricht muss mindestens 10 Zeichen lang sein"),
  privacy: z.boolean().refine(val => val === true, "Bitte akzeptieren Sie die Datenschutzerklärung"),
});

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      privacy: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("form-name", "contact");
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => {
        toast.success("Vielen Dank für Ihre Nachricht! Wir melden uns in Kürze.");
        form.reset();
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        toast.error("Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.");
      });
  }

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-deep-space text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.03] bg-repeat" />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse-slow mix-blend-screen" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-white/10 text-white border-white/20 mb-6 hover:bg-white/20">Kontakt</Badge>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
            Sprechen wir über <br />
            <span className="text-neon-cyan">Ihre Zukunft.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Haben Sie Fragen zu Lina oder möchten Sie das System live erleben? 
            Wir sind für Sie da – persönlich und direkt.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass-card border-white/10 bg-deep-navy/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  Telefon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">Rufen Sie uns an oder lassen Sie sich von Lina beraten.</p>
                <a href="tel:+491715060008" className="text-xl font-bold text-white hover:text-neon-cyan transition-colors block">
                  +49 171 5060008
                </a>
                <p className="text-sm text-gray-500 mt-2">Mo-Fr, 09:00 - 18:00 Uhr</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10 bg-deep-navy/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-secondary" />
                  </div>
                  E-Mail
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">Schreiben Sie uns eine E-Mail. Wir antworten innerhalb von 24 Stunden.</p>
                <a href="mailto:info@lr-lifestyle.info" className="text-lg font-bold text-white hover:text-neon-cyan transition-colors block">
                  info@lr-lifestyle.info
                </a>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10 bg-deep-navy/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-green-500" />
                  </div>
                  WhatsApp Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">Nutzen Sie den WhatsApp-Button unten rechts, um direkt mit uns zu chatten.</p>
                <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  System Online
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-white/10 bg-deep-navy/50 backdrop-blur-xl h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  {isSubmitted ? "Nachricht gesendet" : "Nachricht senden"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Vielen Dank!</h3>
                    <p className="text-gray-400 max-w-md mb-8">
                      Ihre Nachricht wurde erfolgreich an uns übermittelt. Wir werden uns so schnell wie möglich bei Ihnen melden.
                    </p>
                    <NeonButton onClick={() => setIsSubmitted(false)} variant="secondary">
                      Neue Nachricht schreiben
                    </NeonButton>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" name="contact" data-netlify="true">
                      <input type="hidden" name="form-name" value="contact" />
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Ihr Name" {...field} className="bg-white/5 border-white/10 text-white focus:border-neon-cyan/50" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Firma (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Ihre Firma" {...field} className="bg-white/5 border-white/10 text-white focus:border-neon-cyan/50" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">E-Mail *</FormLabel>
                              <FormControl>
                                <Input placeholder="ihre@email.de" {...field} className="bg-white/5 border-white/10 text-white focus:border-neon-cyan/50" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Telefon *</FormLabel>
                              <FormControl>
                                <Input placeholder="+49 ..." {...field} className="bg-white/5 border-white/10 text-white focus:border-neon-cyan/50" />
                              </FormControl>
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
                            <FormLabel className="text-gray-300">Nachricht *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Wie können wir Ihnen helfen?" 
                                className="resize-none min-h-[150px] bg-white/5 border-white/10 text-white focus:border-neon-cyan/50" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="privacy"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border border-white/5 bg-white/5">
                            <FormControl>
                              <input 
                                type="checkbox" 
                                checked={field.value} 
                                onChange={field.onChange}
                                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-gray-300">
                                Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten zur Bearbeitung der Anfrage zu (Details in der Datenschutzerklärung).
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />

                      <NeonButton type="submit" className="w-full justify-center">
                        <Send className="w-5 h-5 mr-2" />
                        Nachricht senden
                      </NeonButton>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

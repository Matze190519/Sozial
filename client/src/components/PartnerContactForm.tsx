import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Send, ExternalLink, Play } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  firstName: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  whatsappNumber: z.string().min(6, "Bitte eine gültige Nummer eingeben"),
  role: z.enum(["Unternehmer", "LR Partner", "Interessent"]),
  interest: z.enum(["LINA Voice", "Partnerweg", "Beides"]),
  message: z.string().optional(),
  privacy: z.boolean().refine((val) => val === true, {
    message: "Du musst der Datenschutzerklärung zustimmen",
  }),
});

export default function PartnerContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      whatsappNumber: "",
      message: "",
      privacy: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Encode form data for Netlify
      const encode = (data: any) => {
        return Object.keys(data)
          .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
          .join("&");
      };

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "partner-contact", ...values }),
      });

      setIsSuccess(true);
      toast.success("Anfrage erfolgreich gesendet!");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Fehler beim Senden. Bitte versuche es später erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="bg-card/50 border-primary/20 max-w-2xl mx-auto animate-in fade-in zoom-in duration-500">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-white">Vielen Dank!</CardTitle>
          <CardDescription className="text-lg">
            Deine Anfrage ist bei uns eingegangen. Wir melden uns zeitnah per WhatsApp bei dir.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <div className="text-center space-y-2">
            <p className="text-white font-medium">In der Zwischenzeit:</p>
            <p className="text-muted-foreground">Schau dir jetzt die Details zur Partnerschaft an.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://dein-lr-business.de/presentation.html#folie_01" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white">
                <ExternalLink className="mr-2 w-4 h-4" />
                Jetzt Präsentation anschauen
              </Button>
            </a>
            
            <a 
              href="https://youtu.be/N-soKAiyjsA?si=hgXTIzLd9KB4lxqj" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
                <Play className="mr-2 w-4 h-4 fill-current" />
                Video ansehen
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/30 border-white/5 max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Partner-Info anfordern</CardTitle>
        <CardDescription className="text-center">
          Fülle das Formular aus, um weitere Informationen zum Partnerweg oder LINA Voice zu erhalten.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-6"
            name="partner-contact"
            data-netlify="true"
          >
            <input type="hidden" name="form-name" value="partner-contact" />
            
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vorname</FormLabel>
                    <FormControl>
                      <Input placeholder="Max" {...field} className="bg-black/20 border-white/10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="whatsappNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Nummer</FormLabel>
                    <FormControl>
                      <Input placeholder="+49 170 12345678" {...field} className="bg-black/20 border-white/10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aktuelle Rolle</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-black/20 border-white/10">
                          <SelectValue placeholder="Bitte wählen" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Unternehmer">Unternehmer</SelectItem>
                        <SelectItem value="LR Partner">LR Partner</SelectItem>
                        <SelectItem value="Interessent">Interessent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interesse an</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-black/20 border-white/10">
                          <SelectValue placeholder="Bitte wählen" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="LINA Voice">LINA Voice (Produkt)</SelectItem>
                        <SelectItem value="Partnerweg">Partnerweg (Business)</SelectItem>
                        <SelectItem value="Beides">Beides</SelectItem>
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
                      placeholder="Deine Fragen oder Anmerkungen..." 
                      className="bg-black/20 border-white/10 min-h-[100px]" 
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
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-white/5 p-4 bg-black/20">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Datenschutz akzeptieren
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Ich stimme zu, dass meine Daten zur Kontaktaufnahme gespeichert werden.
                    </p>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Wird gesendet...
                </>
              ) : (
                "Jetzt anfragen"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

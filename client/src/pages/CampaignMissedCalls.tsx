import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Phone, Calendar, Clock, Shield } from "lucide-react";
import { Link } from "wouter";

export default function CampaignMissedCalls() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-deep-space pt-20">
        {/* Background Gradient & Image Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-deep-space/90 via-deep-space/80 to-deep-space z-10" />
          <img 
            src="/images/campaigns/ad_c1_handwerker_2.png" 
            alt="Handwerker bei der Arbeit" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="container relative z-20 px-4 md:px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan text-sm font-medium animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-cyan"></span>
              </span>
              Nie wieder "Besetzt"
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Nie wieder einen <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-blue-500">
                Anruf verpassen.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto md:mx-0">
              Wie viele Kunden verlieren Sie durch "Besetzt"? LINA Voice sichert Ihre Leads – rund um die Uhr, intelligent und vollautomatisch.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Link href="/contact">
                <Button size="lg" className="bg-electric-cyan text-deep-space hover:bg-electric-cyan/90 font-bold text-lg px-8 h-14 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                  Jetzt Demo hören
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 h-14 px-8">
                  Preise ansehen
                </Button>
              </Link>
            </div>
            
            <p className="text-xs text-gray-500 pt-2">
              * KI-Assistenz. Funktionen je nach Setup. Einrichtung durch IT-Experten.
            </p>
          </div>

          {/* Hero Visual - Glass Card */}
          <div className="flex-1 w-full max-w-md md:max-w-lg relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-electric-cyan to-blue-600 rounded-2xl blur opacity-30 animate-pulse" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-electric-cyan/20 flex items-center justify-center text-electric-cyan">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Anruf eingehend</div>
                    <div className="text-xs text-electric-cyan">LINA Voice aktiv</div>
                  </div>
                </div>
                <div className="text-white/60 text-sm">Gerade eben</div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                  <div className="text-xs text-gray-400 mb-1">Anrufer</div>
                  <div className="text-white font-medium">Neukunde Müller</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                  <div className="text-xs text-gray-400 mb-1">Anliegen</div>
                  <div className="text-white">Terminanfrage für Beratung</div>
                </div>
                <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20 flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="h-3 w-3 text-black" />
                  </div>
                  <div className="text-green-400 font-medium">Termin gebucht: Mo, 14:00</div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <img 
              src="/images/campaigns/reel1_kf5_success.png" 
              alt="Success Notification" 
              className="absolute -bottom-10 -right-10 w-32 md:w-48 rounded-xl shadow-2xl border border-white/20 hidden md:block"
            />
          </div>
        </div>
      </section>

      {/* Problem / Solution Section */}
      <section className="py-24 bg-black relative">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="absolute -inset-4 bg-electric-cyan/20 rounded-full blur-3xl opacity-20" />
              <img 
                src="/images/campaigns/reel1_kf1_missed_call.png" 
                alt="Verpasster Anruf" 
                className="relative rounded-2xl shadow-2xl border border-white/10 w-full max-w-md mx-auto"
              />
            </div>
            <div className="order-1 md:order-2 space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Klingelt Ihr Telefon, wenn Sie <span className="text-electric-cyan">keine Zeit</span> haben?
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Jeder verpasste Anruf ist ein verpasster Auftrag. Während Sie auf der Baustelle sind, im Meeting sitzen oder einfach Ihren Feierabend genießen, versuchen Kunden Sie zu erreichen.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                    <Phone className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg">Das Problem</h3>
                    <p className="text-gray-400">Anrufbeantworter werden oft wegdrückt. Kunden rufen beim nächsten Anbieter an.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-lg bg-electric-cyan/20 flex items-center justify-center shrink-0 mt-1">
                    <Check className="h-4 w-4 text-electric-cyan" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg">Die Lösung</h3>
                    <p className="text-gray-400">LINA geht ran. Sofort. Freundlich. Und bucht den Termin direkt in Ihren Kalender.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-deep-space border-t border-white/5">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ihr bester Mitarbeiter arbeitet <span className="text-electric-cyan">24/7</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Kein Callcenter, sondern intelligente KI. LINA Voice lernt Ihr Business und entlastet Ihr Team spürbar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 hover:border-electric-cyan/50 transition-colors duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-electric-cyan/10 flex items-center justify-center text-electric-cyan mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Rund um die Uhr</h3>
                <p className="text-gray-400">
                  Egal ob Sonntagabend oder Feiertag. LINA nimmt jeden Anruf an und sichert Ihnen den Lead.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:border-electric-cyan/50 transition-colors duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-electric-cyan/10 flex items-center justify-center text-electric-cyan mb-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Terminbuchung</h3>
                <p className="text-gray-400">
                  LINA greift auf Ihren Kalender zu und vereinbart Termine nur dann, wenn Sie wirklich Zeit haben.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:border-electric-cyan/50 transition-colors duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-electric-cyan/10 flex items-center justify-center text-electric-cyan mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">IT-Service Inklusive</h3>
                <p className="text-gray-400">
                  Wir richten alles für Sie ein. Keine komplizierte Technik, keine Kopfschmerzen. Einfach loslegen.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/10 to-blue-600/10" />
        <div className="container px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Bereit für das nächste Level?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Testen Sie LINA Voice jetzt unverbindlich. Hören Sie sich eine Demo an oder sprechen Sie direkt mit uns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-electric-cyan text-deep-space hover:bg-electric-cyan/90 font-bold text-lg px-10 h-16 shadow-lg shadow-electric-cyan/20">
                Setup anfragen
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 h-16 px-10">
                Demo anhören
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

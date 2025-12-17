import { useState, useEffect } from 'react';
import { AvatarLisa } from '@/components/AvatarLisa';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bot,
  Smartphone,
  Rocket,
  Users,
  Video,
  Presentation,
  Car,
  ExternalLink,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle2,
  Lock,
  Trophy,
} from 'lucide-react';

// LocalStorage key
const PROGRESS_KEY = 'lr_onboarding_progress';

export default function Home() {
  // Load progress from LocalStorage
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    const saved = localStorage.getItem(PROGRESS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Save progress to LocalStorage
  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(completedSteps));
  }, [completedSteps]);

  // Mark step as completed
  const completeStep = (stepNumber: number) => {
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
  };

  // Get step status
  const isStepCompleted = (stepNumber: number) => completedSteps.includes(stepNumber);
  const isStepLocked = (stepNumber: number) => {
    if (stepNumber === 1) return false;
    return !completedSteps.includes(stepNumber - 1);
  };

  const currentStep = completedSteps.length;
  const totalSteps = 10;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#D4AF37]/30">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-white/5 rounded-full blur-[150px]" />
      </div>

      {/* Progress Bar - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold text-sm">Dein Fortschritt</span>
            <span className="text-white/80 text-sm">{currentStep} / {totalSteps} Schritte</span>
          </div>
          <div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container max-w-4xl mx-auto px-4 py-8 pt-32 pb-24 space-y-8">
        
        {/* Header Logo */}
        <div className="flex justify-center mb-4">
          <img 
            src="/lr_lifestyle_logo_freigestellt_small(1).png" 
            alt="LR Lifestyle Team" 
            className="h-24 w-auto"
            style={{ filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.4))' }}
          />
        </div>

        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-heading font-bold tracking-tight">
              <span className="text-white">Willkommen im</span>
              <br />
              <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] bg-clip-text text-transparent">
                LR Lifestyle Team
              </span>
            </h1>
            <p className="text-lg text-white/80">Hier findest du alles, was du für deinen Start brauchst.</p>
          </div>

          {/* Achievement Badge */}
          {currentStep > 0 && (
            <div className="inline-flex items-center gap-2 bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#AA771C] px-6 py-3 rounded-full">
              <Trophy className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">
                {currentStep} von {totalSteps} Schritten abgeschlossen!
              </span>
            </div>
          )}

          {/* Profile Card */}
          <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(255,255,255,0.3)]">
            <CardContent className="p-6 flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img 
                    src="/pasted_file_9CpZcv_image.png" 
                    alt="Mathias Vinzing" 
                    className="w-full h-full object-cover"
                    style={{ boxShadow: '0 0 40px rgba(255, 255, 255, 0.3)' }}
                  />
                </div>
              </div>
              <div className="text-center space-y-1">
                <h2 className="text-xl font-bold text-white">Mathias Vinzing</h2>
                <p className="text-sm text-[#BF953F] font-medium tracking-wide uppercase">PLATIN ORGALEITER</p>
                <p className="text-white/80 text-sm max-w-md">
                  Ich begleite dich durch dein Onboarding. Folge einfach den Schritten unten – Schritt für Schritt.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm justify-center">
                <a href="tel:+4917150600008" className="flex items-center gap-2 text-[#BF953F] hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+49 171 506 0008</span>
                </a>
                <a href="mailto:info@lr-lifestyle.info" className="flex items-center gap-2 text-[#BF953F] hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>info@lr-lifestyle.info</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Onboarding Steps */}
        <div className="space-y-6">
          
          {/* Step 1: Lina */}
          <StepCard
            stepNumber={1}
            title="Lina – Deine KI-Assistentin"
            description="Lina ist deine persönliche Helferin für alle Fragen rund um LR."
            icon={<Bot className="w-7 h-7" />}
            isCompleted={isStepCompleted(1)}
            isLocked={isStepLocked(1)}
            onComplete={() => completeStep(1)}
          >
            <ul className="space-y-2 text-white/80 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#BF953F] mt-1">•</span>
                <span>OnlineShop einrichten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#BF953F] mt-1">•</span>
                <span>Produktfragen beantworten (kennt alle Produkte & Preise)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#BF953F] mt-1">•</span>
                <span>Teamaufbau & Namensliste erstellen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#BF953F] mt-1">•</span>
                <span>Social Media Texte & Ideen generieren</span>
              </li>
            </ul>
            <Button
              className="w-full mt-4 bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#AA771C] text-white hover:shadow-[0_0_30px_rgba(191,149,63,0.5)]"
              onClick={() => window.open('https://api.whatsapp.com/send?phone=4915207962638', '_blank')}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Lina starten (WhatsApp)
            </Button>
          </StepCard>

          {/* Step 2: LR Connect App */}
          <StepCard
            stepNumber={2}
            title="LR Connect – Deine LR App"
            description="Lade dir die App runter. Du brauchst sie für deine Umsätze, Bestellungen und viele Infos auf einen Blick."
            icon={<Smartphone className="w-7 h-7" />}
            isCompleted={isStepCompleted(2)}
            isLocked={isStepLocked(2)}
            onComplete={() => completeStep(2)}
          >
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="border-[#BF953F]/50 text-white hover:bg-white/10"
                onClick={() => window.open('https://apps.apple.com/de/app/lr-connect/id1510357433', '_blank')}
              >
                App Store
              </Button>
              <Button
                variant="outline"
                className="border-[#BF953F]/50 text-white hover:bg-white/10"
                onClick={() => window.open('https://play.google.com/store/apps/details?id=com.lr.dpf', '_blank')}
              >
                Google Play
              </Button>
            </div>
          </StepCard>

          {/* Step 3: Dein Start */}
          <StepCard
            stepNumber={3}
            title="Dein Start – die ersten Tage"
            description="Das hier ist der Anfang deines Geschäfts. Es geht nicht darum, sofort alles perfekt zu können."
            icon={<Rocket className="w-7 h-7" />}
            isCompleted={isStepCompleted(3)}
            isLocked={isStepLocked(3)}
            onComplete={() => completeStep(3)}
          >
            <ul className="space-y-2 text-white/80 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#BF953F] font-bold">1.</span>
                <span>Ein Starterwebinar besuchen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#BF953F] font-bold">2.</span>
                <span>Die ersten Kunden finden</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#BF953F] font-bold">3.</span>
                <span>Erste Partner gewinnen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#BF953F] font-bold">4.</span>
                <span>Gespräche führen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#BF953F] font-bold">5.</span>
                <span>Deinen eigenen Weg zur Duplikation finden</span>
              </li>
            </ul>
          </StepCard>

          {/* Step 4: Startplan */}
          <StepCard
            stepNumber={4}
            title="Dein Startplan – die ersten 60 Minuten"
            description="Drei einfache Schritte, um direkt loszulegen."
            icon={<Bot className="w-7 h-7" />}
            isCompleted={isStepCompleted(4)}
            isLocked={isStepLocked(4)}
            onComplete={() => completeStep(4)}
          >
            <div className="space-y-3">
              <div className="bg-white/5 rounded-xl p-3">
                <h4 className="text-[#BF953F] font-semibold text-sm mb-1">1. OnlineShop einrichten (20 Min)</h4>
                <p className="text-white/80 text-xs">Lina hilft dir dabei.</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <h4 className="text-[#BF953F] font-semibold text-sm mb-1">2. Produkte bestellen (15 Min)</h4>
                <p className="text-white/80 text-xs">Wähle 2-3 Produkte aus.</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <h4 className="text-[#BF953F] font-semibold text-sm mb-1">3. Namensliste schreiben (25 Min)</h4>
                <p className="text-white/80 text-xs">Schreib 50-100 Namen auf.</p>
              </div>
            </div>
          </StepCard>

          {/* Step 5: LR Neo */}
          <StepCard
            stepNumber={5}
            title="LR Neo / MyOffice"
            description="Hier siehst du deine Zahlen, Umsätze, Team-Struktur und alle wichtigen Infos."
            icon={<Users className="w-7 h-7" />}
            isCompleted={isStepCompleted(5)}
            isLocked={isStepLocked(5)}
            onComplete={() => completeStep(5)}
          >
            <Button
              variant="outline"
              className="w-full border-[#BF953F]/50 text-white hover:bg-white/10"
              onClick={() => window.open('https://myoffice.lrworld.com/', '_blank')}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              LR Neo / MyOffice öffnen
            </Button>
          </StepCard>

          {/* Step 6: Starterwebinar */}
          <StepCard
            stepNumber={6}
            title="Starterwebinar"
            description="Jeden Dienstag, 20:00 Uhr – hier lernst du die Grundlagen."
            icon={<Video className="w-7 h-7" />}
            isCompleted={isStepCompleted(6)}
            isLocked={isStepLocked(6)}
            onComplete={() => completeStep(6)}
          >
            <p className="text-white/80 text-sm mb-4">
              Hier siehst du wie das Geschäftsmodell funktioniert, wie du Kunden gewinnst und dein Team aufbaust.
            </p>
          </StepCard>

          {/* Step 7: Geschäftsvorstellung */}
          <StepCard
            stepNumber={7}
            title="Geschäftsvorstellung"
            description="Das ist dein Closer. Zeig sie Interessenten oder live per Zoom."
            icon={<Presentation className="w-7 h-7" />}
            isCompleted={isStepCompleted(7)}
            isLocked={isStepLocked(7)}
            onComplete={() => completeStep(7)}
          >
            <Button
              variant="outline"
              className="w-full border-[#BF953F]/50 text-white hover:bg-white/10"
              onClick={() => window.open('https://dein-lr-business.de/', '_blank')}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Präsentation öffnen
            </Button>
          </StepCard>

          {/* Step 8: KI-Voice */}
          <StepCard
            stepNumber={8}
            title="Unternehmer-Tool: KI-Voice"
            description="Dein persönlicher Team-Link für automatisierte Registrierungen."
            icon={<Bot className="w-7 h-7" />}
            isCompleted={isStepCompleted(8)}
            isLocked={isStepLocked(8)}
            onComplete={() => completeStep(8)}
          >
            <Button
              className="w-full bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#AA771C] text-white hover:shadow-[0_0_30px_rgba(191,149,63,0.5)]"
              onClick={() => window.open('https://ki-voice.net/team-link', '_blank')}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Team-Link erstellen
            </Button>
          </StepCard>

          {/* Step 9: Fast-Track */}
          <StepCard
            stepNumber={9}
            title="Unser gemeinsames Ziel"
            description="Die ersten 1-2 Wochen: Junior Manager & Auto-Konzept."
            icon={<Car className="w-7 h-7" />}
            isCompleted={isStepCompleted(9)}
            isLocked={isStepLocked(9)}
            onComplete={() => completeStep(9)}
          >
            <p className="text-white/80 text-sm">
              Ab Junior Manager sofort Zugriff auf das unschlagbare LR Autokonzept – bestelle dir direkt dein Traumauto 70-80% günstiger.
            </p>
          </StepCard>

          {/* Step 10: Wichtige Infos */}
          <StepCard
            stepNumber={10}
            title="Wichtige Infos & Seiten"
            description="Teammeeting alle 2 Wochen + Info-Seite für Interessenten."
            icon={<Users className="w-7 h-7" />}
            isCompleted={isStepCompleted(10)}
            isLocked={isStepLocked(10)}
            onComplete={() => completeStep(10)}
          >
            <Button
              variant="outline"
              className="w-full border-[#BF953F]/50 text-white hover:bg-white/10"
              onClick={() => window.open('https://lr-lifestyle.pro', '_blank')}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              lr-lifestyle.pro
            </Button>
          </StepCard>
        </div>

        {/* Completion Message */}
        {currentStep === totalSteps && (
          <div className="text-center mt-16">
            <div className="bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#AA771C] rounded-2xl p-8 shadow-[0_0_60px_rgba(191,149,63,0.5)]">
              <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">
                🎉 Glückwunsch! Du hast alle Schritte abgeschlossen!
              </h2>
              <p className="text-white/90 text-lg mb-6">
                Du bist jetzt bereit, dein LR Business zu starten. Viel Erfolg! 🚀
              </p>
              <Button
                className="bg-white text-[#BF953F] hover:bg-white/90 font-bold px-8 py-3"
                onClick={() => {
                  setCompletedSteps([]);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Fortschritt zurücksetzen
              </Button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/10 text-center">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <a href="/impressum" className="text-white/60 hover:text-white transition-colors text-sm">
              Impressum
            </a>
            <a href="/datenschutz" className="text-white/60 hover:text-white transition-colors text-sm">
              Datenschutz
            </a>
          </div>
          <p className="text-white/40 text-sm">
            © 2024 LR Lifestyle Team. Alle Rechte vorbehalten.
          </p>
        </footer>
      </div>

      {/* Avatar Lisa - Floating Chat */}
      <AvatarLisa />
    </div>
  );
}

// StepCard Component
interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isCompleted: boolean;
  isLocked: boolean;
  onComplete: () => void;
}

function StepCard({
  stepNumber,
  title,
  description,
  icon,
  children,
  isCompleted,
  isLocked,
  onComplete,
}: StepCardProps) {
  return (
    <div
      className={`relative bg-white/5 backdrop-blur-sm rounded-2xl border transition-all duration-300 ${
        isLocked
          ? 'border-white/10 opacity-50'
          : isCompleted
          ? 'border-[#BF953F]/50 shadow-[0_20px_60px_-15px_rgba(191,149,63,0.3)]'
          : 'border-white/20 shadow-[0_20px_60px_-15px_rgba(255,255,255,0.3)]'
      }`}
    >
      {/* Lock Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
          <div className="text-center">
            <Lock className="w-12 h-12 text-white/60 mx-auto mb-2" />
            <p className="text-white/60 text-sm">
              Schließe erst Schritt {stepNumber - 1} ab
            </p>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Icon */}
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
              isCompleted
                ? 'bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#AA771C] shadow-[0_0_20px_rgba(191,149,63,0.5)]'
                : 'bg-white/10 border-2 border-[#BF953F]'
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-7 h-7 text-white" />
            ) : (
              <div className="text-[#BF953F]">{icon}</div>
            )}
          </div>

          {/* Title & Description */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-sm font-semibold ${isCompleted ? 'text-[#BF953F]' : 'text-white/60'}`}>
                Schritt {stepNumber}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#AA771C] bg-clip-text text-transparent">
              {title}
            </h3>
            <p className="text-white/80 text-sm">{description}</p>
          </div>

          {/* Status Badge */}
          <div>
            {isCompleted && (
              <div className="flex items-center gap-1 text-[#BF953F] text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                Erledigt
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {!isLocked && <div className="mt-4">{children}</div>}

        {/* Complete Button */}
        {!isCompleted && !isLocked && (
          <button
            onClick={onComplete}
            className="mt-4 w-full bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#AA771C] text-white font-semibold py-3 px-6 rounded-full hover:shadow-[0_0_30px_rgba(191,149,63,0.5)] transition-all duration-300"
          >
            Als erledigt markieren
          </button>
        )}
      </div>
    </div>
  );
}

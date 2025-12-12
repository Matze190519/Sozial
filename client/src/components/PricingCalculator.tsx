import { useState } from 'react';
import { Slider } from './ui/slider';
import { motion } from 'framer-motion';

export default function PricingCalculator() {
  const [minutes, setMinutes] = useState(100);

  const ultravoxCost = minutes * 0.05; // $0.05 per minute
  const phoneCost = minutes * 0.015; // ~$0.015 per minute
  const linaCost = minutes * 0.20; // €0.20 per minute

  // Exchange rate approximation: 1 USD = 0.92 EUR
  const exchangeRate = 0.92;
  const ultravoxEur = ultravoxCost * exchangeRate;
  const phoneEur = phoneCost * exchangeRate;
  
  const totalEur = ultravoxEur + phoneEur + linaCost;

  return (
    <div className="glass-card p-8 rounded-2xl border border-neon-cyan/30 bg-deep-navy/50 max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-white mb-8 text-center">
        Kostenrechner: Was kostet LINA im Monat?
      </h3>

      <div className="mb-10">
        <div className="flex justify-between text-gray-300 mb-4">
          <span className="font-medium">Gesprächsminuten pro Monat</span>
          <span className="text-neon-cyan font-bold text-xl">{minutes} Min.</span>
        </div>
        <Slider
          defaultValue={[100]}
          max={1000}
          step={10}
          value={[minutes]}
          onValueChange={(vals) => setMinutes(vals[0])}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>0 Min.</span>
          <span>500 Min.</span>
          <span>1000 Min.</span>
        </div>
      </div>

      <div className="space-y-4 text-gray-300 mb-8 bg-black/20 p-6 rounded-xl border border-white/5">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <span className="text-sm">Ultravox ({minutes} Min × 0,05 $)</span>
          <span className="font-mono">≈ {ultravoxEur.toFixed(2).replace('.', ',')} €</span>
        </div>
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <span className="text-sm">Telefondienstleister ({minutes} Min × ~0,015 $)</span>
          <span className="font-mono">≈ {phoneEur.toFixed(2).replace('.', ',')} €</span>
        </div>
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <span className="text-sm">LINA Voice Service ({minutes} Min × 0,20 €)</span>
          <span className="font-mono">= {linaCost.toFixed(2).replace('.', ',')} €</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="font-bold text-white">Gesamtkosten (geschätzt)</span>
          <motion.span 
            key={totalEur}
            initial={{ scale: 1.2, color: '#fff' }}
            animate={{ scale: 1, color: '#06b6d4' }}
            className="font-bold text-2xl text-neon-cyan font-mono"
          >
            ≈ {totalEur.toFixed(2).replace('.', ',')} €
          </motion.span>
        </div>
      </div>

      <p className="text-center text-xs text-gray-500 italic">
        *Preise zzgl. MwSt. Die Umrechnung von USD in EUR erfolgt zum aktuellen Tageskurs (hier ca. 0,92). 
        Tatsächliche Kosten hängen vom gewählten Telefondienstleister und Wechselkursen ab.
      </p>
    </div>
  );
}

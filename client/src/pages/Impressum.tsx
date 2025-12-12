import React from 'react';
import { motion } from 'framer-motion';


export default function Impressum() {
  return (
    <>
      <div className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-12">Impressum</h1>
          
          <div className="space-y-8 text-gray-300 font-light leading-relaxed">
            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4">Angaben gemäß § 5 DDG</h2>
              
              <div className="glass-card p-6 rounded-xl border border-white/10 bg-black/20">
                <h3 className="text-xl font-bold text-white mb-4">Anbieter</h3>
                <p className="mb-2"><strong>Online Network Vision S.L.</strong></p>
                <p className="mb-2">NIF: B55478382</p>
                <p className="mb-2">Vertreten durch: Mathias Vinzing</p>
                <p>Anschrift: Calle Mare de Déu de Consolació 33 B, 07660 Santanyí (Illes Balears), Spanien</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Kontakt</h3>
              <p className="mb-2">Telefon: <a href="tel:+491715060008" className="text-neon-cyan hover:underline">+49 171 5060008</a></p>
              <p>E-Mail: <a href="mailto:info@lr-lifestyle.info" className="text-neon-cyan hover:underline">info@lr-lifestyle.info</a></p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Hinweis zur Unabhängigkeit</h3>
              <p>Diese Website wird von selbständigen Partnern betrieben und ist keine offizielle Website der LR Health & Beauty SE & Co. KG.</p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">EU-Streitschlichtung (ODR)</h3>
              <p className="mb-4">Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:</p>
              <p className="mb-4"><a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline">https://ec.europa.eu/consumers/odr/</a></p>
              <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h3>
              <p>Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </>
  );
}

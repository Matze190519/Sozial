import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useContacts } from '../context/ContactContext';

const ContactSearch = () => {
  const { searchContacts, loading } = useContacts();
  const [searchParams, setSearchParams] = useState({
    industry: 'Automotive',
    position: 'Geschäftsführer / CEO',
    company_size: '1000 - 5000 Mitarbeiter',
    count: 50,
    location: 'Deutschland'
  });

  const industries = [
    'Automotive',
    'Maschinenbau',
    'Chemie',
    'Pharma',
    'IT/Software',
    'Einzelhandel',
    'Logistik',
    'Finanzdienstleistungen',
    'Immobilien',
    'Gesundheitswesen'
  ];

  const positions = [
    'Geschäftsführer / CEO',
    'Vorstand',
    'Direktor',
    'Bereichsleiter',
    'Abteilungsleiter',
    'Marketing Leiter',
    'Vertriebsleiter',
    'Einkaufsleiter'
  ];

  const companySizes = [
    '1 - 50 Mitarbeiter',
    '51 - 200 Mitarbeiter',
    '201 - 1000 Mitarbeiter',
    '1000 - 5000 Mitarbeiter',
    '5000+ Mitarbeiter'
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    await searchContacts(searchParams);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500">
      <div className="p-8">
        <div className="flex items-center mb-8">
          <div className="mr-4 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-inner">
            <Search className="h-7 w-7 text-purple-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent mb-2">
              Neue Kontakte finden
            </h2>
            <p className="text-slate-600 font-medium text-lg">
              Tagesaktuelle Entscheider-Recherche
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Branche
              </label>
              <select
                value={searchParams.industry}
                onChange={(e) => setSearchParams({ ...searchParams, industry: e.target.value })}
                className="w-full p-4 rounded-xl border border-gray-200/50 text-gray-800 font-medium focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/60 backdrop-blur-sm hover:bg-white/80 shadow-sm"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Position
              </label>
              <select
                value={searchParams.position}
                onChange={(e) => setSearchParams({ ...searchParams, position: e.target.value })}
                className="w-full p-4 rounded-xl border border-gray-200/50 text-gray-800 font-medium focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/60 backdrop-blur-sm hover:bg-white/80 shadow-sm"
              >
                {positions.map(position => (
                  <option key={position} value={position}>{position}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Firmengröße
              </label>
              <select
                value={searchParams.company_size}
                onChange={(e) => setSearchParams({ ...searchParams, company_size: e.target.value })}
                className="w-full p-4 rounded-xl border border-gray-200/50 text-gray-800 font-medium focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/60 backdrop-blur-sm hover:bg-white/80 shadow-sm"
              >
                {companySizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Anzahl Kontakte
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={searchParams.count}
                onChange={(e) => setSearchParams({ ...searchParams, count: parseInt(e.target.value) })}
                className="w-full p-4 rounded-xl border border-gray-200/50 text-gray-800 font-medium focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/60 backdrop-blur-sm hover:bg-white/80 shadow-sm"
                placeholder="z.B. 50"
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 hover:from-purple-700 hover:via-blue-700 hover:to-purple-800 text-white py-6 px-8 rounded-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-[1.02] hover:-translate-y-1"
            >
              {loading ? (
                <>
                  <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                  <span className="animate-pulse">Suche aktuelle Kontakte...</span>
                </>
              ) : (
                <>
                  <Search className="h-6 w-6 mr-3" />
                  <span>Kontakte finden</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-slate-500 font-medium">
              Intelligente Recherche für aktuelle Entscheider
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactSearch;

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
    <div className="card-enhanced animate-fade-in">
      <div className="p-8">
        <div className="flex items-center mb-6">
          <div className="relative mr-3">
            <Search className="h-6 w-6 text-purple-600 float" />
            <div className="absolute inset-0 h-6 w-6 bg-purple-400 opacity-30 rounded-full blur-lg"></div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Neue Kontakte finden
            </h2>
            <p className="text-sm text-gray-600 font-medium">
              Tagesaktuelle Entscheider-Recherche
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🏭 Branche
              </label>
              <select
                value={searchParams.industry}
                onChange={(e) => setSearchParams({ ...searchParams, industry: e.target.value })}
                className="input-enhanced w-full p-4 rounded-xl text-gray-800 font-medium shadow-sm"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                👔 Position
              </label>
              <select
                value={searchParams.position}
                onChange={(e) => setSearchParams({ ...searchParams, position: e.target.value })}
                className="input-enhanced w-full p-4 rounded-xl text-gray-800 font-medium shadow-sm"
              >
                {positions.map(position => (
                  <option key={position} value={position}>{position}</option>
                ))}
              </select>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🏢 Firmengröße
              </label>
              <select
                value={searchParams.company_size}
                onChange={(e) => setSearchParams({ ...searchParams, company_size: e.target.value })}
                className="input-enhanced w-full p-4 rounded-xl text-gray-800 font-medium shadow-sm"
              >
                {companySizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🎯 Anzahl Kontakte
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={searchParams.count}
                onChange={(e) => setSearchParams({ ...searchParams, count: parseInt(e.target.value) })}
                className="input-enhanced w-full p-4 rounded-xl text-gray-800 font-medium shadow-sm"
                placeholder="z.B. 50"
              />
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-white py-4 px-8 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 transform hover:scale-105"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                  <span className="animate-pulse">Generiere tagesaktuelle Leads...</span>
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-3" />
                  <span>🚀 Kontakte finden</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center text-sm text-gray-500 animate-fade-in">
            <p className="flex items-center justify-center space-x-2">
              <span>✨</span>
              <span>KI-gestützte Recherche für aktuelle Entscheider</span>
              <span>✨</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactSearch;

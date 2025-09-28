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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-50 hover:shadow-xl transition-all duration-300">
      <div className="p-8">
        <div className="flex items-center mb-8">
          <div className="mr-4 p-3 bg-blue-50 rounded-xl">
            <Search className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Neue Kontakte finden
            </h2>
            <p className="text-gray-600 font-medium">
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
                className="w-full p-4 rounded-xl border border-gray-200 text-gray-800 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
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
                className="w-full p-4 rounded-xl border border-gray-200 text-gray-800 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
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
                className="w-full p-4 rounded-xl border border-gray-200 text-gray-800 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
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
                className="w-full p-4 rounded-xl border border-gray-200 text-gray-800 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                placeholder="z.B. 50"
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-5 px-8 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                  <span className="animate-pulse">Suche aktuelle Kontakte...</span>
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-3" />
                  <span>Kontakte finden</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-500 font-medium">
              Intelligente Recherche für aktuelle Entscheider
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactSearch;

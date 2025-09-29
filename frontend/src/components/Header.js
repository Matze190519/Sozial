import React from 'react';
import { Home, Users, Calendar, BarChart3, Building2 } from 'lucide-react';

const Header = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'search', label: 'Neue Kontakte finden', icon: Home },
    { id: 'contacts', label: 'Kontaktliste', icon: Users },
    { id: 'board', label: 'Status Board', icon: BarChart3 },
    { id: 'appointments', label: 'Termine', icon: Calendar }
  ];

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative">
              <Building2 className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              <div className="absolute inset-0 h-8 w-8 sm:h-10 sm:w-10 bg-purple-400 opacity-20 rounded-full blur-lg"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Helfer-Finder Cockpit
              </h1>
              <p className="text-xs sm:text-sm text-white/90 font-medium">
                Entscheider finden • Kontakte verwalten • Erfolg messen
              </p>
            </div>
          </div>
          
          <nav className="flex space-x-1 sm:space-x-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`
                    flex items-center space-x-1 sm:space-x-2 px-2 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 min-h-[44px]
                    ${isActive 
                      ? 'bg-white/95 text-purple-700 shadow-lg backdrop-blur-sm' 
                      : 'text-white/90 hover:text-white hover:bg-white/20 backdrop-blur-sm'
                    }
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${isActive ? 'text-purple-600' : ''}`} />
                  <span className="text-xs sm:text-sm lg:text-base font-semibold">
                    {item.id === 'search' ? 'Suchen' : 
                     item.id === 'contacts' ? 'Kontakte' : 
                     item.id === 'board' ? 'Board' : 
                     'Termine'}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
      
      <div className="h-1 bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400 opacity-80"></div>
    </header>
  );
};

export default Header;

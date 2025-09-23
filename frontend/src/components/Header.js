import React from 'react';
import { Home, Users, Calendar, BarChart3, Sparkles } from 'lucide-react';

const Header = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'search', label: 'Neue Kontakte finden', icon: Home },
    { id: 'contacts', label: 'Kontaktliste', icon: Users },
    { id: 'board', label: 'Status Board', icon: BarChart3 },
    { id: 'appointments', label: 'Termine', icon: Calendar }
  ];

  return (
    <header className="glass animate-fade-in sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3 animate-bounce-in">
            <div className="relative">
              <Sparkles className="h-10 w-10 text-white float" />
              <div className="absolute inset-0 h-10 w-10 bg-white opacity-20 rounded-full blur-xl"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Helfer-Finder Cockpit
              </h1>
              <p className="text-sm text-white/80 font-medium">
                Entscheider finden • Kontakte verwalten • Erfolg messen
              </p>
            </div>
          </div>
          
          <nav className="flex space-x-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`
                    flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 animate-slide-up
                    ${isActive 
                      ? 'bg-white text-purple-700 shadow-lg' 
                      : 'text-white/90 hover:text-white hover:bg-white/20 backdrop-blur-sm'
                    }
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-purple-600' : ''}`} />
                  <span className="hidden lg:inline font-semibold">{item.label}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 rounded-xl blur-sm"></div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
      
      {/* Decorative gradient line */}
      <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-60"></div>
    </header>
  );
};

export default Header;

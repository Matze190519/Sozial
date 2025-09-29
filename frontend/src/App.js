import React, { useState } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Calendar } from "lucide-react";
import ContactSearch from "./components/ContactSearch";
import ContactList from "./components/ContactList";
import ContactDetail from "./components/ContactDetail";
import Header from "./components/Header";
import StatusBoard from "./components/StatusBoard";
import { ContactProvider } from "./context/ContactContext";

function App() {
  const [currentView, setCurrentView] = useState("search");
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <ContactProvider>
      <div className="App min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30">
        <BrowserRouter>
          <Header currentView={currentView} setCurrentView={setCurrentView} />
          
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={
                <div className="space-y-6">
                  {currentView === "search" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                      <div className="lg:col-span-1 order-2 lg:order-1">
                        <ContactSearch />
                      </div>
                      <div className="lg:col-span-2 order-1 lg:order-2">
                        <ContactList 
                          onContactSelect={setSelectedContact}
                          selectedContact={selectedContact}
                        />
                      </div>
                    </div>
                  )}
                  
                  {currentView === "contacts" && (
                    <ContactList 
                      onContactSelect={setSelectedContact}
                      selectedContact={selectedContact}
                      showFilters={true}
                    />
                  )}
                  
                  {currentView === "board" && (
                    <StatusBoard onContactSelect={setSelectedContact} />
                  )}
                  
                  {currentView === "appointments" && (
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
                      <div className="flex items-center mb-6">
                        <div className="p-2 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl mr-3">
                          <Calendar className="h-6 w-6 text-purple-600" />
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent">Termine</h2>
                      </div>
                      <p className="text-slate-600 font-medium">Terminübersicht wird geladen...</p>
                    </div>
                  )}
                </div>
              } />
            </Routes>
          </main>

          {selectedContact && (
            <ContactDetail
              contact={selectedContact}
              onClose={() => setSelectedContact(null)}
              onUpdate={(updatedContact) => {
                setSelectedContact(updatedContact);
              }}
            />
          )}
          
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                borderRadius: '12px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              },
            }}
          />
        </BrowserRouter>
      </div>
    </ContactProvider>
  );
}

export default App;

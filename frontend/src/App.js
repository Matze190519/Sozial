import React, { useState } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
      <div className="App min-h-screen bg-gray-50">
        <BrowserRouter>
          <Header currentView={currentView} setCurrentView={setCurrentView} />
          
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={
                <div className="space-y-6">
                  {currentView === "search" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-1">
                        <ContactSearch />
                      </div>
                      <div className="lg:col-span-2">
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
                    <div className="bg-white rounded-lg shadow p-6">
                      <h2 className="text-2xl font-bold mb-4">Termine</h2>
                      <p className="text-gray-600">Terminübersicht wird geladen...</p>
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
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </BrowserRouter>
      </div>
    </ContactProvider>
  );
}

export default App;

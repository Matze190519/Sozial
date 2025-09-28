import React, { useEffect } from 'react';
import { Phone, Mail, Building, User, Filter } from 'lucide-react';
import { useContacts } from '../context/ContactContext';

const ContactList = ({ onContactSelect, selectedContact, showFilters = false }) => {
  const { contacts, searchResults, loading, filters, setFilters, loadContacts } = useContacts();
  
  const displayContacts = searchResults.length > 0 ? searchResults : contacts;

  useEffect(() => {
    if (showFilters) {
      loadContacts(filters);
    }
  }, [filters, showFilters]);

  const getStatusColor = (status) => {
    const colors = {
      'neu': 'bg-gray-100 text-gray-800',
      'erreicht': 'bg-green-100 text-green-800',
      'nicht_erreicht': 'bg-red-100 text-red-800',
      'termin_vereinbart': 'bg-blue-100 text-blue-800',
      'wiedervorlage': 'bg-yellow-100 text-yellow-800',
      'abgeschlossen': 'bg-purple-100 text-purple-800'
    };
    return colors[status] || colors['neu'];
  };

  const getStatusLabel = (status) => {
    const labels = {
      'neu': 'Neu',
      'erreicht': 'Erreicht',
      'nicht_erreicht': 'Nicht erreicht',
      'termin_vereinbart': 'Termin vereinbart',
      'wiedervorlage': 'Wiedervorlage',
      'abgeschlossen': 'Abgeschlossen'
    };
    return labels[status] || 'Neu';
  };

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-2 text-slate-600 font-medium">Lade Kontakte...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-50 hover:shadow-xl transition-all duration-300">
      <div className="p-8 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4 p-3 bg-blue-50 rounded-xl">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {searchResults.length > 0 ? 'Suchergebnisse' : 'Alle Kontakte'}
              </h2>
              <p className="text-gray-600 font-medium">
                {displayContacts.length} Kontakte gefunden
              </p>
            </div>
          </div>
          
          {showFilters && (
            <div className="flex items-center space-x-3 animate-slide-up">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filters.status}
                onChange={(e) => setFilters({ status: e.target.value })}
                className="text-sm px-4 py-3 rounded-xl border border-gray-200 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-white transition-all duration-200"
              >
                <option value="">Alle Status</option>
                <option value="neu">Neu</option>
                <option value="erreicht">Erreicht</option>
                <option value="nicht_erreicht">Nicht erreicht</option>
                <option value="termin_vereinbart">Termin vereinbart</option>
                <option value="wiedervorlage">Wiedervorlage</option>
                <option value="abgeschlossen">Abgeschlossen</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
        {displayContacts.length === 0 ? (
          <div className="p-8 text-center text-gray-500 animate-bounce-in">
            <div className="mb-4">
              <User className="h-16 w-16 mx-auto text-gray-300" />
            </div>
            <p className="text-lg font-semibold text-gray-700 mb-2">Keine Kontakte gefunden</p>
            <p className="text-sm text-gray-500">Starten Sie eine neue Suche für aktuelle Entscheider</p>
          </div>
        ) : (
          displayContacts.map((contact, index) => (
            <div
              key={contact.id}
              onClick={() => onContactSelect(contact)}
              className={`p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-300 rounded-xl mx-2 my-1 ${
                selectedContact?.id === contact.id ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 shadow-md' : 'hover:shadow-sm'
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{contact.name}</h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${getStatusColor(contact.status)}`}>
                      {getStatusLabel(contact.status)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-700 font-medium mb-2">{contact.position}</p>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Building className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">{contact.company}</span>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    {contact.phone && (
                      <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                        <Phone className="h-4 w-4 mr-2 text-green-500" />
                        <span className="font-medium">{contact.phone}</span>
                      </div>
                    )}
                    {contact.email && (
                      <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                        <Mail className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="font-medium">{contact.email}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xs text-gray-500 font-medium mb-2">
                    {new Date(contact.last_updated).toLocaleDateString('de-DE')}
                  </div>
                  <div className="flex items-center justify-end">
                    <div className={`w-3 h-3 rounded-full mr-2 shadow-sm ${
                      contact.data_freshness_score > 0.8 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                      contact.data_freshness_score > 0.6 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 
                      'bg-gradient-to-r from-red-400 to-red-500'
                    }`}></div>
                    <span className="text-xs text-gray-600 font-semibold">
                      {Math.round(contact.data_freshness_score * 100)}% aktuell
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactList;

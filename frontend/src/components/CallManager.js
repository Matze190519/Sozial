import React, { useState } from 'react';
import { Phone, Plus, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useContacts } from '../context/ContactContext';

const CallManager = ({ contact, onUpdate }) => {
  const { addCallRecord } = useContacts();
  const [isAdding, setIsAdding] = useState(false);
  const [newCall, setNewCall] = useState({
    outcome: '',
    notes: '',
    duration: ''
  });

  const callOutcomes = [
    { value: 'erreicht', label: 'Erreicht', icon: CheckCircle, color: 'text-green-600' },
    { value: 'nicht_erreicht', label: 'Nicht erreicht', icon: XCircle, color: 'text-red-600' },
    { value: 'mailbox', label: 'Mailbox', icon: Phone, color: 'text-yellow-600' },
    { value: 'secretary', label: 'Sekretariat', icon: Phone, color: 'text-blue-600' },
    { value: 'callback', label: 'Rückruf vereinbart', icon: Clock, color: 'text-purple-600' }
  ];

  const handleAddCall = async () => {
    if (!newCall.outcome) return;

    try {
      await addCallRecord(contact.id, {
        outcome: newCall.outcome,
        notes: newCall.notes,
        duration: newCall.duration ? parseInt(newCall.duration) : null
      });
      
      setNewCall({ outcome: '', notes: '', duration: '' });
      setIsAdding(false);
      
      const updatedContact = { ...contact };
      onUpdate(updatedContact);
    } catch (error) {
      console.error('Error adding call record:', error);
    }
  };

  const getOutcomeInfo = (outcome) => {
    return callOutcomes.find(o => o.value === outcome) || callOutcomes[0];
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">Anrufhistorie</h4>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus className="h-4 w-4" />
          <span>Anruf protokollieren</span>
        </button>
      </div>

      {contact.phone && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-900">Zentrale</span>
              <span className="text-green-700">{contact.phone}</span>
            </div>
            <a
              href={`tel:${contact.phone}`}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Jetzt anrufen
            </a>
          </div>
        </div>
      )}

      {isAdding && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ergebnis
              </label>
              <select
                value={newCall.outcome}
                onChange={(e) => setNewCall({ ...newCall, outcome: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Ergebnis auswählen</option>
                {callOutcomes.map(outcome => (
                  <option key={outcome.value} value={outcome.value}>
                    {outcome.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dauer (Minuten)
              </label>
              <input
                type="number"
                value={newCall.duration}
                onChange={(e) => setNewCall({ ...newCall, duration: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Optional"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notizen
              </label>
              <textarea
                value={newCall.notes}
                onChange={(e) => setNewCall({ ...newCall, notes: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Gesprächsnotizen..."
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-3">
            <button
              onClick={() => {
                setIsAdding(false);
                setNewCall({ outcome: '', notes: '', duration: '' });
              }}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Abbrechen
            </button>
            <button
              onClick={handleAddCall}
              disabled={!newCall.outcome}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Speichern
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {contact.call_history && contact.call_history.length > 0 ? (
          contact.call_history
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map((call) => {
              const outcomeInfo = getOutcomeInfo(call.outcome);
              const Icon = outcomeInfo.icon;
              
              return (
                <div key={call.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon className={`h-4 w-4 ${outcomeInfo.color}`} />
                      <span className="font-medium text-gray-900">{outcomeInfo.label}</span>
                      {call.duration && (
                        <span className="text-sm text-gray-500">({call.duration} Min.)</span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{new Date(call.timestamp).toLocaleString('de-DE')}</span>
                    </div>
                  </div>
                  {call.notes && (
                    <p className="text-gray-700 text-sm whitespace-pre-wrap">{call.notes}</p>
                  )}
                </div>
              );
            })
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Phone className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p>Keine Anrufe protokolliert</p>
            <p className="text-sm">Protokollieren Sie Ihren ersten Anruf</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallManager;

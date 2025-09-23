import React, { useState } from 'react';
import { Calendar, Plus, Clock, MapPin, CheckCircle } from 'lucide-react';
import { useContacts } from '../context/ContactContext';

const AppointmentScheduler = ({ contact, onUpdate }) => {
  const { addAppointment } = useContacts();
  const [isAdding, setIsAdding] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    datetime: new Date(),
    description: '',
    location: ''
  });

  const handleAddAppointment = async () => {
    if (!newAppointment.title) return;

    try {
      await addAppointment(contact.id, {
        title: newAppointment.title,
        datetime: newAppointment.datetime.toISOString(),
        description: newAppointment.description,
        location: newAppointment.location
      });
      
      setNewAppointment({
        title: '',
        datetime: new Date(),
        description: '',
        location: ''
      });
      setIsAdding(false);
      
      const updatedContact = { ...contact };
      onUpdate(updatedContact);
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'geplant': 'text-blue-600',
      'bestätigt': 'text-green-600',
      'abgeschlossen': 'text-gray-600',
      'abgesagt': 'text-red-600'
    };
    return colors[status] || colors['geplant'];
  };

  const getStatusIcon = (status) => {
    const icons = {
      'geplant': Clock,
      'bestätigt': CheckCircle,
      'abgeschlossen': CheckCircle,
      'abgesagt': Clock
    };
    return icons[status] || Clock;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">Termine</h4>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus className="h-4 w-4" />
          <span>Termin hinzufügen</span>
        </button>
      </div>

      {isAdding && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titel
              </label>
              <input
                type="text"
                value={newAppointment.title}
                onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="z.B. Verkaufsgespräch, Produktpräsentation"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Datum & Zeit
                </label>
                <input
                  type="datetime-local"
                  value={newAppointment.datetime instanceof Date ? newAppointment.datetime.toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)}
                  onChange={(e) => setNewAppointment({ ...newAppointment, datetime: new Date(e.target.value) })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ort
                </label>
                <input
                  type="text"
                  value={newAppointment.location}
                  onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Büro, Telefon, Video-Call"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Beschreibung
              </label>
              <textarea
                value={newAppointment.description}
                onChange={(e) => setNewAppointment({ ...newAppointment, description: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Gesprächsziele, Vorbereitung, etc."
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-3">
            <button
              onClick={() => {
                setIsAdding(false);
                setNewAppointment({
                  title: '',
                  datetime: new Date(),
                  description: '',
                  location: ''
                });
              }}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Abbrechen
            </button>
            <button
              onClick={handleAddAppointment}
              disabled={!newAppointment.title}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Speichern
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {contact.appointments && contact.appointments.length > 0 ? (
          contact.appointments
            .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
            .map((appointment) => {
              const StatusIcon = getStatusIcon(appointment.status);
              const isUpcoming = new Date(appointment.datetime) > new Date();
              
              return (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <StatusIcon className={`h-4 w-4 ${getStatusColor(appointment.status)}`} />
                      <span className="font-medium text-gray-900">{appointment.title}</span>
                      {isUpcoming && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          Anstehend
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(appointment.datetime).toLocaleString('de-DE')}</span>
                    </div>
                    
                    {appointment.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{appointment.location}</span>
                      </div>
                    )}
                  </div>
                  
                  {appointment.description && (
                    <p className="text-gray-700 text-sm mt-2 whitespace-pre-wrap">
                      {appointment.description}
                    </p>
                  )}
                </div>
              );
            })
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p>Keine Termine geplant</p>
            <p className="text-sm">Planen Sie Ihren ersten Termin</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentScheduler;

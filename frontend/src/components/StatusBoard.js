import React, { useEffect, useState } from 'react';
import { useContacts } from '../context/ContactContext';
import { User, Phone, Calendar, CheckCircle } from 'lucide-react';

const StatusBoard = ({ onContactSelect }) => {
  const { contacts, loadContacts, updateContact } = useContacts();
  const [draggedContact, setDraggedContact] = useState(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const statusColumns = [
    { 
      id: 'neu', 
      label: 'Neu', 
      color: 'bg-gray-100 border-gray-300',
      textColor: 'text-gray-800'
    },
    { 
      id: 'erreicht', 
      label: 'Erreicht', 
      color: 'bg-green-100 border-green-300',
      textColor: 'text-green-800'
    },
    { 
      id: 'nicht_erreicht', 
      label: 'Nicht erreicht', 
      color: 'bg-red-100 border-red-300',
      textColor: 'text-red-800'
    },
    { 
      id: 'termin_vereinbart', 
      label: 'Termin vereinbart', 
      color: 'bg-blue-100 border-blue-300',
      textColor: 'text-blue-800'
    },
    { 
      id: 'wiedervorlage', 
      label: 'Wiedervorlage', 
      color: 'bg-yellow-100 border-yellow-300',
      textColor: 'text-yellow-800'
    },
    { 
      id: 'abgeschlossen', 
      label: 'Abgeschlossen', 
      color: 'bg-purple-100 border-purple-300',
      textColor: 'text-purple-800'
    }
  ];

  const getContactsByStatus = (status) => {
    return contacts.filter(contact => contact.status === status);
  };

  const handleDragStart = (e, contact) => {
    setDraggedContact(contact);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    
    if (draggedContact && draggedContact.status !== newStatus) {
      try {
        await updateContact(draggedContact.id, { status: newStatus });
        loadContacts(); // Refresh the board
      } catch (error) {
        console.error('Error updating contact status:', error);
      }
    }
    
    setDraggedContact(null);
  };

  const ContactCard = ({ contact }) => (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, contact)}
      onClick={() => onContactSelect(contact)}
      className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow mb-2"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 text-sm">{contact.name}</h4>
          <p className="text-xs text-gray-600">{contact.position}</p>
          <p className="text-xs text-gray-500">{contact.company}</p>
        </div>
        <div className="flex items-center space-x-1">
          {contact.phone && <Phone className="h-3 w-3 text-gray-400" />}
          {contact.appointments && contact.appointments.length > 0 && (
            <Calendar className="h-3 w-3 text-blue-400" />
          )}
          {contact.notes && contact.notes.length > 0 && (
            <CheckCircle className="h-3 w-3 text-green-400" />
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{new Date(contact.last_updated).toLocaleDateString('de-DE')}</span>
        <div className={`w-2 h-2 rounded-full ${
          contact.data_freshness_score > 0.8 ? 'bg-green-400' :
          contact.data_freshness_score > 0.6 ? 'bg-yellow-400' : 'bg-red-400'
        }`}></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <User className="h-5 w-5 mr-2 text-blue-600" />
        <h2 className="text-xl font-bold">Status Board</h2>
        <span className="ml-2 text-sm text-gray-500">({contacts.length} Kontakte)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statusColumns.map((column) => {
          const columnContacts = getContactsByStatus(column.id);
          
          return (
            <div
              key={column.id}
              className={`rounded-lg border-2 border-dashed p-4 min-h-96 ${column.color}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-medium text-sm ${column.textColor}`}>
                  {column.label}
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full bg-white ${column.textColor}`}>
                  {columnContacts.length}
                </span>
              </div>
              
              <div className="space-y-2">
                {columnContacts.map((contact) => (
                  <ContactCard key={contact.id} contact={contact} />
                ))}
                
                {columnContacts.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">Keine Kontakte</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        <p>Tipp: Ziehen Sie Kontakte zwischen den Spalten, um den Status zu ändern</p>
      </div>
    </div>
  );
};

export default StatusBoard;

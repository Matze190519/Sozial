import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { 
  X, Phone, Mail, Building, User, Calendar, 
  MessageSquare, Clock, CheckCircle, AlertCircle,
  Edit3, Save, Trash2, ExternalLink
} from 'lucide-react';
import { useContacts } from '../context/ContactContext';
import NotesManager from './NotesManager';
import CallManager from './CallManager';
import AppointmentScheduler from './AppointmentScheduler';

Modal.setAppElement('#root');

const ContactDetail = ({ contact, onClose, onUpdate }) => {
  const { updateContact, getConversationBriefing, deleteContact } = useContacts();
  const [activeTab, setActiveTab] = useState('details');
  const [briefing, setBriefing] = useState('');
  const [loadingBriefing, setLoadingBriefing] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({
    status: contact.status,
    phone: contact.phone || '',
    email: contact.email || ''
  });

  const tabs = [
    { id: 'details', label: 'Details', icon: User },
    { id: 'briefing', label: 'KI Gesprächs-Briefing', icon: MessageSquare },
    { id: 'notes', label: 'Notizen', icon: Edit3 },
    { id: 'calls', label: 'Anrufe', icon: Phone },
    { id: 'appointments', label: 'Termine', icon: Calendar }
  ];

  const statusOptions = [
    { value: 'neu', label: 'Neu', color: 'bg-gray-100 text-gray-800' },
    { value: 'erreicht', label: 'Erreicht', color: 'bg-green-100 text-green-800' },
    { value: 'nicht_erreicht', label: 'Nicht erreicht', color: 'bg-red-100 text-red-800' },
    { value: 'termin_vereinbart', label: 'Termin vereinbart', color: 'bg-blue-100 text-blue-800' },
    { value: 'wiedervorlage', label: 'Wiedervorlage', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'abgeschlossen', label: 'Abgeschlossen', color: 'bg-purple-100 text-purple-800' }
  ];

  useEffect(() => {
    if (activeTab === 'briefing' && !briefing) {
      loadBriefing();
    }
  }, [activeTab]);

  const loadBriefing = async () => {
    setLoadingBriefing(true);
    try {
      const briefingText = await getConversationBriefing(contact.id);
      setBriefing(briefingText);
    } catch (error) {
      setBriefing('Briefing konnte nicht geladen werden. Bitte versuchen Sie es später erneut.');
    } finally {
      setLoadingBriefing(false);
    }
  };

  const handleSave = async () => {
    try {
      const updatedContact = await updateContact(contact.id, editData);
      onUpdate(updatedContact);
      setEditing(false);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Sind Sie sicher, dass Sie diesen Kontakt löschen möchten?')) {
      try {
        await deleteContact(contact.id);
        onClose();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const handleQuickAction = async (action) => {
    const statusMap = {
      'mailbox': 'nicht_erreicht',
      'secretary': 'erreicht',
      'callback': 'wiedervorlage',
      'appointment': 'termin_vereinbart'
    };

    if (statusMap[action]) {
      try {
        const updatedContact = await updateContact(contact.id, { status: statusMap[action] });
        onUpdate(updatedContact);
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };

  const currentStatus = statusOptions.find(s => s.value === contact.status);

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gray-50">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{contact.name}</h2>
              <p className="text-sm text-gray-600">{contact.position}</p>
              <div className="flex items-center mt-1">
                <Building className="h-4 w-4 mr-1 text-gray-400" />
                <span className="text-sm text-gray-600">{contact.company}</span>
              </div>
            </div>
            
            {currentStatus && (
              <span className={`px-3 py-1 text-sm rounded-full ${currentStatus.color}`}>
                {currentStatus.label}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEditing(!editing)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Contact Actions */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex items-center space-x-2 mb-3">
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>Anrufen</span>
              </a>
            )}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>E-Mail</span>
              </a>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleQuickAction('mailbox')}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              + Mailbox
            </button>
            <button
              onClick={() => handleQuickAction('secretary')}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              + Sekretariat erreicht
            </button>
            <button
              onClick={() => handleQuickAction('callback')}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              + Rückruf vereinbart
            </button>
            <button
              onClick={() => handleQuickAction('appointment')}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              + Termin vereinbart
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === 'details' && (
            <div className="space-y-4">
              {editing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={editData.status}
                      onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-Mail
                    </label>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      <Save className="h-4 w-4" />
                      <span>Speichern</span>
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Abbrechen
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Kontaktinformationen</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{contact.phone || 'Nicht verfügbar'}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{contact.email || 'Nicht verfügbar'}</span>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{contact.industry}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Datenqualität</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${
                          contact.data_freshness_score > 0.8 ? 'bg-green-400' :
                          contact.data_freshness_score > 0.6 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}></div>
                        <span>Aktualität: {Math.round(contact.data_freshness_score * 100)}%</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Aktualisiert: {new Date(contact.last_updated).toLocaleDateString('de-DE')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'briefing' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">KI Gesprächs-Briefing</h4>
                <button
                  onClick={loadBriefing}
                  disabled={loadingBriefing}
                  className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
                >
                  {loadingBriefing ? 'Lädt...' : 'Aktualisieren'}
                </button>
              </div>
              
              {loadingBriefing ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-600">Lade Briefing...</span>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none">
                  <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                    {briefing}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <NotesManager contact={contact} onUpdate={onUpdate} />
          )}

          {activeTab === 'calls' && (
            <CallManager contact={contact} onUpdate={onUpdate} />
          )}

          {activeTab === 'appointments' && (
            <AppointmentScheduler contact={contact} onUpdate={onUpdate} />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ContactDetail;

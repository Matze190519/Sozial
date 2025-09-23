import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
const API = `${BACKEND_URL}/api`;

const ContactContext = createContext();

const initialState = {
  contacts: [],
  loading: false,
  error: null,
  searchResults: [],
  filters: {
    status: '',
    industry: '',
    position: ''
  }
};

function contactReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload, loading: false };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload, loading: false };
    case 'ADD_CONTACT':
      return { ...state, contacts: [...state.contacts, action.payload] };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        ),
        searchResults: state.searchResults.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload),
        searchResults: state.searchResults.filter(contact => contact.id !== action.payload)
      };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
}

export function ContactProvider({ children }) {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const searchContacts = async (searchParams) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await axios.post(`${API}/contacts/search`, searchParams);
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: response.data.contacts });
      toast.success(`${response.data.total} Kontakte gefunden`);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Fehler beim Suchen der Kontakte');
    }
  };

  const loadContacts = async (filters = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      
      const response = await axios.get(`${API}/contacts?${params}`);
      dispatch({ type: 'SET_CONTACTS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Fehler beim Laden der Kontakte');
    }
  };

  const updateContact = async (contactId, updateData) => {
    try {
      const response = await axios.put(`${API}/contacts/${contactId}`, updateData);
      dispatch({ type: 'UPDATE_CONTACT', payload: response.data });
      toast.success('Kontakt aktualisiert');
      return response.data;
    } catch (error) {
      toast.error('Fehler beim Aktualisieren des Kontakts');
      throw error;
    }
  };

  const addNote = async (contactId, note) => {
    try {
      await axios.post(`${API}/contacts/${contactId}/notes`, note);
      const updatedContact = await axios.get(`${API}/contacts/${contactId}`);
      dispatch({ type: 'UPDATE_CONTACT', payload: updatedContact.data });
      toast.success('Notiz hinzugefügt');
    } catch (error) {
      toast.error('Fehler beim Hinzufügen der Notiz');
      throw error;
    }
  };

  const addCallRecord = async (contactId, callRecord) => {
    try {
      await axios.post(`${API}/contacts/${contactId}/calls`, callRecord);
      const updatedContact = await axios.get(`${API}/contacts/${contactId}`);
      dispatch({ type: 'UPDATE_CONTACT', payload: updatedContact.data });
      toast.success('Anruf protokolliert');
    } catch (error) {
      toast.error('Fehler beim Protokollieren des Anrufs');
      throw error;
    }
  };

  const addAppointment = async (contactId, appointment) => {
    try {
      await axios.post(`${API}/contacts/${contactId}/appointments`, appointment);
      const updatedContact = await axios.get(`${API}/contacts/${contactId}`);
      dispatch({ type: 'UPDATE_CONTACT', payload: updatedContact.data });
      toast.success('Termin hinzugefügt');
    } catch (error) {
      toast.error('Fehler beim Hinzufügen des Termins');
      throw error;
    }
  };

  const getConversationBriefing = async (contactId) => {
    try {
      const response = await axios.get(`${API}/contacts/${contactId}/briefing`);
      return response.data.briefing;
    } catch (error) {
      toast.error('Fehler beim Laden des Briefings');
      throw error;
    }
  };

  const deleteContact = async (contactId) => {
    try {
      await axios.delete(`${API}/contacts/${contactId}`);
      dispatch({ type: 'DELETE_CONTACT', payload: contactId });
      toast.success('Kontakt gelöscht');
    } catch (error) {
      toast.error('Fehler beim Löschen des Kontakts');
      throw error;
    }
  };

  useEffect(() => {
    if (BACKEND_URL && !BACKEND_URL.includes('localhost') && !BACKEND_URL.includes('placeholder')) {
      loadContacts();
    }
  }, []);

  const value = {
    ...state,
    searchContacts,
    loadContacts,
    updateContact,
    addNote,
    addCallRecord,
    addAppointment,
    getConversationBriefing,
    deleteContact,
    setFilters: (filters) => dispatch({ type: 'SET_FILTERS', payload: filters })
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContacts() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
}

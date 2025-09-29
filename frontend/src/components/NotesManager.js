import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Clock } from 'lucide-react';
import { useContacts } from '../context/ContactContext';
import TextareaAutosize from 'react-textarea-autosize';

const NotesManager = ({ contact, onUpdate }) => {
  const { addNote } = useContacts();
  const [newNote, setNewNote] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      await addNote(contact.id, {
        content: newNote,
        type: 'general'
      });
      setNewNote('');
      setIsAdding(false);
      
      const updatedContact = { ...contact };
      onUpdate(updatedContact);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">Notizen</h4>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus className="h-4 w-4" />
          <span>Notiz hinzufügen</span>
        </button>
      </div>

      {isAdding && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <TextareaAutosize
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Neue Notiz eingeben..."
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            minRows={3}
            autoFocus
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={() => {
                setIsAdding(false);
                setNewNote('');
              }}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Abbrechen
            </button>
            <button
              onClick={handleAddNote}
              disabled={!newNote.trim()}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Speichern
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {contact.notes && contact.notes.length > 0 ? (
          contact.notes
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map((note) => (
              <div key={note.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{new Date(note.timestamp).toLocaleString('de-DE')}</span>
                  </div>
                </div>
                <p className="text-gray-900 whitespace-pre-wrap">{note.content}</p>
              </div>
            ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Edit3 className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p>Keine Notizen vorhanden</p>
            <p className="text-sm">Fügen Sie die erste Notiz hinzu</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesManager;

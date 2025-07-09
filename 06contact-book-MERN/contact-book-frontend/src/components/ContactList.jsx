import { useEffect, useState } from 'react';
import api from '../services/Api';
import ContactCard from './ContactCard';

const ContactList = ({ reload }) => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await api.get('/get_all_contacts');
      setContacts(res.data);
    } catch (err) {
      console.error('Failed to fetch contacts', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/delete_contact/${id}`);
      setContacts(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [reload]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Contacts</h2>
      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        contacts.map((contact) => (
          <ContactCard key={contact._id} contact={contact} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default ContactList;

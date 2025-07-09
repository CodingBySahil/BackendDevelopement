import Navbar from '../components/Navbar';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import { useState } from 'react';

const Home = () => {
  const [reload, setReload] = useState(0);

  const triggerReload = () => {
    setReload(prev => prev + 1);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 mt-6">
        <ContactForm onAdd={triggerReload} />
        <ContactList reload={reload} />
      </div>
    </div>
  );
};

export default Home;

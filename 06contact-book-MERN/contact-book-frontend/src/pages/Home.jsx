
import Navbar from '../components/Navbar'
import ContactForm from '../components/ContactForm'
import ContactList from '../components/ContactList'

const HomePage = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Navbar />
      <ContactForm />
      <ContactList />
    </div>
  )
}

export default HomePage

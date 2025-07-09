const ContactCard = ({ contact, onDelete }) => {
  return (
    <div className="bg-gray-100 p-4 mb-4 rounded shadow flex justify-between items-start">
      <div>
        <h3 className="text-lg font-bold">{contact.name}</h3>
        <p>Email: {contact.email}</p>
        <p>Phone: {contact.phone}</p>
        <p className="italic text-sm">Message: {contact.message}</p>
      </div>
      <button
        onClick={() => onDelete(contact._id)}
        className="text-red-500 hover:underline"
      >
        Delete
      </button>
    </div>
  );
};

export default ContactCard;

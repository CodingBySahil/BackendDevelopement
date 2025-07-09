import {
  FiEdit2,
  FiTrash2,
  FiMail,
  FiPhone,
  FiInfo,
  FiUser,
} from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";

const ContactCard = ({ contact, onDelete, onEdit }) => {
  const timeCreated = formatDistanceToNow(new Date(contact.createdAt), {
    addSuffix: true,
  });
  const timeUpdated =
    contact.updatedAt &&
    formatDistanceToNow(new Date(contact.updatedAt), { addSuffix: true });

  return (
    <div className="bg-white p-4 mb-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-200 flex items-start space-x-4">
      {/* Profile Circle Icon */}
      <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-semibold">
        <FiUser />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-indigo-700">{contact.name}</h3>
          <span className="text-xs text-gray-400">{timeCreated}</span>
        </div>

        <p className="flex items-center text-gray-700 mt-1 text-sm">
          <FiMail className="mr-2" />
          {contact.email}
        </p>

        <p className="flex items-center text-gray-700 mt-1 text-sm">
          <FiPhone className="mr-2" />
          {contact.phone}
        </p>

        <div className="flex items-start mt-2 text-gray-600 text-sm">
          <FiInfo className="mr-2 mt-1" />
          <p className="italic">{contact.message}</p>
        </div>

        {contact.updatedAt && (
          <p className="text-xs text-gray-400 mt-2">Updated {timeUpdated}</p>
        )}

        {/* Static tag-style badge */}
        <div className="mt-3 flex gap-2 text-xs">
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            ⭐ Favorite
          </span>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            📱 Mobile Contact
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-2 ml-3">
        <button
          onClick={() => onEdit(contact)}
          className="text-indigo-600 hover:text-indigo-800"
          title="Edit"
        >
          <FiEdit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(contact._id)}
          className="text-red-600 hover:text-red-800"
          title="Delete"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default ContactCard;

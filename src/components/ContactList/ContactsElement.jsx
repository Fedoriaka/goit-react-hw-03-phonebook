import styles from './Contacts.module.css';

export const ContactsElement = ({ contact, onDeleteContact }) => {
  return (
    <li>
      {contact.name} : {contact.number}
      <button
        className={styles.deletebutn}
        onClick={() => onDeleteContact(contact.id)}
      >
        Delete
      </button>
    </li>
  );
};

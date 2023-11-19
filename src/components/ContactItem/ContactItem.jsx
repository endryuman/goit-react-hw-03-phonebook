import styles from './ContactItem.module.css';
export const ContactItem = ({ id, name, number, deleteContact }) => {
  return (
    <li className={styles.contactsItem}>
      <p>{name}</p>
      <p>{number}</p>
      <button onClick={() => deleteContact(id)}>Delete</button>
    </li>
  );
};

import { Component } from 'react';
import Section from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = newContact => {
    if (this.checkContactExists(newContact.name)) {
      return;
    }
    const contactsObj = {
      ...newContact,
      id: nanoid(),
    };
    this.setState(prev => ({
      contacts: [...prev.contacts, contactsObj],
    }));
  };

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    if (filter === '') {
      return contacts;
    } else {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
  };

  deleteContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(el => el.id !== id),
    }));
  };

  checkContactExists = newName => {
    const { contacts } = this.state;
    const isNameDuplicate = contacts.some(contact => contact.name === newName);

    if (isNameDuplicate) {
      alert(`${newName} is already in contacts`);
      return true;
    }
  };

  componentDidMount() {
    const localData = localStorage.getItem('contacts');
    if (localData) {
      this.setState({ contacts: JSON.parse(localData) });
    } else
      this.setState({
        contacts: [{ id: 'id-1', name: 'Contact Number', number: '459-12-56' }],
      });
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div>
        <Section title="Phonebook">
          <ContactForm addContact={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactsList
            contacts={visibleContacts}
            deleteContact={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
}

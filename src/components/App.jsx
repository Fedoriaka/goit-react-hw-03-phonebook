import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = (name, number) => {
    const { contacts } = this.state;
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.trim().toLowerCase()
      )
    ) {
      alert('Contact with this name already exists!');
      return;
    }
    if (name && number) {
      const newcontact = { name, id: nanoid(), number };

      this.setState({
        contacts: [...contacts, newcontact],
      });
    }
  };

  handleFilter = ev => {
    this.setState({ filter: ev.target.value.toLowerCase() });
  };
  getContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };
  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidMount() {
    const storeData = localStorage.getItem('contacts');
    if (storeData) {
      this.setState({ contacts: JSON.parse(storeData) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>

        <Filter filter={this.state.filter} Searchquery={this.handleFilter} />
        <ContactList
          contacts={this.getContacts()}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './FilterItem/FilterItem';
import styles from './App.module.css'

class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '+380-459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '+380-443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '+380 645 17 79'},
      {id: 'id-4', name: 'Annie Copeland', number: '+380 227 91 26'},
    ],
    filter: ''
  };

  addContact = (newContact) => {
    const { contacts } = this.state;
    const existingName = contacts.find(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    const existingNumber = contacts.find(
      (contact) => contact.number === newContact.number
    );

    if (existingName) {
      alert(`Контакт з ім'ям ${newContact.name} вже присутній у телефонній книзі.`);
      return;
    }

    if (existingNumber) {
      alert(`Контакт з номером телефону ${newContact.number} вже присутній у телефонній книзі.`);
      return;
    }

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, { ...newContact, id: nanoid() }]
    }));
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id)
    }));
  };

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={styles.adressBookContainer}>
        <h1 className={styles.header}>Телефонна книга</h1>
        <ContactForm addContact={this.addContact} />

<div className={styles.contactContainer}><h2 className={styles.subHeader}>Контакти</h2>
        <p className={styles.serchHeader}>Пошук за іменем</p>
        <Filter filter={filter} onChange={this.handleFilterChange} />
        <ContactList contacts={filteredContacts} onDeleteContact={this.deleteContact} /></div>
      </div>
    );
  }
}

export default App;

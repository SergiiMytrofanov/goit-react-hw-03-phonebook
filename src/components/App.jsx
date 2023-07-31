import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './FilterItem/FilterItem';
import styles from './App.module.css'
import { saveContactsToLocalStorage, loadContactsFromLocalStorage } from './ContactLocalStorage/localStoraje';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    searchByPhone: false,
  };

componentDidMount() {
  const storedContacts = loadContactsFromLocalStorage();
  this.setState({contacts:storedContacts});
}


componentDidUpdate(prevState) {
  if(prevState.contacts !== this.state.contacts) {
    saveContactsToLocalStorage(this.state.contacts);
  }
}

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

  handleToggleSearchByPhone = () => {
    this.setState((prevState) => ({
      searchByPhone: !prevState.searchByPhone,
      filter: '',
    }));
  };

  getFilteredContacts = () => {
    const { contacts, filter, searchByPhone } = this.state;
    return contacts.filter((contact) =>
      searchByPhone
        ? contact.number.includes(filter)
        : contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter, searchByPhone } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={styles.adressBookContainer}>
        <h1 className={styles.header}>Телефонна книга</h1>
        <ContactForm addContact={this.addContact} />

        <div className={styles.contactContainer}>
          <h2 className={styles.subHeader}>Контакти</h2>
          <p className={styles.searchHeader}>Пошук за іменем або номером телефону</p>
          <Filter
            filter={filter}
            onChange={this.handleFilterChange}
            onToggleSearchByPhone={this.handleToggleSearchByPhone}
            searchByPhone={searchByPhone}
          />
          <ContactList contacts={filteredContacts} onDeleteContact={this.deleteContact} />
        </div>
      </div>
    );
  }
}

export default App;

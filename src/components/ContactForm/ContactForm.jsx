import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: ''
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleNumberChange = (event) => {
    this.setState({ number: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, number } = this.state;
    const { addContact } = this.props;

    if (name.trim() === '' || number.trim() === '') return;

    const newContact = {
      id: nanoid(),
      name: name.trim(),
      number: number.trim()
    };

    addContact(newContact);
    this.setState({
      name: '',
      number: ''
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={styles.contactForm} onSubmit={this.handleSubmit}>
        <input
          className={styles.contactFormInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Ім'я може містити лише літери, апостроф, тире та пробіли. Наприклад, Адріан, Джейкоб Мерсер, Шарль де Батц де Кастельмор д'Артаньян"
          required
          placeholder="Ім'я та Прізвище"
          value={name}
          onChange={this.handleNameChange}
        />
        <input
          className={styles.contactFormInput}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Номер телефону повинен складатися з цифр і може містити пробіли, тире, круглі дужки та починатися з +"
          required
          placeholder="+000 000 000 00 00"
          value={number}
          onChange={this.handleNumberChange}
        />
        <button className={styles.contactFormButton} type="submit">Додати контакт</button>
      </form>
    );
  }
}

export default ContactForm;

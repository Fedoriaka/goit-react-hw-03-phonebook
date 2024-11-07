import React, { Component } from 'react';
import styles from './Form.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = ev => {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  };
  onAddContact = () => {
    const { name, number } = this.state;
    this.props.onAddContact(name, number);

    this.setState({
      name: '',
      number: '',
    });
  };
  render() {
    return (
      <form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault();
          this.onAddContact();
        }}
      >
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleInputChange}
          required
        />
        <label>Number</label>
        <input
          type="tel"
          name="number"
          value={this.state.number}
          onChange={this.handleInputChange}
          required
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

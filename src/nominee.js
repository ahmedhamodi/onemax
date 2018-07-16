import React, { Component } from 'react';
import person from './images/person.png';
import Dua from './dua.js';
import canada_flag from './images/canada_flag.png';
import america_flag from './images/america_flag.png';
import england_flag from './images/england_flag.png';
import australia_flag from './images/australia_flag.png';
import './index.css';

export default class Nominee extends Component {
  render() {
    console.log(this.props.name)
    return (
      <div className="columns">
        <ul className="person">
          <li className="header">
            <p className="nominee_name">{ this.props.name }</p>
            <img className="nominee_flag" src={canada_flag} alt="logo" />
          </li>
          <img src={person} className="person-logo" alt="logo" />
          { this.props.description }
          <li className="dua">
            <Dua duas = { this.props.duas } id = { this.props.id } isLoggedIn = {this.props.isLoggedIn} promptForLogin={this.props.promptForLogin} />
          </li>
        </ul>
      </div>
    );
  }
}

import React, { Component } from 'react';
import person from './images/person.png';
import Dua from './dua.js';
import './index.css';

export default class Nominee extends Component {
  render() {
    console.log(this.props.name)
    return (
      <div className="columns">
        <ul className="person">
          <li className="header">
            { this.props.name }
          </li>
          <img src={person} className="person-logo" alt="logo" />
          { this.props.description }
          <li className="dua">
            <Dua duas = { this.props.duas } id = { this.props.id }/>
          </li>
        </ul>
      </div>
    );
  }
}
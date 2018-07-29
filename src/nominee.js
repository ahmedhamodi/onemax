import React, { Component } from 'react';
import person from './images/person.png';
import { toast } from 'react-toastify';
import Dua from './dua.js';
import canada_flag from './images/Canada.png';
import america_flag from './images/America.png';
import england_flag from './images/England.png';
import australia_flag from './images/Australia.png';
import './index.css';

export default class Nominees extends Component {

  state = {
    showNoms: false
  }

  promptForLogin = () => toast.error("Login to submit nominations and give Duas!", {
    position: toast.POSITION.TOP_LEFT
  });

  displayNoms = () => {
    this.setState({ showNoms: true })
  }

  render() {
    return (
      <body>
        {this.props.nominees.slice(0,3).map((x, i) =>
          <Nominee userId={this.props.userID} isLoggedIn={this.props.isLoggedIn} promptForLogin={this.promptForLogin} name={this.props.nominees.slice(i, i+1).map(person => <p>{person.name}</p>)} description={this.props.nominees.slice(i, i+1).map(person => <p className="description">{person.description}</p>)} duas={this.props.nominees.slice(i, i+1).map(person => <p>{person.duas}</p>)} id={this.props.nominees.slice(i, i+1).map(person => <p>{person.id}</p>)} country={this.props.nominees.slice(i, i+1).map(person => <p>{person.country}</p>)} />)}

        <div>
          <div onClick={this.displayNoms} >
            {this.state.showNoms ? <RestOfNoms nominees={this.props.nominees.slice(3, this.props.nominees.length)} /> : <button class="action-button">View More Nominees</button>}
          </div>
        </div>
      </body>
    );
  }
}

class RestOfNoms extends Component {
  render() {
    return (
      <body>
        {this.props.nominees.map((x, i) =>
          <Nominee userId={this.props.userID} isLoggedIn={this.props.isLoggedIn} promptForLogin={this.promptForLogin} name={this.props.nominees.slice(i, i+1).map(person => <p>{person.name}</p>)} description={this.props.nominees.slice(i, i+1).map(person => <p className="description">{person.description}</p>)} duas={this.props.nominees.slice(i, i+1).map(person => <p>{person.duas}</p>)} id={this.props.nominees.slice(i, i+1).map(person => <p>{person.id}</p>)} country={this.props.nominees.slice(i, i+1).map(person => <p>{person.country}</p>)} />)}
      </body>
    )
  }
}

class Nominee extends Component {
  render() {
    const images = {
      Canada: './images/Canada.png',
      America: './images/America.png',
      England: './images/England.png',
      Australia: './images/Australia.png'
    }
    var icon = (this.props.country) ? images[this.props.country] : null;
    return (
      <div className="columns" style={{
        position: 'relative'
      }}>
        <ul className="person">
          <li className="header">
            <p className="nominee_name">{ this.props.name }</p>
            <img className="nominee_flag" src={canada_flag} alt="logo" />
          </li>
          <div className='person content'>
            <img src={person} className="person-logo" alt="logo" />
            { this.props.description }
          </div>
          <li className="dua">
            <Dua duas = { this.props.duas } id = { this.props.id } isLoggedIn = {this.props.isLoggedIn} promptForLogin={this.props.promptForLogin} userId={this.props.userId} />
          </li>
        </ul>
      </div>
    );
  }
}

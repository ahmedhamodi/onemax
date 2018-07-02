import React, { Component } from 'react';
import logo from './images/onemax.png';
import home from './images/home_icon.png';
import search from './images/search_icon.png';
import login from './images/login_icon.png';
import Nominee from './nominee.js';
import Navbar from './navbar.js';
import axios from 'axios';
import Popup from 'reactjs-popup';
import SubmitModal from './modal.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      persons: []
    };
  }

  componentDidMount() {
    axios.get('https://fast-cove-41298.herokuapp.com/nominations')
    .then(res => {
      const persons = res.data
      this.setState({ persons });
    });
  }

  render() {
    return (
      <div className="App">

        <img src={logo} className="App-logo" alt="logo" />
        
        <body>
          <div class="topnav" id="myTopnav" role="navigation">
            <Navbar image={home} altDescription="Home"/>
            <Navbar image={search} altDescription="Search"/>
            <Navbar image={login} altDescription="Login"/>
          </div>

          <Nominee name={ this.state.persons.slice(0,1).map(person => <p>{person.name}</p>)} description={ this.state.persons.slice(0,1).map(person => <p>{person.description}</p>)} duas={ this.state.persons.slice(0,1).map(person => <p>{person.duas}</p>)}/>

          <Nominee name={ this.state.persons.slice(1,2).map(person => <p>{person.name}</p>)} description={ this.state.persons.slice(1,2).map(person => <p>{person.description}</p>)} duas={ this.state.persons.slice(1,2).map(person => <p>{person.duas}</p>)}/>

          <Nominee name={ this.state.persons.slice(2,3).map(person => <p>{person.name}</p>)} description={ this.state.persons.slice(2,3).map(person => <p>{person.description}</p>)} duas={ this.state.persons.slice(2,3).map(person => <p>{person.duas}</p>)}/>

          <SubmitModal/>

        </body>

      </div>
    );
  }
}

export default App;

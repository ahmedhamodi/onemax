import React, { Component } from 'react';
import Nominee from './nominee.js';
import axios from 'axios';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';

import NavBarNew from './navbarnew';

class App extends Component {
  constructor(props) {
    super(props);

    this.updateLogin = this.updateLogin.bind(this);
    this.promptForLogin = this.promptForLogin.bind(this);

    this.state = {
      persons: [],
      name: 'old',
      isLoggedIn: false,
      userID: '',
      picture: '',
      searchTerm: ''
    };
  }

  updateLogin = (response) => {
    this.setState({
      isLoggedIn: true,
      name: response.name,
      userID: response.userID,
      picture: response.picture
    });
  }

  promptForLogin = () => toast.error("Login to submit nominations and give Duas!", {
    position: toast.POSITION.TOP_LEFT
  });

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
        <ToastContainer autoClose={3000} />

        <div className='container'>
          <NavBarNew persons = {this.state.persons} isLoggedIn={this.state.isLoggedIn} name={this.state.name} updateLogin={this.updateLogin} />
        </div>

        <div className='container'>
          <Nominee userId={this.state.userID} isLoggedIn={this.state.isLoggedIn} promptForLogin={this.promptForLogin} name={this.state.persons.slice(0, 1).map(person => <p>{person.name}</p>)} description={this.state.persons.slice(0, 1).map(person => <p className="description">{person.description}</p>)} duas={this.state.persons.slice(0, 1).map(person => <p>{person.duas}</p>)} id={this.state.persons.slice(0, 1).map(person => <p>{person.id}</p>)} />

          <Nominee userId={this.state.userID} isLoggedIn={this.state.isLoggedIn} promptForLogin={this.promptForLogin} name={this.state.persons.slice(1, 2).map(person => <p>{person.name}</p>)} description={this.state.persons.slice(1, 2).map(person => <p className="description">{person.description}</p>)} duas={this.state.persons.slice(1, 2).map(person => <p>{person.duas}</p>)} id={this.state.persons.slice(1, 2).map(person => <p>{person.id}</p>)} />

          <Nominee userId={this.state.userID} isLoggedIn={this.state.isLoggedIn} promptForLogin={this.promptForLogin} name={this.state.persons.slice(2, 3).map(person => <p>{person.name}</p>)} description={this.state.persons.slice(2, 3).map(person => <p className="description">{person.description}</p>)} duas={this.state.persons.slice(2, 3).map(person => <p>{person.duas}</p>)} id={this.state.persons.slice(2, 3).map(person => <p>{person.id}</p>)} />
        </div>
      </div >
    );
  }
}

export default App;

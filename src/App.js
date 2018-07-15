import React, { Component } from 'react';
import logo from './images/onemax.png';
import home from './images/home_icon.png';
import search from './images/search_icon.png';
import login from './images/login_icon.png';
import Nominee from './nominee.js';
import Navbar from './navbar.js';
import axios from 'axios';
import SubmitModal from './modal.js';
import LoginAuthentication from './login.js';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
    this.promptForLogin = this.promptForLogin.bind(this);

    this.state = {
      persons: [],
      name: 'old',
      isLoggedIn: false,
    };

  }

  onLogin = (response) => {
    this.setState({
      isLoggedIn: true,
      name: response.name,
      userID: response.userID
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

        <div align="right">
          <LoginAuthentication onLogin={this.onLogin} />
        </div>

        <img src={logo} className="App-logo" alt="logo" />

        <div className="topnav" id="myTopnav" role="navigation">
          <Navbar image={home} altDescription="Home" />
          <Navbar image={search} altDescription="Search" />
          <Navbar image={login} altDescription="Login" />
        </div>

        <Nominee isLoggedIn={this.state.isLoggedIn} promptForLogin={this.promptForLogin} name={this.state.persons.slice(0, 1).map(person => <p>{person.name}</p>)} description={this.state.persons.slice(0, 1).map(person => <p className="description">{person.description}</p>)} duas={this.state.persons.slice(0, 1).map(person => <p>{person.duas}</p>)} id={this.state.persons.slice(0, 1).map(person => <p>{person.id}</p>)} />

        <Nominee isLoggedIn={this.state.isLoggedIn} promptForLogin={this.promptForLogin} name={this.state.persons.slice(1, 2).map(person => <p>{person.name}</p>)} description={this.state.persons.slice(1, 2).map(person => <p className="description">{person.description}</p>)} duas={this.state.persons.slice(1, 2).map(person => <p>{person.duas}</p>)} id={this.state.persons.slice(1, 2).map(person => <p>{person.id}</p>)} />

        <Nominee isLoggedIn={this.state.isLoggedIn} promptForLogin={this.promptForLogin} name={this.state.persons.slice(2, 3).map(person => <p>{person.name}</p>)} description={this.state.persons.slice(2, 3).map(person => <p className="description">{person.description}</p>)} duas={this.state.persons.slice(2, 3).map(person => <p>{person.duas}</p>)} id={this.state.persons.slice(2, 3).map(person => <p>{person.id}</p>)} />

        <SubmitModal isLoggedIn={this.state.isLoggedIn} promptForLogin={this.promptForLogin} userID={this.state.userID} />

      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Nominees from './nominee.js';
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
    console.log(this.state.persons)
    return (
      <div className="App">
        <ToastContainer autoClose={3000} />

        <div className='container'>
          <NavBarNew persons = {this.state.persons} isLoggedIn={this.state.isLoggedIn} name={this.state.name} updateLogin={this.updateLogin} />
        </div>

        <div className='container'>
          <Nominees userId={this.state.userID} isLoggedIn={this.state.isLoggedIn} promptForLogin={this.promptForLogin} nominees={this.state.persons} />
        </div>
      </div >
    );
  }
}

export default App;

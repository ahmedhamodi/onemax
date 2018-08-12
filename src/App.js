import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBarNew from './navbarnew.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.updateLogin = this.updateLogin.bind(this);
    this.promptForLogin = this.promptForLogin.bind(this);

    this.state = {
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

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <ToastContainer autoClose={3000} />

            <div className='container'>
              <NavBarNew isLoggedIn={this.state.isLoggedIn} name={this.state.name} updateLogin={this.updateLogin} />
            </div>

          </div>
        </Router>

      </div >
    );
  }
}

export default App;

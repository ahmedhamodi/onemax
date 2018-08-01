import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from "prop-types";
import Joyride from 'react-joyride';
import axios from 'axios';
import NavBarNew from './navbarnew.js';
import Person from './person.js';
import Home from './home.js';
import './App.css';

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
      searchTerm: '',
      run: false,
      steps: [
        {
          target: '.btn.btn-primary',
          content: 'This if my awesome feature!',
          placement: 'bottom',
        },
        {
          target: '.search',
          content: 'This if my awesome feature!',
          placement: 'bottom',
        }
      ]
    };
  }

  static propTypes = {
    joyride: PropTypes.shape({
      callback: PropTypes.func
    })
  };

  static defaultProps = {
    joyride: {}
  };

  handleJoyrideCallback = data => {
    const { joyride } = this.props;
    const { type } = data;

    if (typeof joyride.callback === "function") {
      joyride.callback(data);
    } else {
      console.group(type);
      console.log(data); //eslint-disable-line no-console
      console.groupEnd();
    }
  };

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
    this.setState({ run: true });
    axios.get('https://fast-cove-41298.herokuapp.com/nominations')
      .then(res => {
        const persons = res.data
        this.setState({ persons });
      });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <ToastContainer autoClose={3000} />

            <Joyride
              continuous
              showProgress
              disableOverlay={false}
              steps={this.state.steps}
              run={this.state.run}
              callback={this.handleJoyrideCallback}
            />

            <div className='container'>
              <NavBarNew persons={this.state.persons} isLoggedIn={this.state.isLoggedIn} name={this.state.name} updateLogin={this.updateLogin} />
            </div>

            <div>
              <Route exact path="/" render={() => <Home isLoggedIn={this.state.isLoggedIn} userID={this.state.userID} />} />
              <Route exact path="/search" component={Home} />
              <Route path="/search/:name" render={(params) => <Person isLoggedIn={this.state.isLoggedIn} userID={this.state.userID} params={params} />} />
            </div>

          </div>
        </Router>

      </div >
    );
  }
}

export default App;

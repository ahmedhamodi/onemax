import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import NavBarNew from './navbarnew.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.updateFacebookLogin = this.updateFacebookLogin.bind(this);
    this.updateGoogleLogin = this.updateGoogleLogin.bind(this);
    this.promptForLogin = this.promptForLogin.bind(this);

    this.state = {
      name: 'old',
      isLoggedIn: false,
      userID: '',
      picture: '',
      searchTerm: ''
    };
  }

  updateFacebookLogin = (response) => {
    this.setState({
      isLoggedIn: true,
      name: response.name,
      userID: response.userID,
      picture: response.picture
    });
  }

  updateGoogleLogin = (response) => {
    this.setState({
      isLoggedIn: true,
      name: response.name,
      userID: response.googleId,
      picture: response.imageUrl
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
              <NavBarNew isLoggedIn={this.state.isLoggedIn} name={this.state.name} updateFacebookLogin={this.updateFacebookLogin} updateGoogleLogin={this.updateGoogleLogin} />
            </div>
            <div style={{
              paddingTop: "60px"
            }}>
              <Navbar fixedBottom style={{
                backgroundColor: '#015C89',
                fontSize: '14px'
              }}>
                <Navbar.Header>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav>
                    <NavItem eventKey={1} href="mailto:onemaxapp@gmail.com">
                      <div style={{
                        color: '#D8D8D8'
                      }}>
                        Contact Us
                      </div>
                    </NavItem>
                    {/* Leaving this here so that we remember how to add further*/}
                    {/* <NavItem>
                      <Link to='/FAQ'>
                        FAQ
                      </Link>
                    </NavItem> */}
                  </Nav>
                  <Navbar.Text pullRight style={{
                      color: '#D8D8D8'
                    }}>© Copyright 2018 OneMAX | All Rights Reserved</Navbar.Text>
                </Navbar.Collapse>
              </Navbar>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

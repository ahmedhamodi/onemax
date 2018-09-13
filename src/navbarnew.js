import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Nav, Navbar, FormGroup, FormControl, Button, Glyphicon, InputGroup } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import LoginAuthentication from './login.js';
import SubmitModal from './modal.js';
import onemaxlogo from './images/onemaxlogo.png';
import Person from './person.js';
import Home from './home.js';
import Approve from './approve.js'
import 'react-toastify/dist/ReactToastify.css';


export default class NavbarNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginString: '',
      profilePicture: this.props.picture,
      searchValue: ''
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    let userId = localStorage.getItem('userId')
    if (userId !== null) {
      this.setState({
        isLoggedIn: true,
        userID: userId,
        name: localStorage.getItem('userName'),
        picture: localStorage.getItem('picture')
      })
    }
  }

  handleSearchInput = (event) => {
    this.setState({ searchValue: event.target.value })
  }

  onFacebookLogin = (response) => {
    this.setState({
      isLoggedIn: true,
      name: response.name,
      userID: response.userID,
      picture: response.picture
    });
    this.props.updateFacebookLogin(response);
  }

  onGoogleLogin = (response) => {
    this.setState({
      isLoggedIn: true,
      name: response.name,
      userID: response.googleId,
      picture: response.imageUrl
    });
    this.props.updateGoogleLogin(response);
  }

  logout() {
    this.setState({
      isLoggedIn: false,
      name: "",
      userID: "",
      picture: ""
    })
  }

  promptForLogin = () => toast.error("Login to submit nominations and give Duas!", {
    position: toast.POSITION.TOP_LEFT
  })

  scrollToTop() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => <Home isLoggedIn={this.state.isLoggedIn} userID={this.state.userID} userName={this.state.name} />} />
        <Route exact path="/search" component={Home} />
        <Route exact path="/approve" component={(params) => <Approve isLoggedIn={this.state.isLoggedIn} userID={this.state.userID} userName={this.state.name} params={params} />} />
        <Route path="/search/:name" render={(params) => <Person isLoggedIn={this.state.isLoggedIn} userID={this.state.userID} userName={this.state.name} params={params} />} />

        <Navbar fixedTop className="Main-Nav">
          <Navbar.Header className='Main-Nav-Header'>
            <Link to="/">
              <Navbar.Brand>
                <img src={onemaxlogo} className="App-logo" alt="logo" onClick={this.scrollToTop}/>
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav style={{
              paddingTop: '4px'
            }}>
              <Navbar.Form pullLeft>
                <FormGroup bsSize="normal">
                  <InputGroup>
                    <FormControl type="text" placeholder="Search for Hero" value={this.state.searchValue} onChange={this.handleSearchInput} onKeyPress={this.handleSearchEnterKey} />
                    <InputGroup.Button className="search">
                      <Link to={'/search/' + this.state.searchValue}>
                        <Button><Glyphicon glyph="glyphicon glyphicon-search" /></Button>
                      </Link>
                    </InputGroup.Button>
                  </InputGroup>
                </FormGroup>
              </Navbar.Form>

              <Nav pullLeft style={{
                paddingTop: '8px',
              }}>
                <SubmitModal isLoggedIn={this.state.isLoggedIn} promptForLogin={this.promptForLogin} userID={this.state.userID} userName={this.state.name}/>
              </Nav>
            </Nav>

            <Nav pullRight style={{
              paddingTop: '12px'
            }}>
              <LoginAuthentication onFacebookLogin={this.onFacebookLogin} onGoogleLogin={this.onGoogleLogin} logout={this.logout} />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

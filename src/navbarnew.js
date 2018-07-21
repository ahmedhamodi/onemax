import React, { Component } from 'react';
import LoginAuthentication from './login.js';
import logonobg from './images/onemax-nobg.png';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import SubmitModal from './modal.js';
import { Nav, Navbar, FormGroup, FormControl, Button, Glyphicon, InputGroup} from 'react-bootstrap';
import SearchBar from './searchbar.js';


export default class NavbarNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginString: '',
            profilePicture: this.props.picture
        };
    }

    onLogin = (response) => {
        this.setState({
          isLoggedIn: true,
          name: response.name,
          userID: response.userID,
          picture: response.picture
        });
        this.props.updateLogin(response);
    }

    promptForLogin = () => toast.error("Login to submit nominations and give Duas!", {
        position: toast.POSITION.TOP_LEFT
      });

    render() {
        return (
            <Navbar fixedTop collapseOnSelect className="Main-Nav">

                <Navbar.Header className='Main-Nav-Header'>
                    <Navbar.Brand>
                        <img src={logonobg} className="App-logo" alt="logo" /> 
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                
                <Navbar.Collapse>
                    <Nav style={{
                        paddingTop: '4px'
                    }}>
                        <Navbar.Form pullLeft>
                            <FormGroup bsSize="normal">
                                <InputGroup>
                                <FormControl type="text" placeholder="Search for Nominees"/>
                                <InputGroup.Button>
                                    <Button><Glyphicon glyph="glyphicon glyphicon-search" /></Button>
                                </InputGroup.Button>
                                </InputGroup>
                                <SearchBar persons = {this.props.persons} />
                            </FormGroup>
                            
                        </Navbar.Form>
                        <Nav pullLeft style={{
                            paddingTop: '8px',
                            paddingLeft: '22px'
                        }}>
                            <SubmitModal isLoggedIn={this.state.isLoggedIn} promptForLogin={this.promptForLogin} userID={this.state.userID} />
                        </Nav>
                    </Nav>
                    <Nav pullRight style={{
                            width: 'fit-content',
                            paddingTop: '12px'
                    }}>
                        <LoginAuthentication onLogin={this.onLogin} /> 
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
import React, { Component } from 'react';
import LoginAuthentication from './login.js';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Form, FormGroup, FormControl, Button } from 'react-bootstrap';


export default class NavbarNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginString: this.props.name,
            profilePicture: this.props.picture
        };
    }

    render() {
        return ( // The variable should be a return function...
            <Navbar fixedTop inverse expanded>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">Brand</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl type="text" placeholder="Search for nominee" />
                        </FormGroup>{' '}
                        <Button type="submit">Submit</Button>
                    </Navbar.Form>
                    <Navbar.Text pullRight>
                        <LoginAuthentication onLogin={this.onLogin} pullRight/>
                    </Navbar.Text>
                    
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
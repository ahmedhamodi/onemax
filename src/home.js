import React, { Component } from 'react';
import Nominee from './nominee.js';
import { toast } from 'react-toastify';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        this.promptForLogin = this.promptForLogin.bind(this);

        this.state = {
            persons: []
        };
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
            <div className='container'>
                <Nominee userId={this.props.userID} isLoggedIn={this.props.isLoggedIn} promptForLogin={this.promptForLogin} name={this.state.persons.slice(0, 1).map(person => <p>{person.name}</p>)} description={this.state.persons.slice(0, 1).map(person => <p className="description">{person.description}</p>)} duas={this.state.persons.slice(0, 1).map(person => <p>{person.duas}</p>)} id={this.state.persons.slice(0, 1).map(person => <p>{person.id}</p>)} />

                <Nominee userId={this.props.userID} isLoggedIn={this.props.isLoggedIn} promptForLogin={this.promptForLogin} name={this.state.persons.slice(1, 2).map(person => <p>{person.name}</p>)} description={this.state.persons.slice(1, 2).map(person => <p className="description">{person.description}</p>)} duas={this.state.persons.slice(1, 2).map(person => <p>{person.duas}</p>)} id={this.state.persons.slice(1, 2).map(person => <p>{person.id}</p>)} />

                <Nominee userId={this.props.userID} isLoggedIn={this.props.isLoggedIn} promptForLogin={this.promptForLogin} name={this.state.persons.slice(2, 3).map(person => <p>{person.name}</p>)} description={this.state.persons.slice(2, 3).map(person => <p className="description">{person.description}</p>)} duas={this.state.persons.slice(2, 3).map(person => <p>{person.duas}</p>)} id={this.state.persons.slice(2, 3).map(person => <p>{person.id}</p>)} />
            </div>
        );
    }
}

export default Home;
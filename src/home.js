import React, { Component } from 'react';
import Nominees from './nominee.js';
import { toast } from 'react-toastify';
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
                <Nominees userId={this.props.userID} isLoggedIn={this.props.isLoggedIn} promptForLogin={this.promptForLogin} nominees={this.state.persons} />
            </div>
        );
    }
}

export default Home;
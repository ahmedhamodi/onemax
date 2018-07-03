import React, { Component, PropTypes } from 'react';
import './index.css';
import dua from './images/dua_icon.png';
import axios from 'axios';

export default class Dua extends Component {

	state = {
		duas: this.props.duas,
		id: this.props.id
	}

	increaseDuas = () => {
		var duaNomineeID = new FormData();
		console.log(this.state.id)
		console.log(this.state.duas)
    duaNomineeID.set('nominee_id', 14)
    var self = this;
    axios({
    method: 'post',
    url: 'https://fast-cove-41298.herokuapp.com/dua',
    data: duaNomineeID,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
    	console.log(response);
    	self.setState((prevState) => ({ duas: response.data.duas }))
    })
    .catch(function (response) {
        console.log(response);
    });
	}

	sleep(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	componentDidMount() {
		this.sleep(500).then(() => {
			this.setState((prevState) => ({ duas: this.props.duas, id: this.props.id }));
		})
	}

	render() {
    return (
			<a href="#" className="button">
				<img src={dua} alt="Give Dua" height="60" width="60" className="dua_button" onClick={ this.increaseDuas }/>
				{ this.state.duas }
			</a>
		);
	}
}
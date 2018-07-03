import React, { Component, PropTypes } from 'react';
import './index.css';
import dua from './images/dua_icon.png';

export default class DuaButton extends Component {

	state = {
		duas: 0,
		id: 0
	}

	componentDidMount() {
		this.setState({ duas: 90 })
	}

	render() {
		console.log(this.state)
		console.log(this.props)
    return (
			<a href="#" className="button">
				<img src={dua} alt="Give Dua" height="60" width="60" className="dua_button"/>
				{ this.state.duas }
			</a>
		);
	}
}
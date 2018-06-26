import React, { Component } from 'react';
import './index.css';

export default class Navbar extends Component {
	render() {
    return (
    	<a href="#" class="button"><img src={ this.props.image } alt={ this.props.altDescription } height="40" width="40" class="navbar_button"/></a>
		);
	}
}
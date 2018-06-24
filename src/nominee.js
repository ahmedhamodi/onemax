import React, { Component } from 'react';
import person from './images/person.png';
import dua from './images/dua_icon.png';
import './index.css';

export default class Nominee extends Component {
	render() {
    return (
			<div class="columns">
		    <ul class="person">
		      <li class="header">{ this.props.name }</li>
		      <img src={person} className="person-logo" alt="logo" />
		      <p class="description">{ this.props.description }</p>
		      <li class="dua"><a href="#" class="button"><img src={dua} alt="Give Dua" height="60" width="60" class="dua_button"/>{ this.props.duas }</a></li>
		    </ul>
		  </div>
		);
	}
}
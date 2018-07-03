import React, { Component } from 'react';
import person from './images/person.png';
import DuaButton from './dua_button.js';
import dua from './images/dua_icon.png';
import './index.css';

export default class Nominee extends Component {
	render() {
		console.log(this.props)
    return (
			<div className="columns">
		    <ul className="person">
		      <li className="header">
		      	{ this.props.name }
		      </li>
		      <img src={person} className="person-logo" alt="logo" />
		      { this.props.description }
		      <li className="dua">
		      	<DuaButton {...this.props}/>
		      </li>
		    </ul>
		  </div>
		);
	}
}
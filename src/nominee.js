import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import person from './images/person.png';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

export default class Nominee extends Component {
	render() {
    return (
			<div class="columns">
		    <ul class="person">
		      <li class="header">{ this.props.name }</li>
		      <img src={person} className="person-logo" alt="logo" />
		      <p class="description">{ this.props.description }</p>
		      <li class="dua"><a href="#" class="button">Give Dua</a></li>
		    </ul>
		  </div>
		);
	}
}
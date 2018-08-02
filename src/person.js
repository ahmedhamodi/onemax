import React, { Component } from 'react';
import axios from 'axios';
import { Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Nominees from './nominee.js';

class Person extends Component {
  constructor(props) {
    super(props);

    this.state = {
      persons: [],
      search: '',
      found: false
    }
  }

  componentDidMount() {
    const name = this.props.params.match.params.name;
    var bodyFormData = new FormData();
    bodyFormData.set('tags', name)
    axios({
      method: 'post',
      url: 'https://fast-cove-41298.herokuapp.com/search',
      data: bodyFormData
    })
      .then(res => {
        const persons = res.data
        if(res.data.length !== 0) {
          this.setState({ persons, found: true, search: name });
        }
      });
  }

  render() {
    return (
      <div>
        <h2 hidden={this.state.found} style={{
          position: 'relative',
          top: '50px'
        }}>
          No nominees found. Please try again!
        </h2>
        <div hidden={!this.state.found} className='container'>
          <Nominees userId={this.props.userID} isLoggedIn={this.props.isLoggedIn} promptForLogin={this.promptForLogin} nominees={this.state.persons} />
        </div>
        <Link to='/'>
          <button className="action-button" style={{
            position: 'relative',
            top: '120px'
          }}>
            <Glyphicon glyph="glyphicon glyphicon-arrow-left" /> Back home
          </button>
        </Link>
      </div>
    );
  }
}

export default Person;
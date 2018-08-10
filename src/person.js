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
      found: false,
      allowSearch: true
    }
  }

  processSearch(name) {
    var bodyFormData = new FormData();
    bodyFormData.set('tags', name)
    bodyFormData.set('page', 1)
    axios({
      method: 'post',
      url: 'https://fast-cove-41298.herokuapp.com/search',
      data: bodyFormData
    })
      .then(res => {
        const persons = res.data['nominations'];
        if (persons.length !== 0) {
          this.setState({ persons, found: true, search: name, allowSearch: false });
        } else {
          this.setState({ search: name, persons: [], found: false, allowSearch: false });
        }
      })
      .catch(error => {
        console.error('Error performing search: ', error);
        this.setState({ search: '', persons: [], found: false, allowSearch: false })
      });
      setTimeout(() => this.setState({ allowSearch: true }), 1000);
  }

  componentDidMount() {
    let name = this.props.params.match.params.name;
    this.processSearch(name);
  }

  componentDidUpdate() {
    let name = this.props.params.match.params.name;
    this.processSearch(name);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.params.match.params.name !== null) {
      if (this.state.search !== nextProps.params.match.params.name && this.state.allowSearch === true) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  render() {
    return (
      <div>
        <h2 hidden={this.state.found} style={{
          position: 'relative',
          top: '50px'
        }}>
          No nominees found when searching for <b>"{this.state.search}"</b>. Please try again!
        </h2>
        <div hidden={!this.state.found} className='container'>
          <Nominees userId={this.props.userID} isLoggedIn={this.props.isLoggedIn} promptForLogin={this.promptForLogin} />
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
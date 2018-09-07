import React, { Component } from 'react';
import axios from 'axios';
import Nominees from './nominee.js';

class Person extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      found: false,
      allowSearch: true
    }
  }

  processSearch(name) {
    axios.get('https://fast-cove-41298.herokuapp.com/search?tags=' + name.replace(/ /g, '%20') + '&page=1')
      .then(res => {
        const persons = res.data['nominations'];
        if (persons.length !== 0) {
          this.setState({ found: true, search: name, allowSearch: false });
        } else {
          this.setState({ search: name, found: false, allowSearch: false });
        }
      })
      .catch(error => {
        console.error('Error performing search: ', error);
        this.setState({ search: '', found: false, allowSearch: false })
      });
      setTimeout(() => this.setState({ allowSearch: true }), 1000);
  }

  componentDidMount() {
    let name = this.props.params.match.params.name;
    this.processSearch(name);
  }

  componentWillReceiveProps() {
    const newSearch = this.props.params.match.params.name;
    this.processSearch(newSearch);
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
          <Nominees tags={this.props.params.match.params.name} search={true} userId={this.props.userID} userName={this.props.userName} isLoggedIn={this.props.isLoggedIn} promptForLogin={this.promptForLogin} />
        </div>
      </div>
    );
  }
}

export default Person;

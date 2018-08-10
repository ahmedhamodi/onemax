import React, { Component } from 'react';
import person from './images/person.png';
import { toast } from 'react-toastify';
import Dua from './dua.js';
import axios from 'axios';
import canada_flag from './images/Canada.png';
import america_flag from './images/America.png';
import england_flag from './images/England.png';
import australia_flag from './images/Australia.png';
import { Well } from 'react-bootstrap';
import './index.css';

{/* TO DO: Add a search tag to state which distinguishes between search query and nominees view on home page. This will result in different paged end points being used. */}
{/* TO DO: Implement state updating in componentDidMount with the passed in props (stateResults or something similar). */}
{/* TO DO: Access a different end point (paged search results) if this.state.search is set to True. */}

export default class Nominees extends Component {

  state = {
    persons: [],
    next_persons: [],
    showNoms: false,
    page: 2
  }

  promptForLogin = () => toast.error("Login to submit nominations and give Duas!", {
    position: toast.POSITION.TOP_LEFT
  });

  displayNoms = () => {
    this.setState({ persons: this.state.next_persons, page: this.state.page+1 });
    axios.get('https://fast-cove-41298.herokuapp.com/paged_nominations?page=' + (this.state.page+1))
      .then(res => {
        const newPersons = res.data['nominations']
        this.setState({ showNoms: true, next_persons: [...this.state.persons, ...newPersons] });
      })
      .catch(function (response) {
        console.error(response);
      }); 
  }

  displayViewButton = () => {
    if (this.state.next_persons.length > 18*(this.state.page-1)) {
      return (<button className="action-button">View More Nominees</button>)
    } else {
      return null
    }
  }

  componentDidMount() {
    axios.get('https://fast-cove-41298.herokuapp.com/paged_nominations')
      .then(res => {
        const persons = res.data['nominations']
        const nextPage = res.data['nextPage']
        this.setState({ page: nextPage, persons: persons });
        axios.get('https://fast-cove-41298.herokuapp.com/paged_nominations?page=2')
          .then(res => {
            const newPersons = res.data['nominations']
            this.setState({ next_persons: [...persons, ...newPersons] });
          })
          .catch(function (response) {
            console.error(response);
          }); 
      })
      .catch(function (response) {
        console.error(response);
      }); 
  }

  render() {
    return (
      <div className="pageBody">
        {this.state.persons.map((x, i) =>
          <Nominee userId={this.props.userId} isLoggedIn={this.props.isLoggedIn} promptForLogin={this.promptForLogin} name={this.state.persons.slice(i, i+1).map(person => <p>{person.name}</p>)} description={this.state.persons.slice(i, i+1).map(person => <p>{person.description}</p>)} duas={this.state.persons.slice(i, i+1).map(person => <p>{person.duas}</p>)} id={this.state.persons.slice(i, i+1).map(person => <p>{person.id}</p>)} image={this.state.persons.slice(i, i+1).map(person => <p>{person.image}</p>)} country={this.state.persons.slice(i, i+1).map(person => <p>{person.country}</p>)} />)}
        
        <div>
          {this.state.showNoms ? <RestOfNoms userId={this.props.userID} isLoggedIn={this.props.isLoggedIn} promptForLogin={this.promptForLogin} nominees={this.state.persons.slice(18*(this.state.page-1), this.state.persons.length)} /> : null}
        </div>
        <div onClick={this.displayNoms} >
          {this.displayViewButton()}
        </div>
      </div>
    );
  }
}

class RestOfNoms extends Component {
  render() {
    return (
      <div className="pageBody">
        {this.props.nominees.map((x, i) =>
          <Nominee userId={this.props.userID} isLoggedIn={this.props.isLoggedIn} promptForLogin={this.props.promptForLogin} image={this.props.nominees.slice(i, i+1).map(person => <p>{person.image}</p>)} name={this.props.nominees.slice(i, i+1).map(person => <p>{person.name}</p>)} description={this.props.nominees.slice(i, i+1).map(person => <p>{person.description}</p>)} duas={this.props.nominees.slice(i, i+1).map(person => <p>{person.duas}</p>)} id={this.props.nominees.slice(i, i+1).map(person => <p>{person.id}</p>)} country={this.props.nominees.slice(i, i+1).map(person => <p>{person.country}</p>)} />)}
      </div>
    )
  }
}

class Nominee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: '',
      image: person
    }
  }

  componentDidMount() {
    const country = this.props.country[0].props.children;
    if(country === "Australia") {
      this.setState({
        flag: australia_flag
      });
    } else if (country === "United States") {
      this.setState({
        flag: america_flag
      });
    } else if (country === "England") {
      this.setState({
        flag: england_flag
      });
    } else {
      this.setState({
        flag: canada_flag
      });
    }

    const image = this.props.image[0].props.children
    if (image !== "") {
      this.setState({
        image: image
      });
    }
  }

  render() {
    return (
      <div className="columns" style={{
        position: 'relative'
      }}>
        <ul className="person">
          <li className="header">
            <p className="nominee_name">{ this.props.name }</p>
            <img className="nominee_flag" src={this.state.flag} alt="logo" />
          </li>
          <div className='person content'>
            <img src={this.state.image} className="person-logo" alt="logo" />
            <Well bsSize="large" className="well">{ this.props.description }</Well>
          </div>
          <li className="dua">
            <Dua duas = { this.props.duas } id = { this.props.id } isLoggedIn = {this.props.isLoggedIn} promptForLogin={this.props.promptForLogin} userId={this.props.userId} />
          </li>
        </ul>
      </div>
    );
  }
}

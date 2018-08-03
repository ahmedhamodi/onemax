import React, { Component } from 'react';
import person from './images/person.png';
import { toast } from 'react-toastify';
import Dua from './dua.js';
import canada_flag from './images/Canada.png';
import america_flag from './images/America.png';
import england_flag from './images/England.png';
import australia_flag from './images/Australia.png';
import './index.css';

export default class Nominees extends Component {

  state = {
    showNoms: false
  }

  promptForLogin = () => toast.error("Login to submit nominations and give Duas!", {
    position: toast.POSITION.TOP_LEFT
  });

  displayNoms = () => {
    this.setState({ showNoms: true })
  }

  displayViewButton = () => {
    if (this.props.nominees.length > 3) {
      return (<button class="action-button">View More Nominees</button>)
    } else {
      return null
    }
  }

  render() {
    return (
      <body>
        {this.props.nominees.slice(0,3).map((x, i) =>
          <Nominee userId={this.props.userID} isLoggedIn={this.props.isLoggedIn} promptForLogin={this.promptForLogin} name={this.props.nominees.slice(i, i+1).map(person => <p>{person.name}</p>)} description={this.props.nominees.slice(i, i+1).map(person => <p className="description">{person.description}</p>)} duas={this.props.nominees.slice(i, i+1).map(person => <p>{person.duas}</p>)} id={this.props.nominees.slice(i, i+1).map(person => <p>{person.id}</p>)} image={this.props.nominees.slice(i, i+1).map(person => <p>{person.image}</p>)} country={this.props.nominees.slice(i, i+1).map(person => <p>{person.country}</p>)} />)}
        
        <div onClick={this.displayNoms} >
          {this.state.showNoms ? <RestOfNoms userId={this.props.userID} isLoggedIn={this.props.isLoggedIn} promptForLogin={this.promptForLogin} nominees={this.props.nominees.slice(3, this.props.nominees.length)} /> : this.displayViewButton()}
        </div>
      </body>
    );
  }
}

class RestOfNoms extends Component {
  render() {
    return (
      <body>
        {this.props.nominees.map((x, i) =>
          <Nominee userId={this.props.userID} isLoggedIn={this.props.isLoggedIn} promptForLogin={this.props.promptForLogin} image={this.props.nominees.slice(i, i+1).map(person => <p>{person.image}</p>)} name={this.props.nominees.slice(i, i+1).map(person => <p>{person.name}</p>)} description={this.props.nominees.slice(i, i+1).map(person => <p className="description">{person.description}</p>)} duas={this.props.nominees.slice(i, i+1).map(person => <p>{person.duas}</p>)} id={this.props.nominees.slice(i, i+1).map(person => <p>{person.id}</p>)} country={this.props.nominees.slice(i, i+1).map(person => <p>{person.country}</p>)} />)}
      </body>
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
            { this.props.description }
          </div>
          <li className="dua">
            <Dua duas = { this.props.duas } id = { this.props.id } isLoggedIn = {this.props.isLoggedIn} promptForLogin={this.props.promptForLogin} userId={this.props.userId} />
          </li>
        </ul>
      </div>
    );
  }
}

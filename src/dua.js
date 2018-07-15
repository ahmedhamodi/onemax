import React, { Component } from 'react';
import './index.css';
import dua from './images/dua_icon.png';
import axios from 'axios';

export default class Dua extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      duas: "",
      id: ""
    };
  }

  increaseDuas = () => {
    var self = this;
    var duaNomineeID = new FormData();
    duaNomineeID.set('nominee_id', this.state.id[0].props.children)
    console.log(this.state.id[0].props.children)
    axios({
      method: 'post',
      url: 'https://fast-cove-41298.herokuapp.com/dua',
      data: duaNomineeID,
      config: { headers: {'Content-Type': 'multipart/form-data'}}
    })
    .then(function (response) {
      console.log(response);
      self.setState((prevState) => ({ duas: response.data.duas }))
    })
    .catch(function (response) {
      console.log(response);
    });
  }

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  componentDidMount() {
    this.sleep(500).then(() => {
      this.setState((prevState) => ({ duas: this.props.duas, id: this.props.id }));
    })
  }

  render() {
    return (
      <div>
        <a href="#button" className="button" hidden={!this.props.isLoggedIn}>
          <img src={dua} alt="Give Dua" height="60" width="60" className="dua_button" onClick={this.increaseDuas}/>
          <p> { this.state.duas } </p>
        </a>
        <div hidden={this.props.isLoggedIn}>
          <img src={dua} alt="Give Dua" height="60" width="60" className="dua_button" onClick={this.props.promptForLogin}/>
          <p> { this.state.duas } </p>
        </div>
      </div>
    );
  }
}
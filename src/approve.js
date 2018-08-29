import React, { Component } from 'react';
import Nominees from './nominee.js';
import { toast } from 'react-toastify';

class Approve extends Component {
  constructor(props) {
    super(props);
    this.promptForLogin = this.promptForLogin.bind(this);

    this.state = {
    };
  }

  promptForLogin = () => toast.error("Login to submit nominations and give Duas!", {
    position: toast.POSITION.TOP_LEFT
  });

  render() {
    return (
      <div className='container'>
        <Nominees approve={true} userId={this.props.userID} isLoggedIn={this.props.isLoggedIn} promptForLogin={this.promptForLogin} />
      </div>
    );
  }
}

export default Approve;

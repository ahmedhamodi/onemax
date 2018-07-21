import React, { Component } from 'react';
import './index.css';
import FacebookLogin from 'react-facebook-login';
import {Image} from 'react-bootstrap';

export default class LoginAuthentication extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  responseFacebook = response => {
    if (response.userID) {
      this.props.onLogin(response);
      this.setState({
        isLoggedIn: true,
        userID: response.userID,
        name: response.name,
        firstName: response.name.substr(0, response.name.indexOf(' ')),
        email: response.email,
        picture: response.picture.data.url
      });
    } else {
      console.log('facebook login cancelled!')
    }
  }

  render() {
    let fbContent;
    if (this.state.isLoggedIn) {
      fbContent = (
        <div>
          <div style={{
            display: 'inline-block',
            paddingRight: '5px',
            paddingBlockEnd: '15px',
            color: 'black'
          }}>
            <b>{this.state.name}</b>
          </div>
          <div style={{
            display: 'inline-block'
          }}>
            <Image src={this.state.picture} alt={this.state.name} circle style={{
              width: '35px'
            }} />
          </div>
        </div>
      )
    } else {
      fbContent = (<FacebookLogin
        appId="420085661839053"
        autoLoad={true}
        size="small"
        fields="name,email,picture"
        callback={this.responseFacebook}
        cssClass="btn btn-primary"
        icon="fa-facebook"
        textButton=" Login"
      />
      );
    }

    return (
      <div>
        {fbContent}
      </div>
    )
  }
}

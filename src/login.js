import React, { Component } from 'react';
import './index.css';
import FacebookLogin from 'react-facebook-login';

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
        <div style={{
          width: 'fit-content',
          background: '#4c69ba',
          padding: '5px 10px'
        }}>
          <div style={{
            display: 'inline-block'
          }}>
            <img src={this.state.picture} alt={this.state.name} style={{
              borderRadius: '50%',
              width: '35px'
            }} />
          </div>
          <div style={{
            display: 'inline-block',
            paddingLeft: '5px',
            color: 'white'
          }}>
            <b>{this.state.name}</b>
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
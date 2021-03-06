import React, { Component } from 'react';
import './index.css';
import FacebookLogin from 'react-facebook-login';
import { Image } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

export default class LoginAuthentication extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    let userId = localStorage.getItem('userId')
    if (userId !== null) {
      this.setState({
        isLoggedIn: true,
        userID: userId,
        name: localStorage.getItem('userName'),
        picture: localStorage.getItem('picture')
      })
    }
  }

  responseFacebook = response => {
    if (response.userID) {
      this.props.onFacebookLogin(response);
      this.setState({
        isLoggedIn: true,
        userID: response.userID,
        name: response.name,
        firstName: response.name.substr(0, response.name.indexOf(' ')),
        email: response.email,
        picture: response.picture.data.url
      });
      localStorage.setItem('userId', this.state.userID)
      localStorage.setItem('userName', this.state.name)
      localStorage.setItem('picture', this.state.picture)
      localStorage.setItem('email', this.state.email)
    } else {
      console.error('facebook login cancelled!')
    }
  }

  responseGoogle = response => {
    let resp = response.profileObj;
    this.props.onGoogleLogin(resp);
    this.setState({
      isLoggedIn: true,
      userID: resp.googleId,
      name: resp.name,
      firstName: resp.givenName,
      email: resp.email,
      picture: resp.imageUrl
    });
    localStorage.setItem('userId', this.state.userID)
    localStorage.setItem('userName', this.state.name)
    localStorage.setItem('picture', this.state.picture)
    localStorage.setItem('email', this.state.email)
  }

  responseGoogleFailure = response => {
    console.error('Google login failed with error: ' + response.error)
  }

  logout() {
    localStorage.clear();
    this.setState({
      isLoggedIn: false
    })
    this.props.logout();
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
          <div style={{
            display: 'inline-block',
            paddingLeft: "2px"
          }}>
          <button className="btn btn-default" onClick={this.logout}>Logout</button>
          </div>
        </div>
      )
    } else {
      fbContent = (
        <div>
          <span style={{
            paddingRight: '5px'
          }}>
            <FacebookLogin
              appId="420085661839053"
              autoLoad={false}
              size="small"
              fields="name,email,picture"
              callback={this.responseFacebook}
              cssClass="btn btn-primary"
              icon="fa-facebook"
              textButton=" Login"
              cookie={true}
              xfbml={true} />
          </span>
          <span>
            <GoogleLogin
              clientId="101360625450-ue0985k518agnrpo9semq7jjrp59j5ke.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogleFailure}
              className="btn btn-danger" >
              <FontAwesomeIcon icon={faGoogle} />
              <span> Login</span>
            </GoogleLogin>
          </span>
        </div>
      );
    }

    return (
      <div>
        {fbContent}
      </div>
    )
  }
}

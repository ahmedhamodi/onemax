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

    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        firstName: '',
        email: '',
        picture: ''
    }

    componentClicked = () => {
        console.log("Commencing facebook login!");
    }
    responseFacebook = response => {
        this.props.onLogin(response);
        this.setState({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            firstName: response.name.substr(0,response.name.indexOf(' ')),
            email: response.email,
            picture: response.picture.data.url
        });
    }

    render() {
        let fbContent;
        if (this.state.isLoggedIn) {
            fbContent = (
              <fade>
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
                      }}/>
                    </div>
                    <div style={{
                        display: 'inline-block',
                        paddingLeft: '5px',
                        color: 'white'
                    }}>
                      <b>{this.state.name}</b>
                    </div>
                </div>
              </fade>
            )
        } else {
            fbContent = (<FacebookLogin
                appId="420085661839053"
                autoLoad={true}
                size="small"
                fields="name,email,picture"
                onClick={this.componentClicked}
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
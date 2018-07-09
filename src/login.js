import React, { Component } from 'react';
import './index.css';

export default class LoginAuthentication extends Component {

  componentDidMount() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId            : '621748698201197',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v3.0'
      });

      window.FB.Event.subscribe('auth.statusChange', (response) => {
        if (response.authResponse) {
          this.updateLoggedInState(response)
        } else {
          this.updateLoggedOutState()
        }
      });
    }.bind(this);

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  render() {
    return (
      <div class="fb-login-button" data-max-rows="1" data-size="small" data-button-type="continue_with" data-use-continue-as="true">Login with Facebook</div>
    );
  }
}
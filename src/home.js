import React, { Component } from 'react';
import Nominees from './nominee.js';
import { toast } from 'react-toastify';
import { Jumbotron, Button, Panel, Glyphicon } from 'react-bootstrap';
import collage from './images/landing_page_video.gif';

class Home extends Component {
  constructor(props) {
    super(props);
    this.promptForLogin = this.promptForLogin.bind(this);

    this.state = {
      persons: [],
      open: true
    };
  }

  promptForLogin = () => toast.error("Login to submit nominations and give Duas!", {
    position: toast.POSITION.TOP_LEFT
  });

  render() {
    return (
      <div className='container'>
        <Panel id="collapsible-panel-example-1" expanded={this.state.open} style={{
          backgroundColor: "white", 
          paddingTop: "30px"
        }}>
          <Panel.Collapse>
            <Panel.Body>
              <Jumbotron style={{
                backgroundColor: "white",
                paddingBottom: '0px',
                marginBottom: '0px'
              }}>
                <p><img style={{ 'paddingBottom': '20px' }} width="100%" alt="900x500" src={collage} /></p>
                <div className="gray-background">
                  <h2 style={{
                    'border-top': 'solid 3px #015C89',
                    'color': '#015C89'
                  }}>
                    <br/><b>What is ONEMAX?</b>
                  </h2>
                  <p style={{
                    'color': '#015C89',
                    'font-size': '20px',
                    paddingBottom: '20px',
                    paddingLeft: '75px',
                    paddingRight: '75px'
                  }}>
                    Across the world, Muslims are doing brilliant and leading edge work, while also being compassionate human beings. We want to showcase the small and big acts Muslims are doing to make their community a better place! Help us recognize and celebrate your local Muslim hero, and let's create a culture of positivity around Muslims trying to make a difference.
                  </p>
                </div>
                <div className="white-background">
                  <h2 style={{
                    'border-top': 'solid 3px #015C89',
                    'color': '#015C89'
                  }}>
                    <br/><b>Get Started</b>
                  </h2>
                  <p style={{
                    'color': '#015C89',
                    'font-size': '20px',
                  }}>1. Upload a picture of the individual.</p>
                  <p style={{
                    'color': '#015C89',
                    'font-size': '20px'
                  }}>2. Write a short blurb on what they are doing.</p>
                  <p style={{
                    'color': '#015C89',
                    'font-size': '20px',
                    paddingBottom: '20px'
                  }}>3. Share for the world to see!</p>
                </div>
                <div className="gray-background">
                  <h2 style={{
                    'border-top': 'solid 3px #015C89',
                    'color': '#015C89'
                  }}>
                    <br/><b>Recognition</b>
                  </h2>
                  <p style={{
                    'color': '#015C89',
                    'font-size': '20px',
                    'border-bottom': 'solid 3px #015C89',
                    paddingBottom: '20px',
                    paddingLeft: '75px',
                    paddingRight: '75px'
                  }}>You can show your support by giving duas (prayers) to these Muslim individuals. Under each nominee there is a dua button which illustrates your support for them. It indicates that you are giving them duas (prayers) for their actions and their continued success in the future.</p>
                </div>
              </Jumbotron>
            </Panel.Body>
          </Panel.Collapse>
          <Button onClick={() => this.setState({ open: !this.state.open })}>
            {this.state.open === true ? <Glyphicon glyph="glyphicon glyphicon-chevron-up" /> : <Glyphicon glyph="glyphicon glyphicon-chevron-down" />}
          </Button>
        </Panel>
        <Nominees userId={this.props.userID} isLoggedIn={this.props.isLoggedIn} promptForLogin={this.promptForLogin} />
      </div>
    );
  }
}

export default Home;

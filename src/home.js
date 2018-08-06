import React, { Component } from 'react';
import Nominees from './nominee.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Jumbotron, Button, Panel, Glyphicon } from 'react-bootstrap';
import collage from './images/collage_of_words.gif';

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

  componentDidMount() {
    axios.get('https://fast-cove-41298.herokuapp.com/nominations')
      .then(res => {
        const persons = res.data
        this.setState({ persons });
      });
  }

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
                backgroundColor: "white"
              }}>
                <p>
                  <img width="100%" alt="900x500" src={collage} />
                </p>
                <h3>Who is your local Muslim Hero?</h3>
                  <p>
                    Muslims are amazing human beings doing brilliant & leading edge work, while also being compassionate people.
                    Let’s show everyone that Muslims are making the world a better place, one step at a time.
                  </p>
                <h3><br/><br/>How to get started</h3>
                  <p>We want to showcase the small and big acts Muslims are doing to make their community a better place! Help us recognize and celebrate your local Muslim hero, and let's create a culture of positivity around Muslims trying to make a difference. Do you know a Muslim in your community you want to recognize?</p> 
                  <p>1. Take a picture of the individual</p>
                  <p>2. Write a short blurb on what they are doing</p>
                  <p>3. Share for the world to see</p>
                <h3><br/><br/>How to support these Heroes?</h3>
                  <p>You can show your support by giving duas to these Muslim individuals. Under each nominee there is a dua button which illustrates your support for them. It indicates that you are giving them duas for their actions and their continued success in the future.</p>
              </Jumbotron>
            </Panel.Body>
          </Panel.Collapse>
          <Button onClick={() => this.setState({ open: !this.state.open })}>
            {this.state.open === true ? <Glyphicon glyph="glyphicon glyphicon-chevron-up" /> : <Glyphicon glyph="glyphicon glyphicon-chevron-down" />}
          </Button>
        </Panel>

        <Nominees userId={this.props.userID} isLoggedIn={this.props.isLoggedIn} promptForLogin={this.promptForLogin} nominees={this.state.persons} />
      </div>
    );
  }
}

export default Home;
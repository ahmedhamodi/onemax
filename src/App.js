import React, { Component } from 'react';
import logo from './images/onemax.png';
import person from './images/person.png';
import Nominee from './nominee.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        
        <body>
          <div class="topnav" id="myTopnav" role="navigation">
            <a href="#" class="active">Home</a>
            <a href="#">Search</a>
            <a href="#">Login</a>
          </div>

          <Nominee name="Name of Nominee" description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium."/>

          <Nominee name="Name of Nominee" description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium."/>

          <Nominee name="Name of Nominee" description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium."/>

        </body>

      </div>
    );
  }
}

export default App;

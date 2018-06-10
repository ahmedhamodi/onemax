import React, { Component } from 'react';
import logo from './images/onemax.png';
import person from './images/person.png';
import nominee from 'nominee.js'
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

          <div class="columns">
            <ul class="person">
              <li class="header">NAME</li>
              <img src={person} className="person-logo" alt="logo" />
              <p class="description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.</p>
              <li class="dua"><a href="#" class="button">Give Dua</a></li>
            </ul>
          </div>

          <div class="columns">
            <ul class="person">
              <li class="header">NAME</li>
              <img src={person} className="person-logo" alt="logo" />
              <p class="description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.</p>
              <li class="dua"><a href="#" class="button">Give Dua</a></li>
            </ul>
          </div>

          <div class="columns">
            <ul class="person">
              <li class="header">NAME</li>
              <img src={person} className="person-logo" alt="logo" />
              <p class="description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.</p>
              <li class="dua"><a href="#" class="button">Give Dua</a></li>
            </ul>
          </div>

        </body>

      </div>
    );
  }
}

export default App;

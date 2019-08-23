import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import elecServices from './services/location'
class App extends Component {
  generateid() {
    var text = '';
    var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

  }
  
  constructor(props) {
    super(props);
    this.id = this.generateid();
    this.state = {
      isLoading: true,
      myPosition: {
        latitude: 0,
        longitude: 0,
        timestamp: 0,
      },
      users: {},
    };
    this.socket = io.connect('http://localhost:5000');
  }

  componentDidMount() {
    elecServices.emitLocation(this.socket,this.state.myPosition,this);
  }
  render() {
  elecServices.getUserLocation(this);
  return (
    <div className="App">
      <header className="App-header">
      ELECTRICIAN client
      </header>
    </div>
  );
}
}

export default App;

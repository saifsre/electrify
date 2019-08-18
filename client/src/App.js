import React,  {Component} from 'react';
import logo from './logo.svg';
import './App.css';
const io = require('socket.io-client');
class App extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect('http://localhost:5000');
  }
  componentDidMount(){
    this.socket.emit('position', {
      data: '123'
    });
  }
  render() {
    this.socket.on('otherPositions', positionsData => {
      // console.log('positionsData from server broadcast')
      console.log(positionsData)
    });
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
}

export default App;

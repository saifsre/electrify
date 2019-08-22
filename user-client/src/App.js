import React, {Component} from 'react';
import { Provider, Heading, Subhead } from 'rebass'
import {
  Hero, CallToAction, ScrollDownIndicator
} from 'react-landing-page'
import ElecModal from './stateless/electricians_modal';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      landingPage : true,
      searchBox : false
    }
  }
  closeModal = () => {
    this.setState({searchBox: false, landingPage: true})
    console.log('called!')
  }
  handleClick = () => {
    this.setState({searchBox: true, landingPage: false }, ()=> {
      console.log(this.state);
    })
  }
  render() {
  return (
    <div className="App"> 
   <div hidden = {!this.state.landingPage}>
    <Provider>
    <Hero
      color="black"
      bg="white"
      backgroundImage="https://source.unsplash.com/jxaj-UrzQbc/1600x900"
    >
        <Heading>Welcome to Electrify</Heading>
        <Subhead>Find your electrician</Subhead>
        <CallToAction onClick= {this.handleClick}>Search</CallToAction>
        <ScrollDownIndicator/>
    </Hero>
  </Provider> 
  </div> 
  <ElecModal show = {this.state.searchBox} closeModal = {this.closeModal}/>
    </div>
  );
}
}

export default App;

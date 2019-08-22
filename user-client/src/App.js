import React, {Component} from 'react';
import { Provider, Heading, Subhead } from 'rebass'
import {
  Hero, CallToAction, ScrollDownIndicator
} from 'react-landing-page'
import ElecModal from './stateless/electricians_modal';
import * as UserService from './services/UserServices';
const ctastyle = {
  margin:  '30px',
  backgroundColor: "orange"

}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      landingPage : true,
      searchBox : false,
      loading: false,
      user: null
    };
  }
  componentDidMount() {
    UserService.getUserLocation().then((position)=>{
      this.setState({user:position});
     }).catch((err)=>{console.log(err)});}
   closeModal = () => {
    this.setState({searchBox: false, landingPage: true})
  }
  handleClick = () => {
    this.setState({searchBox: true}, ()=> {
      UserService.getElectriciansNearby(this.state.user).then((data)=>{}).catch((err)=>{
        console.log(err);
      });
     // this.getElectriciansNearby(this.state.user);
    })
  }
  render() {
  return (
    <div className="App"> 
    <Provider>
    <Hero
      color="black"
      bg="white"
      backgroundImage="https://source.unsplash.com/jxaj-UrzQbc/1600x900"
    >
        <Heading>Welcome to Electrify</Heading>
        <Subhead>Find your electrician</Subhead>
        <CallToAction onClick= {this.handleClick} style = {ctastyle}>Search</CallToAction>
        <ScrollDownIndicator/>
    </Hero>
  </Provider> 
  <ElecModal show = {this.state.searchBox} closeModal = {this.closeModal}/>
    </div>
  );
}
}

export default App;

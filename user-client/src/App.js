import React, {Component} from 'react';
import { Provider, Heading, Subhead } from 'rebass'
import {
  Hero, CallToAction, ScrollDownIndicator
} from 'react-landing-page'
import ElecModal from './stateless/electricians_modal';
import * as UserService from './services/UserServices';
import Spinner from 'react-bootstrap/Spinner'

const ctastyle = {
  margin:  '30px',
  backgroundColor: "orange"

}
const spinnerStyle = {
  width: '100px',
	height: '100px',	
	position: 'absolute',
	top:0,
	bottom: 0,
	left: 0,
	right: 0,
  	
	margin: 'auto',
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      landingPage : true,
      searchBox : false,
      loading: false,
      user: null,
      elecs: null
    };
  }
  async componentDidMount() {
    this.setState({loading:true})
    await UserService.getUserLocation().then(async(position)=>{
      await this.setState({user:position});
     }).catch((err)=>{console.log(err)}).finally(()=> {
      this.setState({loading:false})

     })
     ;}

   closeModal = () => {
    this.setState({searchBox: false, landingPage: true})
  }
  handleClick = () => {
    this.setState({loading:true}, async ()=> {
      await UserService.getElectriciansNearby(this.state.user).then((data)=>{
       this.setState({elecs: data.data}, ()=>{
         this.setState({searchBox: true}, ()=> {
           console.log("Opened. ");
           console.log(this.state);
         })
       })
      })
      .catch((err)=>{
        alert(err)
      }).finally((err)=> {
        
        this.setState({loading:false})
      });
    })
  }
  render() {
    var component = null;
    if(this.state.loading) {
      component = 
      <div style= {spinnerStyle}>
      <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
      </Spinner>
      </div>
    }
    else {
      component = <div>
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
    <ElecModal show = {this.state.searchBox} closeModal = {this.closeModal} elecs = {this.state.elecs}/>
    </div>
    }
  return (
    <div className="App" > 
    {component}
    </div>
  );
}
}

export default App;

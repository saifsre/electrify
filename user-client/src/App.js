import React, {Component} from 'react';
import { Provider, Heading, Subhead } from 'rebass'
import {
  Hero, CallToAction, ScrollDownIndicator
} from 'react-landing-page'
import ElecModal from './stateless/electricians_modal';
import * as UserService from './services/UserServices';
import Spinner from 'react-bootstrap/Spinner'
import * as OrderService from './services/orderElectrician';
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
      isMap: false,
      landingPage : true,
      searchBox : false,
      loading: false,
      user: null,
      elecs: [],
      chatBox: false,
      selectedElec: null
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
    this.setState({searchBox: false, landingPage: true, chatBox: false})
  }

  handleOrder = async (id) => {
    await OrderService.orderElectrician(id, this.state.user).then((res)=>{
      console.log("Success!");
      alert("The requested electrician has been ordered!")
      this.setState({chatBox: true, selectedElec: id});
    }).catch((err)=>{
      console.log(err);
    });

    this.state.isMap = !this.state.isMap;
  }

  handleChatBox = () => {
    console.log("Chatbox on!");
  }

  handleClick = () => {
    this.setState({loading:true}, async ()=> {
      await UserService.getElectriciansNearby(this.state.user).then((data)=>{
       this.setState({elecs: data.data}, ()=>{
         if(this.state.elecs.length == 0){
           alert("No electrician nearby!")
         }
         else {this.setState({searchBox: true, isMap: false, chatBox: false}, ()=> {
         })
        }
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
    <ElecModal user = {this.state.user} selectedElec = {this.state.selectedElec} handleOrder = {this.handleOrder} show = {this.state.searchBox} isChat = {this.state.chatBox} closeModal = {this.closeModal} elecs = {this.state.elecs}/>
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

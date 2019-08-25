import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import elecServices from './services/location';
import { Provider, Heading, Flex } from 'rebass';
import {
  Feature,Hero, CallToAction, ScrollDownIndicator, Subhead
} from 'react-landing-page';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner'

import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import ElecMap from './components/map'
const headingStyle = {
  color: "white",
  fontSize: "50px"
}

const Login = (props)=> {

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
const SignUpForm = (props) => {
  return (
  <>
  <Form>
    <Form.Row>
    <Form.Group as={Col} controlId="formGridName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" placeholder="Enter Name" onChange = {e => props.handleInputs(e.target.value,"name")}/>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange = {e => props.handleInputs(e.target.value,"email")}/>
      </Form.Group>
  
      <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange = {e => props.handleInputs(e.target.value,"password")}/>
      </Form.Group>
    </Form.Row>
  
    <Form.Group controlId="formGridAddress1">
      <Form.Label>Address</Form.Label>
      <Form.Control placeholder="1234 Main St" onChange = {e => props.handleInputs(e.target.value,"address1")}/>
    </Form.Group>
  
    <Form.Group controlId="formGridAddress2">
      <Form.Label>Address 2</Form.Label>
      <Form.Control placeholder="Apartment, studio, or floor" onChange = {e => props.handleInputs(e.target.value, "address2")}/>
    </Form.Group>
  
    <Form.Row>
      <Form.Group as={Col} controlId="formGridCity">
        <Form.Label>City</Form.Label>
        <Form.Control onChange = {e => props.handleInputs(e.target.value, "city")}/>
      </Form.Group>
  
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>State</Form.Label>
        <Form.Control onChange = {e => props.handleInputs(e.target.value, "state")}/>
      </Form.Group>
  
      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label>Zip</Form.Label>
        <Form.Control onChange = {e => props.handleInputs(e.target.value, "zip")}/>
      </Form.Group>
    </Form.Row>
  </Form>
  </>
  )
}
const SignUp = (props) => {

  return (
    <>
      <Modal show = {props.show} >
        <Modal.Header >
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body><SignUpForm handleInputs = {props.handleInputs}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick = {props.closeSignUp}>
            Cancel
          </Button>
          <Button variant="primary" onClick = {props.handleSubmit} >
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const ctaStyle = {
  backgroundColor: "orange",
  marginLeft: "5px"
}
const checkinStyle  = {
  margin: "10px"
}
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
      isLoading: false,
      myPosition: {
        latitude: 0,
        longitude: 0,
        timestamp: 0,
      },
      users: {},
      registerForm: false,
      loginForm: false,
      formInputs: {name: "", email: "", password: "", address1: "", address2: "", city: "", state: "", zip: ""},
      signIninputs:{emailSignIn:"",passwordSignIn:"",
      isLoggedIn: false
    },
    interval: null,
    electrician: {}
    }
    this.socket = io.connect('http://localhost:5000');
  }

  handleSubmit = () => {
    if(this.state.formInputs.name == "" || this.state.formInputs.email == "" ||
    this.state.formInputs.password == "" || this.state.formInputs.address1 == "" ||
    this.state.formInputs.address2 == "" || this.state.formInputs.city == "" ||
    this.state.formInputs.state == "" || this.state.formInputs.zip == "") {
      alert("Please completely fill up the form!")
    }
    else {
      this.setState({isLoading: true}, ()=>{
        const payload = {
          electrician: {
            name: this.state.formInputs.name,
            password: this.state.formInputs.password,
            email: this.state.formInputs.email
          },
          address: {
            address1: this.state.formInputs.address1,
            address2: this.state.formInputs.address2,
            zip: this.state.formInputs.zip,
            city: this.state.formInputs.city,
            state: this.state.formInputs.state
          }
        };
        console.log(payload)
  
        axios('http://localhost:4000/electrician/save',{
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          data: payload
        }).then((response)=> {
          this.setState({registerForm:false})
          console.log(response);
        })
        .catch((err) => {
          alert(err.message);
        }).finally(()=>{
          this.setState({isLoading:false, formInputs: {name: "", email: "", password: "", address1: "", address2: "", city: "", state: "", zip: ""}})
        })
      })

    }

  }

  handleInputs = (value, type) => {
    switch(type) {
      case "name": this.state.formInputs.name = value ;
      break;
      case "email": this.state.formInputs.email = value;
      break;
      case "password": this.state.formInputs.password = value;
      break;
      case "address1": this.state.formInputs.address1 = value;
      break;
      case "address2": this.state.formInputs.address2 = value;
      break;
      case "city": this.state.formInputs.city = value;
      break;
      case "state": this.state.formInputs.state = value;
      break;
      case "zip": this.state.formInputs.zip = value;
      break;
      case "emailSignIn": this.state.signIninputs.emailSignIn = value;
      break;
      case "passwordSignIn": this.state.signIninputs.passwordSignIn = value;
    }
    }
   
  handleSignUp = () => {
    this.setState({registerForm: true})
  }
  handleSignIn = () => {
    this.setState({isLoading: true}, ()=> {
      var creds = {
        email: this.state.signIninputs.emailSignIn,
        password: this.state.signIninputs.passwordSignIn
      }
      axios('http://localhost:4000/electrician/signin',{
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        data: creds
      }).then(async(response)=> {
        await this.setState({electrician:response.data}, async()=>{
          alert("Successfully logged in!");
          await this.emitLocation();
          this.setState({isLoggedIn: true}, async ()=>{
            this.state.interval = setInterval(async()=>{
              this.emitLocation();
            },5000)
          });
        })

      })
      .catch((err) => {
        alert("Invalid login");
        console.log(err);
      }).finally(()=>{
        this.setState({isLoading:false})
      })
    })       
  }
  closeSignUp = () => {
    this.setState({registerForm: false})
  }
  emitLocation = async () => {
    await elecServices.emitLocation(this.socket,this.state.myPosition,this);
  }
  componentDidMount() {
    //elecServices.emitLocation(this.socket,this.state.myPosition,this);
  }
  render() {
  //elecServices.getUserLocation(this);
  var component = null;
  if(this.state.isLoading) {
    component = 
    <div style= {spinnerStyle}>
    <Spinner animation="border" role="status">
    <span className="sr-only">Loading...</span>
    </Spinner>
    </div>
  }else if(!this.state.isLoading && !this.state.isLoggedIn){
    component = 
    <div className="App">
    <Hero
  color='white'
  backgroundImage='https://source.unsplash.com/Vwf8q3RzBRE/1600x900'
  bg='black'
  bgOpacity={0.5}
>
   <Heading style = {headingStyle}>Electricians Portal</Heading>
    <Flex mt={4}>
    <div>
    <InputGroup size="lg" >
    <InputGroup.Prepend>
    </InputGroup.Prepend>
    <FormControl placeholder="Email"
     aria-label="Large" aria-describedby="inputGroup-sizing-sm" 
     onChange = {e => this.handleInputs(e.target.value, "emailSignIn")}/>
    <FormControl type= "password" placeholder="Password"
     aria-label="Large" aria-describedby="inputGroup-sizing-sm" 
     onChange = {e => this.handleInputs(e.target.value, "passwordSignIn")}/>
    </InputGroup>
    </div>
      <CallToAction style = {ctaStyle} bg='blue' mr={4} onClick = {this.handleSignIn}>Check in </CallToAction>
      <CallToAction style = {ctaStyle} onClick = {this.handleSignUp}>Register</CallToAction>
  </Flex>
  <SignUp closeSignUp = {this.closeSignUp} show={this.state.registerForm} handleInputs = {this.handleInputs} handleSubmit = {this.handleSubmit}/>
  </Hero>
  </div>
  } else if(this.state.isLoggedIn && !this.state.isLoading) {
    component =  <ElecMap mypos={this.state.myPosition} me={this.state.electrician}/>
  }
  return (
    <div className="App">
    {component}
    </div>
  );
}
}

export default App;

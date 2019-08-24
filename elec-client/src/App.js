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

import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
const headingStyle = {
  color: "white",
  fontSize: "50px"
}

const Login = (props)=> {

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
      <Form.Control placeholder="1234 Main St" onChange = {e => props.handleInputs(e.target.value,"address2")}/>
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
      isLoading: true,
      myPosition: {
        latitude: 0,
        longitude: 0,
        timestamp: 0,
      },
      users: {},
      registerForm: false,
      loginForm: false,
      formInputs: {name: "", email: "", password: "", address1: "", address2: "", city: "", state: "", zip: ""}
    };
   // this.socket = io.connect('http://localhost:5000');
  }

  handleSubmit = () => {
    if(this.state.formInputs.name == "" || this.state.formInputs.email == "" ||
    this.state.formInputs.password == "" || this.state.formInputs.adddress1 == "" ||
    this.state.formInputs.address2 == "" || this.state.formInputs.city == "" ||
    this.state.formInputs.state == "" || this.state.formInputs.zip == "") {
      alert("Please completely fill up the form!")
    }
    else {
      this.setState({isLoading: true}, ()=>{
        const payload = {
          electrician: {
            name: this.state.formInputs.name,
            password: this.state.formInputs.password
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
          alert("Oops, something went wrong");
          console.log(err);
        }).finally(()=>{
          this.setState({isLoading:false})
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
    }
    console.log(this.state.formInputs);
  }
    handleSignUp = () => {
    this.setState({registerForm: true})
  }
  closeSignUp = () => {
    this.setState({registerForm: false})
  }
  componentDidMount() {
  //  elecServices.emitLocation(this.socket,this.state.myPosition,this);
  }
  render() {
  //elecServices.getUserLocation(this);
  return (
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
      <FormControl placeholder="Enter your E-ID"
       aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
      </InputGroup>
      </div>
        <CallToAction style = {ctaStyle} bg='blue' mr={4}>Check in </CallToAction>
        <CallToAction style = {ctaStyle} onClick = {this.handleSignUp}>Register</CallToAction>
    </Flex>
    <SignUp closeSignUp = {this.closeSignUp} show={this.state.registerForm} handleInputs = {this.handleInputs} handleSubmit = {this.handleSubmit}/>
    </Hero>
    </div>
  );
}
}

export default App;

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Chat from '../chat.js';
const elecs = [
    {    name: 'Saif Khan',
         location: 'Vancouver',
         distance: '500m',
         description: 'Very experienced.....ratings 5 star'
        },
       
    {    name: 'Faisal Faisal',
         location: 'Vancouver',
         distance: '700m',
         description: 'Very experienced.....ratings 5 star'

    },
    ]
const buttonStyle = {
    backgroundColor: "orange"
}
const modalStyle = {
        backgroundColor: "orange",
    }
    
    const modalTitleStyle = {
        color: "white"
    }
const GenerateRows = (props) => {
   { 
       return(
        props.items.map((e,i)=> {
            return <ListGroup.Item key={i}>
                <Card>
                <Card.Body>
                <Card.Title>{e.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{e.location}</Card.Subtitle>
                <Card.Subtitle className="mb-3 text-muted">{e.distance} Away</Card.Subtitle>
                <Card.Text>
                 {e.description}
                </Card.Text>
                <Button onClick = {()=>{props.handleOrder(e.id)}}> Order </Button>
                </Card.Body>
                </Card>
                </ListGroup.Item>
       })  
    )
}
}
const ElectList = ( props) => {

    {
    return (
        <ListGroup>
            <GenerateRows items = {props.items} handleOrder = {props.handleOrder}/>
        </ListGroup>
    )
}
}

function ElecModal (props) {
    console.log(props);
    var toRender = null;
    if(props.isChat) {
        toRender = <Modal show = {props.isChat} animation= {true}>
        <Modal.Header style = {modalStyle}>
          <Modal.Title style = {modalTitleStyle}>Chatbox</Modal.Title>
        </Modal.Header>
        <Modal.Body> <Chat elec = {props.selectedElec} user = {props.user} /></Modal.Body>
        <Modal.Footer>
          <Button style = {buttonStyle} onClick = {props.closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    }
    else {
    toRender = <Modal show = {props.show && props.elecs.length !=0} animation= {true}>
    <Modal.Header style = {modalStyle}>
      <Modal.Title style = {modalTitleStyle}>Electricians Nearby</Modal.Title>
    </Modal.Header>
    <Modal.Body> <ElectList items = {props.elecs} handleOrder = {props.handleOrder} /> </Modal.Body>
    <Modal.Footer>
      <Button style = {buttonStyle} onClick = {props.closeModal}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
    }
  return (
    <div>
        {toRender}
    </div>
  )
}

export default ElecModal;
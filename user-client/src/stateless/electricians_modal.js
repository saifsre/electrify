import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import React, {Component} from 'react';
import Card from 'react-bootstrap/Card'
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
const GenerateRows = ({items}) => {
   { 
       return(
        items.map((e,i)=> {
            return <ListGroup.Item key={i}>
                <Card>
                <Card.Body>
                <Card.Title>{e.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{e.location}</Card.Subtitle>
                <Card.Subtitle className="mb-3 text-muted">{e.distance} Away</Card.Subtitle>
                <Card.Text>
                 {e.description}
                </Card.Text>
                <Card.Link href="#">Order</Card.Link>
                <Card.Link href="#">More Info</Card.Link>
                </Card.Body>
                </Card>
                </ListGroup.Item>
       })  
    )
}
}
const ElectList = ({items}) => {

    {
    return (
        <ListGroup>
            <GenerateRows items = {items} />
        </ListGroup>
    )
}
}

function ElecModal (props) {
  return (
    <div>
    <Modal show = {props.show} animation= {true}>
    <Modal.Header style = {modalStyle}>
      <Modal.Title style = {modalTitleStyle}>Electricians Nearby</Modal.Title>
    </Modal.Header>
    <Modal.Body> <ElectList items = {props.elecs}/> </Modal.Body>
    <Modal.Footer>
      <Button style = {buttonStyle} onClick = {props.closeModal}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
    </div>
  )
}

export default ElecModal;
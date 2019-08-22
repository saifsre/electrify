import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import React, {Component} from 'react';

function ElecModal (props) {
  return (
    <div>
    <Modal show = {props.show}>
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick = {props.closeModal}>
        Close
      </Button>
      <Button variant="primary">
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
    </div>
  )
}

export default ElecModal;
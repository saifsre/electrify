import React from "react";
import io from "socket.io-client";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const modalStyle = {
    width: '450px',
    overflow: 'auto' 
}
class Chat extends React.Component{
    constructor(props){
        console.log('Inside Chat Class');
        console.log(props);
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: [],
            user: props.user,
            elec: props.elec
        };

        this.socket = io('localhost:2001',{transports: ['websocket', 'polling', 'flashsocket']});
        console.log(this.socket);

        this.socket.on(this.state.user.id, (data)=> {
            addMessage(data);
        })

        const addMessage = data => {
            console.log("Message Adding!")
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message,
                electrician: this.state.elec._id,
                user: this.state.user.id
            })
            this.setState({message: ''});

        }
    }
    render(){
        return (
            <div  style = {modalStyle}>
            <Modal.Dialog>
                <Modal.Header >
                <Modal.Title>Chat</Modal.Title>
                </Modal.Header>

             <Modal.Body>
                    {this.state.messages.map(message => {
                      return (
                            <div>{message.author}: {message.message}</div>
                             )
                     })}
             </Modal.Body >
              <Modal.Footer>
              <FormControl
               placeholder="Username"
               aria-label="Username"
               aria-describedby="basic-addon1"
               value={this.state.username}
               onChange={ev => this.setState({username: ev.target.value})}
               />
             
              <FormControl
               placeholder="Message"
               aria-label="Message"
               aria-describedby="basic-addon1"
               value={this.state.message}
               onChange={ev => this.setState({message: ev.target.value})}
               />
             <Button onClick={this.sendMessage}> Send</Button>
              </Modal.Footer>
             </Modal.Dialog>
            </div>
        );
    }
}

export default Chat;
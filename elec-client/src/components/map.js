import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import Chat from './chat';
import { popupContent, popupHead, popupText, okText } from "../styles/popupStyles";

const popUpStyle = {
  width: '100px',
  height: '500px'
}
const Users = (props) => { 
console.log(props);
  { 
    return (
     props.users.map((e,i)=> {
         return <Marker position={[e.coords.latitude, e.coords.longitude]}>
          <Popup style= {popUpStyle} >
           <Chat electrician = {props.elec} user = {e}/>
           </Popup>
         </Marker>
    })  
 )
}
}

class ElecMap extends Component {

    constructor(props){
        super(props);
        this.state = {
            lat: this.props.mypos.latitude,
            lng: this.props.mypos.longitude,
            users: this.props.users,
            zoom: 13,
          };

    }
    componentDidMount() {
      
    }
    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <Map style={{ height: "100vh" }} center={position} zoom={this.state.zoom} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            {/* <Marker position={position}>
              <Popup>
                <span>Me: {this.props.me.name}</span>
              </Popup>
            </Marker> */}
            <Users users={this.state.users} elec = {this.props.me}/>
          </Map>
        )
    }
}

export default ElecMap
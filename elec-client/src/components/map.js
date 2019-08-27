import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';


const Users = (props) => { 
console.log(props);
  { 
    return (
     props.users.map((e,i)=> {
         return <Marker position={[e.coords.latitude, e.coords.longitude]}>
           <Popup>
           <span>User</span>
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
          //  users: [{lat: 28.6139, lng: 77.2090}, {lat: 28.9845, lng: 77.7064}, {lat: 29.4727, lng: 77.7085}],
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
            <Marker position={position}>
              <Popup>
                <span>Me: {this.props.me.name}</span>
              </Popup>
            </Marker>
            <Users users={this.state.users}/>
          </Map>
        )
    }
}

export default ElecMap
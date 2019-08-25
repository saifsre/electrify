import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

class ElecMap extends Component {

    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            lat: this.props.mypos.latitude,
            lng: this.props.mypos.longitude,
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
          </Map>
        )
    }
}

export default ElecMap
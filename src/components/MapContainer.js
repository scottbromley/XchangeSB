import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './MapContainer.css';


function MapContainer(props) {

    const mapStyles = {        
        height: "150px",
        width: "150px",
        mapId: "9397c458a4c2953e",
        disableDefaultUI: "true",
        className: 'map',
        overflow: 'hidden',
        borderRadius: '5px',
    };
      
    const defaultCenter = {
    lat: props.latitude, lng: props.longitude
    };

    let mapOptions = {
        disableDefaultUI: true,
        mapId: 'a923e747875797f',
        className: 'map',
    };

    var marker = {
        position: { lat: props.latitude, lng: props.longitude },
        // label: {
        //   color: 'grey',
        //   fontSize: '10px',
        //   fontWeight: '900',
        //   text: props.propertyName,
        // },
        className: 'marker__label',
    };

    const keyID = props.latitude;
    

    return (
        <div className='map__container' >
            <LoadScript
            googleMapsApiKey='AIzaSyCG_heDO8562j2wq17V0EYFUbUk5WvfAvA'>
                <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={5}
                center={defaultCenter}
                options={mapOptions}>
                    <Marker key={keyID} options={marker}/>
                </GoogleMap>
        </LoadScript>
      </div>
    )
}

export default MapContainer

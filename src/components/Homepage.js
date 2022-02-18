import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase/app";
import { useFirestoreQuery, onSnapshot } from "../hooks";
import "./Homepage.css";
import MapContainer from "./MapContainer.js";
import ToggleButton from "@mui/material/ToggleButton";
import { formatRelative } from "date-fns";
import AddNewPropertyPane from "./AddNewPropertyPane";
import PlacesAutocomplete from 'react-places-autocomplete';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import { LoadScript } from '@react-google-maps/api';

const formatDate = (date) => {
  let formattedDate = "";
  if (date) {
    formattedDate = formatRelative(date, new Date());
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

function Homepage({ userinfo, activePropertyEnvironment, handlePropertyEnvironmentToggle, setWarningMessageToggle }) {
  
  const db = firebase.firestore();
  const userIdentification = userinfo.uid;

  const [propertyInfoWidget, setPropertyInfoWidget] = useState();
  

  useEffect(() => {
    db.collection("Properties").where("AssociatedUsers", "array-contains", userinfo.uid).onSnapshot((snapshot) => {
      setPropertyInfoWidget(
        snapshot.docs.map((doc) => (
          <div
            key={doc.id}
            className={`property__tile ${
              doc.id === activePropertyEnvironment.id &&
              "highlight__selected__class"
            }`}
          >
          <img src={doc.data().PhotoURL} className="property__tile__photo" />
            {/* <MapContainer
              latitude={doc.data().Latitude}
              longitude={doc.data().Longitude}
              propertyName={doc.data().PropertyName}
              className="map__container__homepage"
            /> */}
            <div className="property__information">
              <div className="tile__property__title">
                {doc.data().PropertyName}
                <div className="tile__selector__button">
                  <ToggleButton
                    size="small"
                    className="toggle__button"
                    onClick={() =>
                      handlePropertyEnvironmentToggle({
                        id: doc.id,
                        name: doc.data().PropertyName,
                      })
                    }
                  >
                    Make Active Environment
                  </ToggleButton>
                </div>
              </div>

              <div className="tile_core__information">
                <div className="location__details">
                  <h4>Address:</h4>
                  <p>
                    {doc.data().HouseName}
                    <br />
                    {doc.data().FirstLineAddress}
                    <br />
                    {doc.data().SecondLineAddress}
                    <br />
                    {doc.data().CityState}
                    <br />
                    {doc.data().Country}
                    <br />
                    {doc.data().Postcode}
                    <br />
                  </p>
                </div>
                <div className="sale__information">
                  <p>
                    Offer date:{" "}
                    {doc.data().OfferDate &&
                      formatDate(new Date(doc.data().OfferDate.seconds * 1000))}
                    <br />
                    Agreed price: £{doc.data().PropertyPrice}
                    <br />
                  </p>
                </div>
              </div>
              <div className="tile__people__information">
                People information
              </div>
              <div className="property__tile__hint">
                      {doc.data().PropertyName === "Derby Road" && "Please select this property for a good example in the task page!"}
              </div>
            </div>
          </div>
        ))
      );
    });
  }, [activePropertyEnvironment]);

  const [ addNewPropertyToggle, setAddNewPropertyToggle ] = useState(false);

  function handlePropertyToggleButton() {
    setAddNewPropertyToggle(!addNewPropertyToggle);
  }

  



  return (
    <div className="homepage__outer">
      <div>
        {addNewPropertyToggle ? <AddNewPropertyPane userinfo={userinfo} closePane={handlePropertyToggleButton}/> : <div></div>}
      </div>
      {/* <div className="auto__complete__area">
        <GooglePlacesAutocomplete apiKey="AIzaSyD-Fxjdrzjl8DpqXZpJt1rIEymx7VJiOaQ" apiOptions={{region: 'uk'}}/>      
      </div> */}
      <div className="associated_properties__pane">
        <div className="page__title">
          <button onClick={handlePropertyToggleButton} className="add__new__property__button">Add Property</button>
          <p className="associated__property__title">{userinfo.displayName} Properties</p>
          <p id="active__environment__label">
            <em>Active property environment:</em>{" "}
            {activePropertyEnvironment.name
              ? activePropertyEnvironment.name
              : "No Environment Selected"}
          </p>
        </div>

        <div className="associated__properties___list__container">
          {propertyInfoWidget}
        </div>
      </div>
    </div>
  );
}

export default Homepage;

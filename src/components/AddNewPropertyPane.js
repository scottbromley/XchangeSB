import React, {useEffect, useState} from 'react';
import './AddNewPropertyPane.css';
import CloseIcon from '@material-ui/icons/Close';
import firebase from "firebase/app";
import { useFirestoreQuery, onSnapshot } from "../hooks";

function AddNewPropertyPane({closePane, userinfo}) {

    const db = firebase.firestore();

    const [ propertyIdToAdd, setPropertyIdToAdd ] = useState('');

    function handleInputChange(e){
        setPropertyIdToAdd(e.target.value);
    };
    
   function handleUpdateButton(e){
    e.preventDefault();
    db.collection('Properties').doc(propertyIdToAdd).update( {
        AssociatedUsers: firebase.firestore.FieldValue.arrayUnion(userinfo.uid)
     });
     closePane();
   };

    return (
        <div className='add__new__property__pane__outer'>
            <div className="add__new__property__pane__header">
                  New Property
            <CloseIcon onClick={closePane}></CloseIcon>
            </div>
            <div className="add__new__property__pane__body">
                <form onSubmit={handleUpdateButton}>
                    <input type="text" onChange={handleInputChange} value={propertyIdToAdd}>
                    </input>
                    <button type="submit">
                        Add Property
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddNewPropertyPane

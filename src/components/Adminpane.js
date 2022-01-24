import './Adminpane.css';
import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import { useFirestoreQuery, onSnapshot } from '../hooks';


function Adminpane( props ) {
    
    const db = firebase.firestore();
    const [ newAppUsers_PropertyUser, setNewAppUsers_PropetyUser ] = useState('');
    const inputRef = useRef('');
    const userUniqueId = props.userinfo.uid;

    useEffect(() =>{
        if(inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    const handleOnChange = e => {
        console.log(newAppUsers_PropertyUser);
        setNewAppUsers_PropetyUser(e.target.value);
    };

    const handleOnSubmit = e => {
        e.preventDefault();
        const trimmedEntry = newAppUsers_PropertyUser.trim();
        console.log(trimmedEntry);
        if(trimmedEntry){ 
            db.collection('AppUsers').doc(userUniqueId).update({
                InvolvedProperties: firebase.firestore.FieldValue.arrayUnion(trimmedEntry)
            });
            setNewAppUsers_PropetyUser('');
        }
    };


    return (
        <div className='admin__pane__outer'>
            <h5> Admin </h5>
            <div class='add__user__to__property'>
                <form onSubmit={handleOnSubmit}>
                    <button>Submit</button>
                    <input placeholder="Property ID" ref={inputRef} type="text" value={newAppUsers_PropertyUser} onChange={handleOnChange}/> 
                    <input placeholder="User ID"/> 
                </form>
            </div>
        </div>
    )
}

export default Adminpane

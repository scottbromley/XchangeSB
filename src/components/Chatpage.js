import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import { useFirestoreQuery, onSnapshot } from '../hooks';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
//import { FormControl, InputLabel, Input } from '@material-ui/core/FormControl';
import { FormControl, InputLabel, Input  } from '@material-ui/core';
import FlipMove from 'react-flip-move';
import './Chatpage.css';
import ReactScrollableFeed from 'react-scrollable-feed';

//Components
import Message from './Message';



const Chatpage = ({ user = null, activePropertyEnvironment}) => {

    //SECTION : QUERY AND RENDER MESSAGES
    const db = firebase.firestore();
    const propertiesRef = db.collection('Properties');
    const [propertiesList, propertiesListSetter] = useState('');
    const [messages, messagesSetter] = useState('');


    const [selectedProperty, setProperty] = useState('UbNXcB324mLDCQYptbwS');

    function selectProperty(activePropertyEnvironment){
        setProperty(activePropertyEnvironment.id)
    };

    useEffect(() => {
        console.log("a new property has been registered in the chatpage" + activePropertyEnvironment.id)
        db.collection('Properties').doc(activePropertyEnvironment.id).collection('Messages').onSnapshot(snapshot => {
            messagesSetter(snapshot.docs.sort((first, second) =>
            first?.data().createdAt?.seconds <= second?.data().createdAt?.seconds ? -1 : 1
            )
            ?.map(doc =>(
                <Message key={doc.id} user={user.uid} {...doc.data()}/>
            ))
            )
        })
    }, [selectedProperty, activePropertyEnvironment])

    useEffect(() => {
        db.collection('Properties').onSnapshot(snapshot => {
            propertiesListSetter(snapshot.docs.map(doc =>(
                <div className='property__message__tile'>
                    <button className='property__name' onClick={() => selectProperty(doc)} key={doc.id}>{doc.data().PropertyName}</button>
                    <p2 className='property__price'>{doc.data().PropertyPrice}</p2>
                </div>
                ))   
            )
        }) 
    }, [])


    //SECTION : MAKING A NEW MESSAGE
    var messagesRef = db.collection('Properties').doc(selectedProperty).collection('Messages');
    var query = messagesRef.orderBy('createdAt', 'desc').limit(100);
    //var messages = useFirestoreQuery(query);
    const [newMessage, setNewMessage] = useState('');
    const inputRef = useRef();
    const bottomListRef = useRef();
    const { uid, displayName, photoURL } = user;

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    const handleOnChange = e => {
        setNewMessage(e.target.value);
    }; 

    const handleOnSubmit = e => {
        e.preventDefault();

        const trimmedMessage = newMessage.trim();
        if (trimmedMessage) {
            messagesRef.add({
                text: trimmedMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid, 
                displayName,
                photoURL,
            });
            //clear input field
            setNewMessage('');
            //scroll to bottom of the list
            //bottomListRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }

    useEffect(()=> {
       scrollToBottom()
    }, [messages]);




    return (
        
    <div className='channel'> 
        <div className='message__area'>
            {messages}
        </div>
        <div ref={messagesEndRef} />
        <div>
            <div className="app__form">
            <FormControl variant='filled' color='primary'>
                <div> 
                    <form onSubmit={handleOnSubmit} >
                        <InputLabel shrink={true}></InputLabel>
                        <Input className='text__input' placeholder="Enter a message" ref = {inputRef} type="text" value={newMessage} onChange={handleOnChange} />
                        <Button type="submit" variant="contained" color="primary" disabled={!newMessage}>Send</Button>
                    </form>
                </div>
            </FormControl>
            </div>
        </div>
    </div>
    );
       
};


Chatpage.propTypes = {
    user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
    }),
};

export default Chatpage;
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
import './Channel.css';
import ReactScrollableFeed from 'react-scrollable-feed';


//Components
import Message from './Message';
import Homepage from './Homepage';
import Chatpage from './Chatpage';
import Taskpage from './Taskpage';

const Channel = ({ user = null }) => {

    //SECTION : SELECTING VIEW WINDOW
    const [ appEnvironment, environmentSetter ] = useState('HOME');
    const [ environmentElement, setEnvironmentElement ] = useState('')
    const { uid, displayName, photoURL } = user;
    
    const [ warningMessageToggle, setWarningMessageToggle ] = useState(true);


    function environmentSetFunction(props){
        console.log(warningMessageToggle)
        if(warningMessageToggle){
            alert("Please select an ective property environment! You can do this with the buttons to the right of each property pane.")
        } else {
            environmentSetter(props);
        }
    };

    const [activePropertyEnvironment, setActivePropertyEnvironment] = useState(
        {id: "", name: "Not Selected"}
      );
    
      function handlePropertyEnvironmentToggle(propertyDetail){
            setWarningMessageToggle(false);
            setActivePropertyEnvironment(propertyDetail);
      }

    useEffect(()=>{
        var tempEnvironmentVariable = '';
        if(appEnvironment === 'HOME'){
            tempEnvironmentVariable = <Homepage setWarningMessageToggle={setWarningMessageToggle} activePropertyEnvironment={activePropertyEnvironment} handlePropertyEnvironmentToggle={handlePropertyEnvironmentToggle} userinfo={user}/>;
        } else if (appEnvironment === 'CHAT') {
            tempEnvironmentVariable = <Chatpage user={user} activePropertyEnvironment={activePropertyEnvironment}/>;
        } else if (appEnvironment === 'TASK') {
            tempEnvironmentVariable = <Taskpage activePropertyEnvironment={activePropertyEnvironment} displayName={displayName}/>;
        }
        setEnvironmentElement(tempEnvironmentVariable)
    }, [appEnvironment, activePropertyEnvironment, displayName, user])


    return (
        
    <div className='channel'>
        <div className='sidebar'>
            <div className='sidebar__logo'>
                <svg id="logo" width="733" height="109" viewBox="0 0 733 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M83.9793 105L49.2753 58.344L14.7153 105H6.07532L44.8113 53.016L8.81132 4.19998H17.4513L49.5633 47.544L81.6753 4.19998H89.8833L53.8833 52.872L92.6193 105H83.9793Z" stroke="black" stroke-width="6" mask="url(#path-1-outside-1)"/>
                    <path d="M152.122 105.72C142.234 105.72 133.306 103.512 125.338 99.096C117.466 94.68 111.226 88.584 106.618 80.808C102.106 73.032 99.8497 64.296 99.8497 54.6C99.8497 44.904 102.106 36.168 106.618 28.392C111.226 20.616 117.466 14.52 125.338 10.104C133.306 5.68798 142.234 3.47998 152.122 3.47998C159.418 3.47998 166.138 4.67998 172.282 7.07998C178.426 9.38398 183.658 12.84 187.978 17.448L183.37 22.2C175.306 14.232 164.986 10.248 152.41 10.248C143.962 10.248 136.282 12.168 129.37 16.008C122.458 19.848 117.034 25.176 113.098 31.992C109.162 38.712 107.194 46.248 107.194 54.6C107.194 62.952 109.162 70.536 113.098 77.352C117.034 84.072 122.458 89.352 129.37 93.192C136.282 97.032 143.962 98.952 152.41 98.952C164.89 98.952 175.21 94.92 183.37 86.856L187.978 91.608C183.658 96.216 178.378 99.72 172.138 102.12C165.994 104.52 159.322 105.72 152.122 105.72Z" stroke="black" stroke-width="6" mask="url(#path-1-outside-1)"/>
                    <path d="M294.656 4.19998V105H287.312V57.048H219.92V105H212.576V4.19998H219.92V50.568H287.312V4.19998H294.656Z" stroke="black" stroke-width="6" mask="url(#path-1-outside-1)"/>
                    <path d="M392.209 76.632H333.745L320.929 105H313.009L359.377 4.19998H366.721L413.089 105H405.169L392.209 76.632ZM389.473 70.44L362.977 12.264L336.625 70.44H389.473Z" stroke="black" stroke-width="6" mask="url(#path-1-outside-1)"/>
                    <path d="M513.468 4.19998V105H507.42L438.732 17.448V105H431.388V4.19998H437.58L506.124 91.752V4.19998H513.468Z" stroke="black" stroke-width="6" mask="url(#path-1-outside-1)"/>
                    <path d="M620.67 55.032H627.726V92.76C623.31 96.984 617.934 100.2 611.598 102.408C605.358 104.616 598.734 105.72 591.726 105.72C581.742 105.72 572.718 103.512 564.654 99.096C556.686 94.68 550.398 88.584 545.79 80.808C541.278 73.032 539.022 64.296 539.022 54.6C539.022 44.904 541.278 36.168 545.79 28.392C550.398 20.616 556.686 14.52 564.654 10.104C572.718 5.68798 581.79 3.47998 591.87 3.47998C599.262 3.47998 606.03 4.67998 612.174 7.07998C618.414 9.38398 623.742 12.792 628.158 17.304L623.55 22.2C619.326 17.976 614.574 14.952 609.294 13.128C604.11 11.208 598.35 10.248 592.014 10.248C583.374 10.248 575.55 12.168 568.542 16.008C561.63 19.848 556.206 25.176 552.27 31.992C548.334 38.712 546.366 46.248 546.366 54.6C546.366 62.856 548.334 70.392 552.27 77.208C556.302 83.928 561.774 89.256 568.686 93.192C575.598 97.032 583.374 98.952 592.014 98.952C603.534 98.952 613.086 95.88 620.67 89.736V55.032Z" stroke="black" stroke-width="6" mask="url(#path-1-outside-1)"/>
                    <path d="M729.597 98.376V105H660.045V4.19998H727.437V10.824H667.389V50.568H721.101V57.048H667.389V98.376H729.597Z" stroke="black" stroke-width="6" mask="url(#path-1-outside-1)"/>
                </svg>
            </div>
           <div className={`homepage__selector ${appEnvironment === 'HOME' && 'sidebar__selected__environment'}`}>
               <button className='sidebar__button' onClick={()=>environmentSetFunction('HOME')}>
                    <div className='homepage__selector__icon' >
                        <HomeIcon fontSize='large' style={{color: "rgb(15, 4, 116)"}}/>
                    </div>
                    <span className='homepage__selector__text'>HOME</span>
               </button>
            </div>
           <div className={`chat__selector ${appEnvironment === 'CHAT' && 'sidebar__selected__environment'}`}>
                <button className='sidebar__button' onClick={()=>environmentSetFunction('CHAT')}>
                    <div className='chat__selector__icon'>
                    <ChatIcon fontSize='large' style={{color: "rgb(15, 4, 116)"}}/>
                    </div>
                    <span className='chat_selector__text'>COMMUNICATION</span>
                </button>
           </div>
           <div className={`task__selector ${appEnvironment === 'TASK' && 'sidebar__selected__environment'}`}>
                <button className='sidebar__button' onClick={()=>environmentSetFunction('TASK')}>
                    <div className='task__selector__icon'>
                    <AssignmentTurnedInIcon fontSize='large' style={{color: "rgb(15, 4, 116)"}}/>
                    </div>
                    <span className='task_selector__text'>TASKS</span>
                </button>
           </div>
           
        </div>
    
        <div>
        {environmentElement}
        </div>
        <div />
        <div>
           
            
        </div>
    </div>
    );
       
};


Channel.propTypes = {
    user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
    }),
};

export default Channel;

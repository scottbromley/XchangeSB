//Components
import Button from "./components/Button";
import Channel from "./components/Channel";
import Usersettings from "./components/Usersettings";
import Login from "./components/Login";
import Adminpane from "./components/Adminpane";
import React, { useState, auth, useEffect } from "react";
//import nodeExternals from 'webpack-node-externals';
// import Chats from './components/Chats';
import { useFirestoreQuery } from "./hooks";
import { Container } from "@material-ui/core";
import "./App.css";
import Fab from "@material-ui/core/Fab";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { CSSTransition } from "react-transition-group";

//firebase deps
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
// import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDsi67Gu4vjQ3IqKcwd-4Vhs7opBpckUZQ",
  authDomain: "xchange-e662f.firebaseapp.com",
  projectId: "xchange-e662f",
  storageBucket: "xchange-e662f.appspot.com",
  messagingSenderId: "994852242393",
  appId: "1:994852242393:web:d6d954118ac82d141fcfc8",
});

const db = firebase.firestore();
const firestore = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => firebase.auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    if (initializing) {
      setInitializing(false);
    }

    //cleanup subscription
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    //Retrieve google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    //set language to the default browser preference
    firebase.auth().useDeviceLanguage();
    //start the sign in process
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  const [userSettingsPaneSelector, userSettingsPaneSet] = useState(false);
  const [userSettingsPane, setUserSettingsPane] = useState("");

  function userSettingsPaneSetFunction() {
    if (userSettingsPaneSelector === false) {
      userSettingsPaneSet(true);
    } else if (userSettingsPaneSelector === true) {
      userSettingsPaneSet(false);
    }
  }

  useEffect(() => {
    var tempVariable = "";
    if (userSettingsPaneSelector === false) {
      tempVariable = <></>;
    } else if (userSettingsPaneSelector === true) {
      tempVariable = <Usersettings name={user.displayName} />;
    }
    setUserSettingsPane(tempVariable);
  }, [userSettingsPaneSelector]);

  /*Admin Pane Stuff*/
  const [adminPane, selectAdminPane] = useState(false);
  const [returnedPane, returnedPaneSetter] = useState("");

  function setAdminPane() {
    selectAdminPane(!adminPane);
  }

  useEffect(() => {
    if (adminPane) {
      returnedPaneSetter(<Adminpane userinfo={user} />);
    } else {
      returnedPaneSetter(<></>);
    }
  }, [adminPane]);
  /*Admin Pane Stuff*/

  function handleEmailClick() {
    firebase
      .firestore()
      .collection("mail")
      .add({
        to: "scottbromley17@gmail.com",
        message: {
          subject: "Hello from xchange!",
          text: "First email tester from xchange.",
        },
      });
    console.log("Email send trigger test.");
  }

  return (
    <div className="app">
      {user ? (
        <>
          <div className="header__bar">
            <div className="sign__out__button__div">
              <Button onClick={signOut}>Sign Out</Button>
            </div>
            <div>
              <button onClick={handleEmailClick}>Send Email</button>
            </div>

            <div className="header__bar__user__info">
              <button
                className="user__settings__dots"
                onClick={userSettingsPaneSetFunction}
              >
                <MoreVertIcon className="more__dots__icon" />
              </button>
              <div className="user__picture">
                <img
                  src={user.photoURL}
                  alt="Avatar"
                  width={30}
                  height={30}
                  className="user__image"
                />
              </div>
              <div className="header__bar__display__name">
                {user.displayName}
              </div>
              <div className="admin__button">
                {user.uid === "3YJdvu9PcTMvmfhvRA4VAbYUCqF2" ? (
                  <button onClick={setAdminPane}>Admin</button>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>

          <div className="user__settings__pane">{userSettingsPane}</div>

          <div>{returnedPane}</div>

          <div>
            <Channel user={user} />
          </div>
        </>
      ) : (
        <Login signInWithGoogle={signInWithGoogle} />
      )}
    </div>
  );
}

export default App;

//<Button onClick={signInWithGoogle}> Sign in with Google</Button>

//<div className='sidebar'>
//     <h1> Sidebar</h1>
// </div>

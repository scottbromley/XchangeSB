import React, { useState, useEffect } from "react";
import "./TaskSendEmailPane.css";
import firebase from "firebase/app";
import CloseIcon from "@material-ui/icons/Close";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import EmailBodyEditer from "./EmailBodyEditer";
import ToggleButton from "@mui/material/ToggleButton";

function TaskSendEmailPane({
  closePane,
  updateInformation,
  updatedTaskInformation,
  activePropertyEnvironment,
  manualUpdateObject
}) {
  const emailSendList = [
    { name: "Scott Bromley", email: "scottbromley17@gmail.com" },
    { name: "Robert Harrison", email: "robert@lynwick.co.uk" },
    { name: "Hestia Assets", email: "hestia.assets@gmail.com" },
  ];

  const db = firebase.firestore();
  const taskRef = db
    .collection("Properties")
    .doc(activePropertyEnvironment.id)
    .collection("Tasks")
    .doc(updatedTaskInformation);
  const [emailBodyEditorComponent, setEmailBodyEditorComponent] = useState("");

  useEffect(() => {
    taskRef.onSnapshot((snapshot) => {
      setEmailBodyEditorComponent(
        <EmailBodyEditer
          updateInformation={updateInformation}
          updatedTaskInformation={updatedTaskInformation}
          activePropertyEnvironment={activePropertyEnvironment}
          queriedTaskData={snapshot.data()}
          handleEmailSubjectComponentChange={handleEmailSubjectComponentChange}
          handleEmailBodyComponentChange={handleEmailBodyComponentChange}
        />
      );
    });
  }, []);

  const [emailSubjectData, setEmailSubjectData] = useState("");
  const [emailBodyData, setEmailBodyData] = useState("");

  function handleEmailSubjectComponentChange(setval) {
    setEmailSubjectData(setval);
  }

  function handleEmailBodyComponentChange(setval) {
    setEmailBodyData(setval);
  }

  function handleEmailClick() {
    firebase
      .firestore()
      .collection("mail")
      .add({
        to: "scottbromley17@gmail.com",
        message: {
          subject: emailSubjectData,
          text: emailBodyData,
        },
      });
      closePane()
  }

  return (
    <div className="task__send_email__backdrop">
      <div className="task__send__email__pane__outer">
        <div className="task__send__email__header">
          <h4>Email Update</h4>
          <div className="task__send__email__close__icon">
            <CloseIcon onClick={closePane} />
          </div>
        </div>
        <div className="task__send__email__pane__content">
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Who would you like to update?
            </FormLabel>
            <FormGroup>
              {emailSendList.map((item) => (
                <FormControlLabel
                  value={item.email}
                  control={<Checkbox defaultChecked />}
                  label={item.name}
                />
              ))}
            </FormGroup>
          </FormControl>

          <div className="task__send__email__information__editer">
            <h4>Would you like to edit the content of the update message?</h4>
            {emailBodyEditorComponent}
          </div>
          <div className="task__send__email__send__button">
            <ToggleButton onClick={handleEmailClick}>Send Update Email</ToggleButton> 
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default TaskSendEmailPane;

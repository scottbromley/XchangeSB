import React, { useEffect, useState } from "react";
import "./TaskEditWindow.css";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import firebase from "firebase/app";
import TaskSendEmailPane from "./TaskSendEmailUpdate/TaskSendEmailPane.js";

function TaskEditWindow({
  toggle,
  id,
  currentValues,
  displayName,
  activePropertyEnvironment,
}) {
  const [leavingTag, setLeavingTag] = useState(false);

  function toggleLeaving() {
    setLeavingTag(!leavingTag);
  }

  function handleClick() {
    toggleLeaving();
    setTimeout(() => {
      toggle();
    }, 500);
  }

  const databaseFields = [
    { label: "Waiting for...", dbf: "BridgeCompletion" },
    { label: "Description", dbf: "Description" },
    { label: "Next Steps", dbf: "NextSteps" },
    { label: "Proposed Completion Date", dbf: "ProposedCompletion" },
    { label: "Responsible Party", dbf: "ResponsibleParty" },
    { label: "Task Title", dbf: "Title" },
  ];

  const [selectedField, setSelectedField] = useState("");
  const [textContent, setTextContent] = useState("");

  function handleFieldSelection(e) {
    setSelectedField(e.target.value);
  }

  function handleTextContentChange(e) {
    setTextContent(e.target.value);
  }

  const db = firebase.firestore();

  const taskRef = db
    .collection("Properties")
    .doc(activePropertyEnvironment.id)
    .collection("Tasks")
    .doc(id);

  const timelineRef = db
    .collection("Properties")
    .doc(activePropertyEnvironment.id)
    .collection("Tasks")
    .doc(id)
    .collection("TaskTimeline");

  const updateObject = {
    EditedBy: displayName,
    EditedField: selectedField,
    OldValue: currentValues[selectedField],
    NewValue: textContent,
    Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  };

  function handleFormSubmit() {
    taskRef.update({ [selectedField]: textContent });
    timelineRef.add(updateObject);
    setSelectedField("");
    setTextContent("");
    handleUpdatePaneTrigger();
    handleEmailPaneToggle();
    toggle();
  }

  const [sendEmailUpdatePane, setSendEmailUpdatePane] = useState();
  const [sendEmailPaneToggle, setSendEmailPaneToggle] = useState(false);

  function handleEmailPaneToggle() {
    setSendEmailPaneToggle(!sendEmailPaneToggle);
  }

  function handleUpdatePaneTrigger() {
    setSendEmailUpdatePane(
      <TaskSendEmailPane manualUpdateObject={updateObject} />
    );
  }

  return (
    <div className={`edit__window__outer ${leavingTag && "exit__animation"}`}>
      <div className="edit__window__header">
        <h3>Task Editor</h3>
        <CloseIcon onClick={handleClick} className="close__icon" />
      </div>
      {/* <TaskSendEmailPane/>  */}
      <div className="edit__window__content">
        <div className="drop__down">
          <Box className="dropdown__box__outer">
            <FormControl className="dropdown__box" fullWidth>
              <InputLabel id="demo-simple-select-label">Task Field</InputLabel>
              <Select
                id="demo-simple-select"
                className="dropdown__box"
                label="Task Field"
                autoWidth
                onChange={handleFieldSelection}
                value={selectedField}
              >
                {databaseFields.map((item) => (
                  <MenuItem
                    key={item.dbf}
                    className="dropdown__box"
                    value={item.dbf}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="text__input__dd">
          <textarea
            value={textContent}
            placeholder="Type Content..."
            onChange={handleTextContentChange}
          ></textarea>
        </div>

        <button type="submit" onClick={handleFormSubmit}>
          Update Task
        </button>
      </div>
    </div>
  );
}

export default TaskEditWindow;

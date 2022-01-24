import React, { useState, useEffect } from "react";
import './EmailBodyEditer.css';
import firebase from "firebase/app";

function EmailBodyEditer({ updateInformation, updatedTaskInformation, activePropertyEnvironment, queriedTaskData, handleEmailSubjectComponentChange, handleEmailBodyComponentChange }) {
  
    const subjectBoxDefaultValue = `There has been an update to ${activePropertyEnvironment.name}`;
    const textboxDefaultValue = 
    `${updateInformation.EditedBy} edited the task field "${updateInformation.EditedField}". It was changed from "${updateInformation.OldValue}" to "${updateInformation.NewValue}". 
    
The next steps are: ${queriedTaskData.NextSteps}`;

    const [ subjectBoxValue, setSubjectBoxValue] = useState(subjectBoxDefaultValue);
    const [textboxValue, setTextboxValue] = useState(textboxDefaultValue);
    
    function handleSubjectBoxChange(e){
        setSubjectBoxValue(e.target.value);
        handleEmailSubjectComponentChange(e.target.value)
    };
    
    function handleTextboxChange(e) {
        setTextboxValue(e.target.value);
        handleEmailBodyComponentChange(e.target.value )
    };

    useEffect(()=>{
      handleEmailSubjectComponentChange(subjectBoxValue);
      handleEmailBodyComponentChange(textboxValue);
    }, []);

  return (
    <div className="email__body__editor__outer">
      <div className="email__body__editor__subject">
        <p>Subject</p>
        <textarea
        onChange={handleSubjectBoxChange}
        value={subjectBoxValue}
        ></textarea>
      </div>

      <div className="email__body__editor__body">
        <p>Body</p>
        <textarea
          value={textboxValue}
          onChange={handleTextboxChange}
        ></textarea>
      </div>
    </div>
  );
}

export default EmailBodyEditer;

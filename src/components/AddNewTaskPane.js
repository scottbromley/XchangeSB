import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import moment from 'moment';
import './AddNewTaskPane.css';
import { TextareaAutosize } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


function AddNewTaskPane(props) {

    const db = firebase.firestore();
    const tasksRef = db.collection('Properties').doc(props.activePropertyEnvironment.id).collection('Tasks');

    const [ submitDisabled, setSubmitDisabled ] = useState(true);

    //send data from new task button to the database.
    const inputRef = useRef('');
    var [ taskTitle, setTaskTitle ] = useState('');
    var [ taskDescription, setTaskDescription ] = useState('');
    var [ responsibleParty, setResponsibleParty ] = useState('');
    var [ nextSteps, setNextSteps ] = useState('');
    var [ proposedCompletionDate, setProposedCompletionDate ] = useState('');

    useEffect(() => {
        if(taskTitle && taskDescription && responsibleParty && nextSteps && proposedCompletionDate){
            setSubmitDisabled(false)
        }
    }, [taskTitle, taskDescription, responsibleParty, nextSteps, proposedCompletionDate])

    //I deleted this to allow the first one to autofocus - not sure if this has any knock on effects?
    // useEffect(() =>{
    //     if(inputRef.current) {
    //         inputRef.current.focus();
    //     }
    // }, [inputRef]);

    const handleOnChange = (e, field) => {
        if (field === "title") {
            setTaskTitle(e.target.value);
        } else if (field === "description") {
            setTaskDescription(e.target.value);
        } else if (field === "responsible") {
            setResponsibleParty(e.target.value);
        } else if (field === "next_steps") {
            setNextSteps(e.target.value);
        } else if (field === "proposed_completion"){
            setProposedCompletionDate(e.target.value);
        }

    };

    const handleOnSubmit = e => {
        e.preventDefault();
        tasksRef.add({
            BridgeCompletion: 1, 
            CreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            Description: taskDescription,
            NextSteps: nextSteps,
            ProposedCompletion: new Date(proposedCompletionDate),
            ResponsibleParty: responsibleParty,
            Status: "Not Started",
            Title: taskTitle,
        })
        setTaskTitle("");
        setTaskDescription("");
        setResponsibleParty("");
        setNextSteps("");
        setProposedCompletionDate("");

        props.closePane();
    }

    return (
        <div  className='add__new__task__pane'>
            <form onSubmit={handleOnSubmit}>
                <div className='add__new__header'>
                    <h3>Add a New Task</h3>
                    <CloseIcon onClick={props.closePane}/> 
                </div>
                Task Title
                <input autoFocus ref={inputRef} type='text' onChange={e => handleOnChange(e, "title")} value={taskTitle}/>
                Description
                <textarea id='description' ref={inputRef} type='text' onChange={e => handleOnChange(e, "description")} value={taskDescription}></textarea>
                Responsible Party
                <input ref={inputRef} type='text' onChange={e => handleOnChange(e, "responsible")} value={responsibleParty}></input>
                Next Steps
                <input ref={inputRef} type='text' onChange={e => handleOnChange(e, "next_steps")} value={nextSteps}></input>
                Proposed Completion Date
                <input ref={inputRef} type='date' onChange={e => handleOnChange(e, "proposed_completion")} value={proposedCompletionDate}></input>
                <button disabled={submitDisabled} >Submit</button>
            </form>
        </div>
    )
}

export default AddNewTaskPane

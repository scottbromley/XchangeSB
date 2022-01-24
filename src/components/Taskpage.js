import './Taskpage.css'
import Taskcomp from './Taskcomp';
import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddNewTaskPane from './AddNewTaskPane';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskSendEmailPane from './TaskSendEmailUpdate/TaskSendEmailPane.js';


function Taskpage(props) {
    
    const db = firebase.firestore();
    

    //query Not Started tasks
    //notes - make the query to a specific property a passed down prop.
    const notStartedTaskRef = db.collection('Properties').doc(props.activePropertyEnvironment.id).collection('Tasks').where('Status', '==', 'Not Started');
    const inProgressTaskRef = db.collection('Properties').doc(props.activePropertyEnvironment.id).collection('Tasks').where('Status', '==', 'In Progress');
    const completedTaskRef = db.collection('Properties').doc(props.activePropertyEnvironment.id).collection('Tasks').where('Status', '==', 'Completed');

    const [ notStartedTaskList, setNotStartedTaskList ] = useState([]);
    const [ inProgressTaskList, setInProgressTaskList ] = useState([]);
    const [ completedTaskList, setCompletedTaskList ] = useState([]);

    const allTasksRef = db.collection('Properties').doc(props.activePropertyEnvironment.id).collection('Tasks');
    
    const [ partiesListDropdown, setPartiesListDropdown ] = useState('');
    
    // allTasksRef.onSnapshot(snapshot => {
    //     const snapshotData = snapshot.docs.map(task=>(task.data().ResponsibleParty));
    //     const uniqueSnapshot = [ ...new Set(snapshotData)];
    //     setPartiesListDropdown(uniqueSnapshot.map((task, index)=>(
    //         <option key={index} value={task}>{task}</option>
    //     )))
    // })

    // const [ filteredParty, setFilteredParty] = useState(null);

    // function handleSelectPartyFilter(e){
    //     console.log(e.target.value)
    //     setFilteredParty(e.target.value);
    // };


    useEffect(()=>{
        notStartedTaskRef.onSnapshot(snapshot => {
            // const filteredNotStartedList = filteredParty ? snapshot.docs.filter(doc => doc.data().ResponsibleParty === filteredParty) : snapshot;
            // console.log(snapshot.docs.filter(doc => doc.data().ResponsibleParty === filteredParty));
            setNotStartedTaskList(snapshot.docs.map( (task, index) => (
                <Taskcomp activePropertyEnvironment={props.activePropertyEnvironment} displayName={props.displayName} key={task.id} dragId={task.id} {...task.data()} index={index} />
            )
            ))
        })
        inProgressTaskRef.onSnapshot(snapshot => {
            setInProgressTaskList(snapshot.docs.map( (task, index) => (
                <Taskcomp activePropertyEnvironment={props.activePropertyEnvironment} displayName={props.displayName}  key={task.id} dragId={task.id} {...task.data()} index={index} />
            )
            ))
        })
        completedTaskRef.onSnapshot(snapshot => {
            setCompletedTaskList(snapshot.docs.map( (task, index) => (
                <Taskcomp activePropertyEnvironment={props.activePropertyEnvironment} displayName={props.displayName}  key={task.id} dragId={task.id} {...task.data()} index={index} />
            )
            ))
        })

    }, []);

    //Add new task button
    const [ newTaskPaneToggle, setNewTaskPaneToggle ] = useState(false);
    const [ newTaskPane, setNewTaskPane ] = useState('');

    function closePane(){
        setNewTaskPaneToggle(newTaskPaneToggle);
        setNewTaskPane('');
    }

    function openNewTaskPane(){
        if (!newTaskPaneToggle){
            setNewTaskPaneToggle(!newTaskPaneToggle);
            setNewTaskPane(
                <div className='add__new__task__pane'>
                    <AddNewTaskPane activePropertyEnvironment={props.activePropertyEnvironment} closePane={closePane}/>
                </div>
            );
        } else if (newTaskPaneToggle){
            setNewTaskPaneToggle(!newTaskPaneToggle);
            setNewTaskPane('');
        }
        
    }

    const [ sendUpdateEmailToggle, setSendUpdateEmailToggle ] = useState(false);
    const [ updateInformation, setUpdateInformation ] = useState(null);

    function handleTaskUpdateEmail(updateObject){
        setSendUpdateEmailToggle(!sendUpdateEmailToggle);
    };

    const onDragEnd = (result) => {
        const {destination, source, draggableId} = result;

        if(!destination) {
            return
          }

        const movedTaskId = draggableId;
        const statusChangedTo = destination.droppableId;
        const statusChangedFrom = source.droppableId;
        const updateObject = {EditedBy: props.displayName, EditedField: "Status", OldValue: statusChangedFrom, NewValue: statusChangedTo, Timestamp: firebase.firestore.FieldValue.serverTimestamp()}

        db.collection('Properties').doc(props.activePropertyEnvironment.id).collection('Tasks').doc(movedTaskId).update({Status: statusChangedTo});
        db.collection("Properties").doc(props.activePropertyEnvironment.id).collection("Tasks").doc(movedTaskId).collection("TaskTimeline").add(
            updateObject
        );

        handleTaskUpdateEmail();
        setUpdateInformation({activityInfo: updateObject, taskInfo: draggableId});

    };

    const onDragUpdate = (update) => {
        const { destination, source, draggableId } = update;

        if(!destination) {
            return
          }

        const movedTaskId = draggableId;
        const statusChangedTo = destination.droppableId;

        db.collection('Properties').doc(props.activePropertyEnvironment.id).collection('Tasks').doc(movedTaskId).update({Status: statusChangedTo});
       
      };
    

    return (
        <>
            <div className='progress__information'> 
                <div className='add__new__task'>
                    <div className='add__new__task__button'>
                        <button onClick={openNewTaskPane}>
                            <AddCircleOutlineIcon/>
                            <p>Add new task</p>
                        </button>
                    </div>
                    {newTaskPane}
                </div>
                <div> 
                    { sendUpdateEmailToggle ? <TaskSendEmailPane updateInformation={updateInformation.activityInfo} updatedTaskInformation={updateInformation.taskInfo} closePane={handleTaskUpdateEmail} activePropertyEnvironment={props.activePropertyEnvironment}/> : <div></div>
                    }
                </div>
                {/* <div className='party__filter'> 
                    <select onChange={handleSelectPartyFilter} id='responsible__party__selector'>
                        {partiesListDropdown}
                    </select>
                </div> */}
                <div> </div>
                <div> </div>
                <div> </div>
            </div>
            <div className='canban__board'>
                <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
                    <Droppable droppableId="Not Started">
                        {(provided, snapshot) => (
                            <div className={`not__started ${snapshot.isDraggingOver && 'dragged__over__column'}`} 
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            >
                                <div className='bar__info'>
                                    <div className='number__of__tasks'>{notStartedTaskList.length}</div>
                                    NOT STARTED
                                </div>
                                {notStartedTaskList}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="In Progress">
                        {(provided, snapshot) => (
                            <div className={`in__progress ${snapshot.isDraggingOver && 'dragged__over__column'}`} 
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            >
                            <div className='bar__info'>
                                <div className='number__of__tasks'>{inProgressTaskList.length}</div>
                                    IN PROGRESS
                            </div>
                            {inProgressTaskList}
                            {provided.placeholder}
                        </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="Completed">
                        {(provided, snapshot) => (
                            <div className={`completed ${snapshot.isDraggingOver && 'dragged__over__column'}`} 
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            >
                            <div className='bar__info'>
                                <div className='number__of__tasks'>{completedTaskList.length}</div>
                                    COMPLETED
                            </div>
                            {completedTaskList}
                            {provided.placeholder}
                        </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </>
    )
}

export default Taskpage

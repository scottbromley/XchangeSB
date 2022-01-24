import React, { useState, useEffect, useRef } from 'react';
import './Taskcomp.css';
import { formatRelative } from 'date-fns';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import { Draggable } from 'react-beautiful-dnd';
import TimelineComponent from './TimelineComponent.js';
import TaskEditWindow from './TaskEditWindow';


const formatDate = date => {
    let formattedDate = '';
    if (date) {
        formattedDate = formatRelative(date, new Date());
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
};

function Taskcomp(props) {

    var responsiblePartyClass = '';

    if (props.ResponsibleParty === "Buyer Solicitor"){
        responsiblePartyClass = "buyer__solicitor";
    } else if (props.ResponsibleParty === "Seller Solicitor") {
        responsiblePartyClass = "seller__solicitor";
    } else if (props.ResponsibleParty === "Surveyor") {
        responsiblePartyClass = "surveyor";
    } else if (props.ResponsibleParty === "Buyer") {
        responsiblePartyClass = "buyer";
    } else if (props.ResponsibleParty === "Seller") {
        responsiblePartyClass = "seller";
    } else if (props.ResponsibleParty === "Mortgage Lender") {
        responsiblePartyClass = "mortgage__lender";
    }

    function getStyle(style, snapshot) {
        if (!snapshot.isDropAnimating) {
          return style;
        }
        const { moveTo, curve, duration } = snapshot.dropAnimation;
        // move to the right spot
        const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
        // add a bit of turn for fun
        const rotate = 'rotate(0turn)';
      
        // patching the existing style
        return {
          ...style,
          transform: `${translate} ${rotate}`,
          // slowing down the drop because we can
          transition: `all ${curve} ${duration + 0.1}s`,
        };
      }

    const [ timelineToggle, setTimelineToggle ] = useState(false);

    function toggleTimelineComponent() {
        setTimelineToggle(!timelineToggle);
    };

    const [ editWindowToggle, setEditWindowToggle ] = useState(false);

    function toggleEditWindow(){
        setEditWindowToggle(!editWindowToggle);
    }

    return (
        <Draggable draggableId={props.dragId} index={props.index}>
            {(provided, snapshot) => (
               <div className={`individual__task__pane ${responsiblePartyClass} ${snapshot.isDragging && 'being_dragged'}`}
               ref={provided.innerRef}
               {...provided.draggableProps}
               {...provided.dragHandleProps}
               style={getStyle(provided.draggableProps.style, snapshot)}
               >
                   {editWindowToggle ? <TaskEditWindow activePropertyEnvironment={props.activePropertyEnvironment} displayName={props.displayName} toggle={toggleEditWindow} id={props.dragId} currentValues={props} /> : <div></div>}
                <div className="task__title">
                    <InfoIcon style={{ fontSize: 14 }} onClick={toggleTimelineComponent}/>
                    {props.Title}
                    <EditIcon style={{ fontSize: 14 }} onClick={toggleEditWindow}/>
                </div>
                {timelineToggle ? <TimelineComponent activePropertyEnvironment={props.activePropertyEnvironment} id={props.dragId} toggle={toggleTimelineComponent} />: <div></div>}
                <div className='task__bridge__completion'>
                    Waiting on {props.BridgeCompletion}
                </div>
                <div className='task__description'>
                    <h4>Description:</h4> {props.Description}
                </div>
                <div className='task__next__steps'>
                    <h4>Next Steps:</h4> {props.NextSteps}
                </div>
                <div className='task__timings'>
                    <div className='task__created__at'>
                    {props.CreatedAt?.seconds ? (
                        <span>
                            Task Created: {formatDate(new Date(props.CreatedAt.seconds * 1000))}
                        </span>
                        ) 
                    : null}
                    </div>
                    <div className='task__proposed__completion'>
                    {props.ProposedCompletion?.seconds ?  (
                    <span>
                        Proposed Completion: {formatDate(new Date(props.ProposedCompletion.seconds * 1000))}
                    </span>
                    ) : null}
                    </div>
                </div>
            </div> 
            )}
        </Draggable>
    )
}

export default Taskcomp

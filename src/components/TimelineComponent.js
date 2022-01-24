import React, { useEffect, useState } from "react";
import "./TimelineComponent.css";
import firebase from "firebase/app";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import CheckIcon from "@material-ui/icons/Check";
import Typography from "@material-ui/core/Typography";
import { formatRelative } from "date-fns";
import Paper from "@material-ui/core/Paper";
import { Card, CardContent } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

const formatDate = (date) => {
  let formattedDate = "";
  if (date) {
    formattedDate = formatRelative(date, new Date());
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

function TimelineComponent({ toggle, id, activePropertyEnvironment}) {
  const db = firebase.firestore();
console.log(activePropertyEnvironment.id);

  const timelineRef = db
    .collection("Properties")
    .doc(activePropertyEnvironment.id)
    .collection("Tasks")
    .doc(id)
    .collection("TaskTimeline")
    .orderBy("Timestamp", "asc");
  const [timelineList, setTimelineList] = useState([]);

  useEffect(() => {
    timelineRef.onSnapshot((snapshot) => {
      setTimelineList(
        snapshot.docs.map((item, index) => (
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                {item.data().Timestamp && formatDate(new Date(item.data().Timestamp.seconds * 1000))}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot>
                <CheckIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Card className="timeline__content__card">
                <CardContent>
                  <Typography variant="h6" component="h1" color="primary">
                    {item.data().EditedBy}
                  </Typography>
                  <Typography>
                      {item.data().EditedField}
                  </Typography>
                  <Typography>
                    From: <em>{item.data().OldValue}</em>
                  </Typography>
                  <Typography>
                    To: <em>{item.data().NewValue}</em>
                  </Typography>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>
        ))
      );
    });
  }, []);

  return (
    <div className="timeline__outer">
      <div className="timeline__inner">
        <h1>Task Timeline</h1>
        <button type="submit" onClick={toggle}>
          Close
        </button>
        <div className="timeline__area">
          <Timeline align="alternate">
            {timelineList}
            <TimelineItem>
              <TimelineOppositeContent></TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot>
                  <AddIcon />
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent></TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>
      </div>
    </div>
  );
}

export default TimelineComponent;

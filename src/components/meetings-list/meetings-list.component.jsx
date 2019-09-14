import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

class MeetingsList extends Component {  
  render() {
    const { meetings } = this.props;

    const meetingDetails = meetings.map(meeting => {
      return (
        <ListGroupItem key={meeting.meetingID}>
          {meeting.meetingName}
        </ListGroupItem>
      )
    })

    return (
      <ListGroup>
        {meetingDetails}
      </ListGroup>
    )
  }
}

export default MeetingsList;
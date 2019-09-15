import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { GoTrashcan, GoListUnordered } from 'react-icons/go';
import { FaLink } from 'react-icons/fa';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Button, ButtonGroup } from 'reactstrap';

import firebase from '../../firebase/firebase';

import './meetings-list.styles.scss';

class MeetingsList extends Component {
  deleteMeeting = (event, whichMeeting) => {
    event.preventDefault();

    const ref = firebase.database().ref(`meetings/${this.props.userID}/${whichMeeting}`);
    ref.remove();
  }

  render() {
    const { meetings } = this.props;

    const meetingDetails = meetings.map(meeting => {
      return (
        <ListGroupItem key={meeting.meetingID}>
          <ButtonGroup size='sm'>
            <Button outline color="secondary" title="Delete Meeting" onClick={event => this.deleteMeeting(event, meeting.meetingID)}>
              <GoTrashcan />
            </Button>
            <Button outline color="secondary" title="Check In Meeting" onClick={() => this.props.history.push(`/checkin/${this.props.userID}/${meeting.meetingID}`)}>
              <FaLink />
            </Button>
            <Button outline color="secondary" title="Attendees List" onClick={() => this.props.history.push(`/attendees/${this.props.userID}/${meeting.meetingID}`)}>
              <GoListUnordered />
            </Button>
          </ButtonGroup>
          <span className="ml-2">
            {meeting.meetingName}
          </span>
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

export default withRouter(MeetingsList);
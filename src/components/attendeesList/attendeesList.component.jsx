import React, { Component } from 'react';
import { GoTrashcan, GoMail, GoStar } from 'react-icons/go';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Button, ButtonGroup } from 'reactstrap';

import firebase from '../../firebase/firebase';

import './attendeesList.styles.scss';

class AttendeesList extends Component {
  deleteAttendee = (event, whichMeeting, whichAttendee) => {
    event.preventDefault();

    const adminUser = this.props.adminUser;
    const ref = firebase.database().ref(`meetings/${adminUser}/${whichMeeting}/attendees/${whichAttendee}`);
    ref.remove();
  }

  toggleStar = (event, star, whichMeeting, whichAttendee) => {
    event.preventDefault();
    const adminUser = this.props.adminUser;
    const ref = firebase.database().ref(`meetings/${adminUser}/${whichMeeting}/attendees/${whichAttendee}/star`);

    if(star === undefined) {
      ref.set(true)
    } else {
      ref.set(!star)
    }
  }

  render() {
    const admin = this.props.adminUser === this.props.userID ? true : false;
    const attendees = this.props.attendees;

    const myAttendees = attendees.map(item => {
      return (
        <ListGroupItem key={item.attendeeID} className={`text-center ${admin ? 'admin-view' : ''}`}>
          {
            admin && (
              <ButtonGroup size='sm'>
                <Button color={item.star ? 'warning' : 'secondary'} outline={item.star ? false : true} title="Give the User a Star" onClick={event => this.toggleStar(event, item.star, this.props.meetingID, item.attendeeID)}>
                  <GoStar />
                </Button>
                <a href={`mailto:${item.attendeeEmail}`} className="btn btn-sm btn-outline-secondary" title="Email Attendee">
                  <GoMail />
                </a>
                <Button outline color="secondary" title="Delete Attendee" onClick={event => this.deleteAttendee(event, this.props.meetingID, item.attendeeID)}>
                  <GoTrashcan />
                </Button>
              </ButtonGroup>
            )
          }
          <span className="ml-2">
            {item.attendeeName}
          </span>
        </ListGroupItem>
      )
    })

    return (
      <ListGroup>
        {myAttendees}
      </ListGroup>
    )
  }
}

export default AttendeesList;
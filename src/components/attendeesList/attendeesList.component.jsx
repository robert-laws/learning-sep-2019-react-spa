import React, { Component } from 'react';
import { GoTrashcan } from 'react-icons/go';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Button, ButtonGroup } from 'reactstrap';

import './attendeesList.styles.scss';

class AttendeesList extends Component {
  render() {
    const admin = this.props.adminUser === this.props.userID ? true : false;
    const attendees = this.props.attendees;

    const myAttendees = attendees.map(item => {
      return (
        <ListGroupItem key={item.attendeeID} className={`text-center ${admin ? 'admin-view' : ''}`}>
          {
            admin && (
              <ButtonGroup size='sm'>
                <Button outline color="secondary" title="Delete Attendee" onClick={event => this.deleteAttendee(event, this.props.meetingID, item.attendeeID)}>
                  <GoTrashcan />
                </Button>
              </ButtonGroup>
            )
          }
          <span>
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
import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import './attendeesList.styles.scss';

class AttendeesList extends Component {
  render() {
    const attendees = this.props.attendees;
    const myAttendees = attendees.map(item => {
      return (
        <ListGroupItem key={item.attendeeID}>
          {item.attendeeName}
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
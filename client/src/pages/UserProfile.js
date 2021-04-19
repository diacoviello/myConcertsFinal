import React, { Component } from "react";
import { EventList, EventListItem } from "../components/EventList";
import API from "../utils/API";
import SearchForm from "../components/SearchForm";
import Card from "@material-ui/core/Card";
// import UserNav from "../components/UserNav";

class Saved extends Component {
  state = {
    events: [],
  };

  componentDidMount() {
    this.getSavedEvents();
  }

  getSavedEvents = () => {
    API.getSavedEvents()
      .then((res) => {
        this.setState({
          events: res.data,
        });
        console.log(this.state.events);
      })
      .catch((err) => console.log(err));
  };

  handleEventDelete = (id) => {
    console.log(id);
    API.deleteEvent(id).then((res) => this.getSavedEvents());
  };

  render() {
    return (
      <div>
        

        <div className="container">
          {this.state.events ? (
            <EventList className="overflow-container">
              {this.state.events.map((event) => (
                <EventListItem key={event.id}>
                  {/* <Card style={{ height: "60px", width: "60px" }}> */}
                  <p>
                    <strong>
                      {event.artist_name} at {event.venue_name}
                    </strong>
                  </p>
                  <p>{event.location}</p>
                  <p>
                    {event.date} at {event.time}
                  </p>
                  <button className="btn btn-light">
                    <a href={event.event_url} target="_blank">More Info</a>
                  </button>
                  <button className="btn btn-light">
                    <a
                      href={
                        ("https://www.google.com/maps/search/?api=1&query=" +
                          event.latitude +
                          "," +
                          event.longitude
                        )} target="_blank">
                        Get Directions
                      </a>
                    </button>
                    <button
                      onClick={() => this.handleEventDelete(event._id)}
                      className="btn btn-light"
                    >
                      Delete
                    </button>
                    {/* </Card> */}
                  </EventListItem>
                ))}
              </EventList>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </div>
      </div>
    );
  }
}

export default Saved;

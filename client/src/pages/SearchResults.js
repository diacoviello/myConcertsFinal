import React, { Component, useState } from "react";
import { EventList, EventListItem } from "../components/EventList";
import MainNav from "../components/MainNav";
import Footer from "../components/Footer";
import API from "../utils/API";
import SearchForm from "../components/SearchForm";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import moment from 'moment';

class SearchResults extends Component {
  state = {
    search: "",
    events: [],
    past: false,
  };

  handleInputChange = (event) => {
    this.setState({ search: event.target.value });
  };

  handleCheckedChange = (event) => {
    this.setState({ past: event.target.checked });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.past === false) {
      API.getEvent(this.state.search)
        .then((res) => {
          console.log("res.data: ", res.data[0].artist.thumb_url);
          const thumbImg = res.data[0].artist.thumb_url;
          const events = res.data.map((event) => {
            console.log(event.lineup[0]);
            const id = event.id;
            const artist = event.lineup[0];
            const location = event.venue.location;
            const venue = event.venue.name;
            const date = event.datetime.slice(0, 10);
            const time = event.datetime.slice(11, 16);
            const eventUrl = event.url;
            const latitude = event.venue.latitude;
            const longitude = event.venue.longitude;
            const artistImg = thumbImg;

            const eventObj = {
              id: id,
              artist: artist,
              location: location,
              venue: venue,
              date: moment(date).format("dddd, MMMM Do YYYY"),
              time: moment(time, "HH:mm").format("h:mm a"),
              eventUrl: eventUrl,
              longitude: longitude,
              latitude: latitude,
              artistImg: artistImg,
            };
            console.log(eventObj);
            return eventObj;
            return artistImg;
          });
          console.log(events);
          this.setState({ events: events });
        })
        .catch((err) => console.log("API.getEvent err: ", err));
    } else {
      API.getPastEvent(this.state.search)
        .then((res) => {
          console.log("res.data: ", res.data);
          const pastImg = res.data[0].artist.thumb_url;
          console.log(pastImg);

          const events = res.data.map((event) => {
            console.log(event.lineup[0]);
            const id = event.id;
            const artist = event.lineup[0];
            const location = event.venue.city + ", " + event.venue.region + " " + event.venue.country;
            const venue = event.venue.name;
            const date = event.datetime.slice(0, 10);
            const time = event.datetime.slice(11, 16);
            const eventUrl = event.url;
            const latitude = event.venue.latitude;
            const longitude = event.venue.longitude;
            const artistImg = pastImg;
            console.log(artistImg);

            const eventObj = {
              id: id,
              artist: artist,
              location: location,
              venue: venue,
              date: moment(date).format("dddd, MMMM Do YYYY"),
              time: moment(time, "HH:mm").format("h:mm a"),
              eventUrl: eventUrl,
              longitude: longitude,
              latitude: latitude,
              artistImg: artistImg,
            };
            console.log(eventObj);
            return eventObj;
            return artistImg;
          });
          console.log(events);
          this.setState({ events: events });
        })
        .catch((err) => console.log("API.getEvent err: ", err));
    }
  };

  handleEventSave = (id) => {
    const event = this.state.events.find((event) => event.id === id);
    console.log(event);
    if (this.state.past === false) {
      API.saveEvent({
        artist_name: event.artist,
        location: event.location,
        venue_name: event.venue,
        date: event.date,
        time: event.time,
        event_url: event.eventUrl,
        longitude: event.longitude,
        latitude: event.latitude,
        eventId: event.id,
        artistImg: event.artistImg,
      })
        .then(console.log("success!!!!"))
        .catch((err) => console.log(err));
    } else {
      API.savePastEvent({
        artist_name: event.artist,
        location: event.location,
        venue_name: event.venue,
        date: event.date,
        time: event.time,
        event_url: event.eventUrl,
        longitude: event.longitude,
        latitude: event.latitude,
        eventId: event.id,
        artistImg: event.artistImg,
      })
        .then(console.log("success!!!!"))
        .catch((err) => console.log(err));
    }
  };

  render() {
    console.log(this.state.events);
    return (
      <div>
        <MainNav />
        <SearchForm
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          handleCheckedChange={this.handleCheckedChange}
          search={this.state.search}
        />
        <div className="container" style={{ justifyContent: "center" }}>
          {this.state.events ? (
            <EventList className="overflow-container" >
              {this.state.events.map((event) => (
                <EventListItem key={event.id}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <strong>{event.time}</strong>
                      <p>{event.date}</p>
                    </Grid>
                    <Grid item style={{minWidth: 200, maxWidth: 250}}>
                    <strong>{event.venue}</strong>
                    <p>{event.location}</p>
                    </Grid>

                      <Button
                        component="a"
                        href={event.eventUrl}
                        target="_blank"
                        className="btn"
                      >
                        More Info
                      </Button>

                      <Button
                        component="a"
                        href={
                          "https://www.google.com/maps/search/?api=1&query=" +
                          event.latitude +
                          "," +
                          event.longitude
                        }
                        target="_blank"
                        className="btn"
                      >
                        Directions
                      </Button>

                      <Button
                        onClick={() => this.handleEventSave(event.id)}
                        className="btn"
                        style={{ color: "white" }}
                      >
                        RSVP
                      </Button>
                   
                  </Grid>
                </EventListItem>
              ))}
            </EventList>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default SearchResults;

import React, { Component, useState, useEffect } from "react";
import { EventList, EventListItem } from "../components/EventList";
import MainNav from "../components/MainNav";
import MainNavUser from "../components/MainNavUser";
import Footer from "../components/Footer";
import API from "../utils/API";
import SearchForm from "../components/SearchForm";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import moment from "moment";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
        DSD Designs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
class SearchResults extends Component {
  state = {
    search: "",
    events: [],
    past: false,
    isLoggedIn: [],
    artistImg: {},
  };

  handleInputChange = (event) => {
    this.setState({ search: event.target.value });
  };

  handleCheckedChange = (event) => {
    this.setState({ past: event.target.checked });
  };

  handleLoggedIn = () => {
    API.isLoggedIn()
      .then(this.setState({isLoggedIn: true}))
      .then(console.log("success!!!!"))
      .catch((err) => console.log(err));
  };

  handleGetImage = () => {
    API.getEvent(this.state.search)
    .then((res) => {
      console.log("res.data: ", res.data[0].artist.thumb_url);
      this.setState({ artistImg: res.data[0].artist.thumb_url});
    })
  }

   handleGetImage = () => {
      API.getEvent(this.state.search).then((res) => {
        console.log("res.data: ", res.data[0].artist.thumb_url);
        this.setState({ artistImg: res.data[0].artist.thumb_url });
      });
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
            const datetime = event.datetime;
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
              datetime: datetime,
              date: moment(date).format("dddd, MMMM Do YYYY"),
              time: moment(time, "HH:mm").format("h:mm a"),
              eventUrl: eventUrl,
              longitude: longitude,
              latitude: latitude,
              artistImg: artistImg,
            };
            console.log(eventObj);
            return eventObj;
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

          const events = res.data.reverse().map((event) => {
            console.log(event.lineup[0]);
            const id = event.id;
            const artist = event.lineup[0];
            const location =
              event.venue.city +
              ", " +
              event.venue.region +
              " " +
              event.venue.country;
            const state = event.venue.region;
            const venue = event.venue.name;
            const datetime = event.datetime;
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
              state: state,
              venue: venue,
              datetime: datetime,
              date: moment(date).format("dddd, MMMM Do YYYY"),
              time: moment(time, "HH:mm").format("h:mm a"),
              eventUrl: eventUrl,
              longitude: longitude,
              latitude: latitude,
              artistImg: artistImg,
            };
            console.log(eventObj);
            return eventObj;
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
        datetime: event.datetime,
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
        state: event.state,
        venue_name: event.venue,
        datetime: event.datetime,
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
      {(this.state.isLoggedIn === true) ? (
        <MainNavUser />
      ) : (
        <MainNav />
        )}
        <Grid container justify="space-evenly">
          <Grid item xs={4}>
            <SearchForm
              handleFormSubmit={this.handleFormSubmit}
              handleInputChange={this.handleInputChange}
              handleCheckedChange={this.handleCheckedChange}
              handleLoggedIn={this.handleLoggedIn}
              search={this.state.search}
            />
          </Grid>
        </Grid>
        <div className="container" style={{ justifyContent: "center", maxHeight: 150 }}>
          {this.state.events ? (
            <EventList
              style={{ maxHeight: "100", overflow: "auto"}}
            >
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
                    <Grid item style={{ minWidth: 200, maxWidth: 250 }}>
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

                    {this.state.isLoggedIn ? (
                      <Button
                        onClick={() => this.handleEventSave(event.id)}
                        className="btn"
                        style={{ color: "white" }}
                      >
                        RSVP
                      </Button>
                    ) : (
                      <Button
                        href="/signup"
                        className="btn"
                        style={{ color: "white" }}
                      >
                        Sign up to RSVP
                      </Button>
                    )}
                  </Grid>
                </EventListItem>
              ))}
            </EventList>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </div>
        <Footer>
          <Copyright />
        </Footer>
      </div>
    );
  }
}


export default SearchResults;

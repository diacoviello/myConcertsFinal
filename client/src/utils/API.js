import axios from "axios";
const BASEURL = "https://rest.bandsintown.com/v4/artists/";
const APIKEY = "/events/?app_id=451f31b2808001d069daed45c32a9dac";
const PAST = "&date=past";

export default {
  getEvent: function (query) {
    console.log(query);
    return axios.get(BASEURL + query + APIKEY);
  },
  getPastEvent: function (query) {
    console.log(query);
    return axios.get(BASEURL + query + APIKEY + PAST);
  },

  getSavedEvents: function () {
    return axios.get("/api/events");
  },

  getPastSavedEvents: function () {
    return axios.get("/api/pastevents");
  },

  // Deletes the saved book with the given id
  deleteEvent: function (id) {
    return axios.delete("/api/events/" + id);
  },
  deletePastEvent: function (id) {
    return axios.delete("/api/pastevents/" + id);
  },
  // Saves an book to the database
  saveEvent: function (eventData) {
    console.log(eventData);
    return axios.post("/api/events", eventData);
  },
  savePastEvent: function (pastEventData) {
    console.log(pastEventData);
    return axios.post("/api/pastevents", pastEventData);
  },
  getArtistTotal: function () {
    return axios.get("api/stats/artists");
  },
  getStatesTotal: function () {
    return axios.get("api/stats/states");
  },
  getVenuesTotal: function () {
    return axios.get("api/stats/venues");
  },
  signup: function (signupData) {
    console.log(signupData);
    return axios.post("/api/signup", signupData);
  },
  login: function (loginData) {
    console.log(loginData);
    return axios.post("/api/login", loginData);
  },
  isLoggedIn: function (loginData) {
    console.log(loginData);
    return axios.get("/api/login", loginData);
  },
  logout: function () {
    console.log();
    return axios.post("/api/logout");
  },
};
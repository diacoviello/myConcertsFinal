const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pastEventSchema = new Schema({
  artist_name: { type: String, required: true },
  location: { type: String, required: true },
  state: { type: String, required: false },
  venue_name: { type: String, required: true },
  datetime: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  event_url: { type: String, required: true },
  latLng: { type: String, required: true },
  longitude: { type: String, required: true },
  latitude: { type: String, required: true },
  eventId: { type: String, required: true, unique: true },
  artistImg: { type: String, required: false, unique: false },
});

const PastEvent = mongoose.model("PastEvent", pastEventSchema);

module.exports = PastEvent;
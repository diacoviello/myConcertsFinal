const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const routes = require("./routes");


const app = express();
const PORT = process.env.PORT || 3001;
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));
}


app.use(
  session({
    secret: "super secret",
    store: MongoStore.create ({ mongoUrl: "mongodb://localhost/myConcertsDB"
    }),
    resave: false,
    saveUninitialized: false
  })
);


app.use(passport.initialize());
app.use(passport.session());



app.use(routes);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/myConcertsDB",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
  }
);

app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
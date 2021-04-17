import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import image from "../images/MSG_SEA.jpg";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 750,
    maxWidth: 900,
    minHeight: 450,
  },
  alignItemsAndJustifyContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
  },
  infotext: {
    fontStyle: "italic",
  },
});

export default function HomeSearch() {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Sea of MSG"
            height="400"
            image={image}
            title="Sea of MSG"
          />
          <CardContent className={classes.alignItemsAndJustifyContent}>
            <Typography className={classes.infotext}>
              <strong>
                <p>
                  myConcerts is a program designed with the music lover in mind
                  and heart. Using API calls and database storage, we provide
                  the user with the ability to search for upcoming events as
                  well as past events using the artist's name.
                  <p></p>
                  Sign-up with an account today to be able to store your
                  favorite artists for easy future reference as well as RSVP to
                  events you wish to attend. You can also RSVP to events you
                  have attended in the past for your memories! The saved
                  information will appear on your user profile when you sign in
                  again!
                </p>
              </strong>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          className={classes.alignItemsAndJustifyContent}
          style={{ backgroundColor: "grey" }}
        >
          <Button
            // onClick={handleFormSubmit}
            href="/searchresult"
            size="small"
            variant="contained"
            color="primary"
          >
            Let's find "myConcerts" !
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

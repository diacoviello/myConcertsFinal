import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import "./style.css";

// This file exports both the List and ListItem components

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: "#9393ef",
    margin: 5,
    width: "99%",
  },
  resultList: {
    alignItems: "center",
    justify: "center"
  }
}));

export function EventList({ children }) {
  return (
    <div className="list-overflow-container">
      <List className="list-group">{children}</List>
    </div>
  );
}

export function EventListItem({ children }) {
  const classes = useStyles();

  return (
    <Grid style={{justify: "center"}}>
      <Grid item className={classes.resultList}>
        <Paper className={classes.paper}>
          <ListItem className="list-group-item">{children}</ListItem>
        </Paper>
      </Grid>
    </Grid>
  );
}

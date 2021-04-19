import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { STATES } from "mongoose";

const useStyles = makeStyles({
  root: {
    minWidth: 500,
    maxHeight: 200,
  },
  alignItemsAndJustifyContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
  },
});

function SearchForm(props) {
  console.log(props);
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "200px" }}
    >
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent className={classes.alignItemsAndJustifyContent}>
            <FormControl>
              <Input
                value={props.search}
                onChange={props.handleInputChange}
                name="event"
                list="events"
                type="text"
                className="form-control"
                placeholder="Type in an artist name"
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <MusicNoteIcon style={{ color: "white" }} />
                  </InputAdornment>
                }
              />
              <FormControlLabel
            control={<Checkbox checked={props.past} onChange={props.handleCheckedChange} name="past" />}
            label="Show Past Events"
          />
            </FormControl>
          </CardContent>
        </CardActionArea>
        <CardActions
          className={classes.alignItemsAndJustifyContent}
          style={{ backgroundColor: "grey",  }}
        >
          <Button
            onClick={props.handleFormSubmit }
            // onClick={props.handleLoggedIn}
            size="small"
            variant="contained"
            color="primary"
          >
            Show my Concerts!
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default SearchForm;

{
  /* <form className="search">
  <div className="form-group">
    <label htmlFor="event">Event:</label>
    <input
      value={props.search}
      onChange={props.handleInputChange}
      name="event"
      list="events"
      type="text"
      className="form-control"
      placeholder="Type in an artist name"
      id="event"
    />
    {/* <datalist id="events">
          {props.events.map((event) => (
            <option value={event} key={event} />
          ))}
        </datalist> */
}
//     <button
//       type="submit"
//       onClick={props.handleFormSubmit}
//       className="btn btn-success"
//     >
//       Search
//     </button>
//   </div>
// </form> */}

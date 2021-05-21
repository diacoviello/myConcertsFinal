import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EventBusyIcon from '@material-ui/icons/EventBusy';
import SearchIcon from "@material-ui/icons/Search";
import DataUsageIcon from '@material-ui/icons/DataUsage';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import API from "../utils/API";

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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#6d6d78",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    backgroundColor: "#9393ef",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  card: {
    display: "flex",
    padding: 0,
    alignItems: "center",
    justify: "space-between",
  },
  artistCard: {
    minWidth: "100",
    minHeight: "100",
    margin: 5,
    maxHeight: 200,
    maxWidth: 500,
  },
  eventText: {
    display: "flex",
    padding: 5,
    align: "center",
    justify: "center",
  },
  resPaper: {
    margin: 5,
    marginTop: 20,
    padding: 20,
    backgroundColor: "#9393ef",
  },
}));

export default function User2Profile() {
  const classes = useStyles();
  const [events, setEvents] = React.useState([]);
  const [open, setOpen] = React.useState(true);

  function getSavedEvents() {
    API.getSavedEvents()
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.log(err));
  }

  function handleEventDelete(id) {
    console.log(id);
    API.deleteEvent(id).then((res) => getSavedEvents());
  }
  const handleLogout = () => {
    API.logout()
      .then(console.log("success!!!!"))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getSavedEvents();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            myConcerts Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={3} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component="a" href="/searchresult">
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText>myConcerts:Search</ListItemText>
          </ListItem>
          <ListItem button component="a" href="/user">
            <ListItemIcon>
              <EventAvailableIcon />
            </ListItemIcon>
            <ListItemText>myUpcomingEvents</ListItemText>
          </ListItem>
          <ListItem button component="a" href="/pastevents">
            <ListItemIcon>
              <EventBusyIcon />
            </ListItemIcon>
            <ListItemText>myPastEvents</ListItemText>
          </ListItem>
          <ListItem button component="a" href="/stats">
            <ListItemIcon>
              <DataUsageIcon />
            </ListItemIcon>
            <ListItemText>myStats</ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            component="a"
            href="/"
            onClick={() => handleLogout()}
          >
            <ListItemIcon>
              <ExitToAppIcon color="inherit" />
            </ListItemIcon>
            <ListItemText>Log Out</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container justify="center">
          <Grid item align="center" xs={9}>
          <Paper className={classes.resPaper}>
            <Typography variant="h4" style={{ align: "center" }}>
              <strong>
                myUpcomingEvents
              </strong>
            </Typography>
          </Paper>
          </Grid></Grid>
          {events ? (
            <div>
              {events.map((event) => (
                <Grid
                  className="overflow-container"
                  container
                  direction="row"
                  spacing={3}
                  key={event.id}
                >
                  <Grid item xs={12}>
                    <Paper className={classes.resPaper} elevation={5}>
                      <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                        spacing={3}
                      >
                        <Grid item>
                          {/* <Card className={classes.card} variant="outlined" style={{margin: 5}}>
                            <CardContent className={classes.artistCard}> */}
                          <Typography variant="h6" component="h2">
                            <img
                              src={event.artistImg}
                              className={classes.artistCard}
                            ></img>
                          </Typography>
                          {/* </CardContent>
                          </Card> */}
                          <Typography
                            className={classes.eventText}
                            component="h2"
                          >
                            <strong>{event.artist_name}</strong>
                          </Typography>
                        </Grid>
                        <Grid wrap="nowrap" item className={classes.artistCard}>
                          <Typography
                            className={classes.eventText}
                            component="h2"
                            variant="h5"
                          >
                            <strong>{event.venue_name}</strong>
                          </Typography>
                          <Typography
                            className={classes.eventText}
                            component="h2"
                          >
                            {event.location}
                          </Typography>
                        </Grid>
                        <Grid item className={classes.artistCard}>
                          <Typography
                            className={classes.eventText}
                            component="h2"
                          >
                            <strong>{event.time}</strong>
                          </Typography>
                          <Typography
                            className={classes.eventText}
                            component="h2"
                          >
                            {event.date}
                          </Typography>
                        </Grid>
                      </Grid>
                      <p></p>
                      <Grid container justify="center" spacing={4}>
                        <Grid item>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            href={event.event_url}
                            target="_blank"
                          >
                            More Info
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            href={
                              "https://www.google.com/maps/search/?api=1&query=" +
                              event.latitude +
                              "," +
                              event.longitude
                            }
                            target="_blank"
                          >
                            Get Directions
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            onClick={() => handleEventDelete(event._id)}
                            size="small"
                            variant="contained"
                            color="primary"
                          >
                            Remove Event
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              ))}
            </div>
          ) : (
            <h3>No Results to Display</h3>
          )}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

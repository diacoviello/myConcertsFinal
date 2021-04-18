import React, { useEffect, useState } from "react";
import { BarElement } from "react-chartjs-2";
import axios from "axios";
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
import EventBusyIcon from "@material-ui/icons/EventBusy";
import HomeIcon from "@material-ui/icons/Home";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import API from "../utils/API";
import ArtistsTotal from "../components/ArtistsTotal";
// import {
//   Chart,
//   BarSeries,
//   Title,
//   ArgumentAxis,
//   ValueAxis,
// } from "@devexpress/dx-react-chart-material-ui";
// import { Animation } from "@devexpress/dx-react-chart";

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

// const data = [
//   { year: "1950", population: 2.525 },
//   { year: "1960", population: 3.018 },
//   { year: "1970", population: 3.682 },
//   { year: "1980", population: 4.44 },
//   { year: "1990", population: 5.31 },
//   { year: "2000", population: 6.127 },
//   { year: "2010", population: 6.93 },
// ];

// class BarGraph extends React.PureComponent {
//   constructor(props) {
//     super(props);

//     this.state = {
//       data,
//     };

//   }

//   render() {
//     const { data: chartData } = this.state;

//     return (
//       <Paper>
//         <Chart data={chartData}>
//           <ArgumentAxis />
//           <ValueAxis max={7} />

//           <BarSeries valueField="population" argumentField="year" />
//           <Title text="World population" />
//           <Animation />
//         </Chart>
//       </Paper>
//     );
//   }
// }

export default function PastEvents() {
  const classes = useStyles();
  const [events, setEvents] = React.useState([]);
  const [open, setOpen] = React.useState(true);
  // const [uniqArtists, setUniqArtists] = React.useState([]);

  function getPastSavedEvents() {
    API.getPastSavedEvents()
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.log(err));
  }

  // function artistData() {
  //   events = events;

  //     API.getArtistTotal()
  //     .then(() => {
  //         console.log(res.data);
  //       }
  //     )
  //     .catch((err) => console.log(err));
  // }

  // const artistData = () => {
    // const [chartData, setChartData] = React.useState({});
    // const [showsNum, setShowsNum] = React.useState([]);
    // const [artistName, setArtistName] = React.useState([]);

    // const chart = () => {
    //   let shows = [];
    //   let artist = [];
    //   axios
    //     .get.getPastSavedEvents()
    //     .then((res) => {
    //       console.log(res);
    //       for (const dataObj of res.data.data) {
    //         shows.aggregate([
    //           { $group: { _id: "$artist_name", count: { $sum: 1 } } },
    //         ]);

    //         shows.push(dataObj.count);
    //         artist.push(dataObj.artist_name);
    //       }
    //       setChartData({
    //         labels: artist,
    //         datasets: [
    //           {
    //             label: "Total Shows seen by Artist",
    //             data: shows,
    //             backgroundColor: [
    //               "rgba(255, 99, 132, 0.2)",
    //               "rgba(255, 159, 64, 0.2)",
    //               "rgba(255, 205, 86, 0.2)",
    //               "rgba(75, 192, 192, 0.2)",
    //               "rgba(54, 162, 235, 0.2)",
    //               "rgba(153, 102, 255, 0.2)",
    //               "rgba(201, 203, 207, 0.2)",
    //             ],
    //             borderColor: [
    //               "rgb(255, 99, 132)",
    //               "rgb(255, 159, 64)",
    //               "rgb(255, 205, 86)",
    //               "rgb(75, 192, 192)",
    //               "rgb(54, 162, 235)",
    //               "rgb(153, 102, 255)",
    //               "rgb(201, 203, 207)",
    //             ],
    //             borderWidth: 1,
    //           },
    //         ],
    //       });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    //   console.log(artistName, showsNum);
    // };

    useEffect(() => {
      getPastSavedEvents();
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
            <ListItem button component="a" href="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
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
          </List>
          <Divider />
          <List>
            <ListItem button component="a" href="/">
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
            <Paper>
              Total events attended: {events.length}
              <p>Total artists seen: {events.length}</p>
            </Paper>
            <Paper>
              <ArtistsTotal />
            </Paper>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    );
  };


import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import API from "../../utils/API";

const ArtistsTotal = () => {
  const [chartData, setChartData] = useState({});
  const [events, setEvents] = React.useState([]);
  const [showsNum, setShowsNum] = useState([]);
  const [artistName, setArtistName] = useState([]);

  function getPastSavedEvents() {
    API.getPastSavedEvents()
      .then((res) => {
        setEvents(res.data);
      })
      .then((res) => {
          res.getArtistTotal().then((res) => {
            setShowsNum(res.data);
            console.log(res.data);
          });
      })
      .catch((err) => console.log(err));
  }

  console.log(events);

  function getArtistTotal() {
      API.getArtistTotal()
      .then((res) => {
        API.getArtistTotal().then((res) => {
          setShowsNum(res.data);
          console.log(res.data);
        });
      })
      .catch((err) => console.log(err));
  }
  const chart = () => {
    let shows = [];
    let artist = [];

    axios
      .get(events)
      .then((res) => {
        console.log(res);
        for (const dataObj of res.data.data) {
          events.aggregate([
            { $group: { _id: "$artist_name", count: { $sum: 1 } } },
          ]);

          shows.push(parseInt(dataObj.event_id));
          artist.push(dataObj.artist_name);
        }
        setChartData({
          labels: artist,
          datasets: [
            {
              label: "Total Shows seen by Artist",
              data: shows,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
              ],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(artistName, showsNum);
  };

  useEffect(() => {
    getPastSavedEvents();
    getArtistTotal();
    chart();
  }, []);

  return (
    <div className="App">
      <h1>Chart</h1>
      <div>
        check
        <Bar
          data={chartData}
          options={{
            responsive: true,
            title: {
              text: "# of shows seen by each artist",
              display: true,
            },
            indexAxis: "y",
          }}
        />
      </div>
    </div>
  );
};

export default ArtistsTotal;

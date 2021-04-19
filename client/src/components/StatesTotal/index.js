import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import { Pie } from "react-chartjs-2";
import API from "../../utils/API";

const StatesTotal = () => {
  const [chartStateData, setChartStateData] = useState({});
  const [total, setTotal] = useState([]);
  const [statesShows, setStatesShows] = useState([]);
  const [statesName, setStatesName] = useState([]);

  console.log(total);
  console.log(statesName);

  const chartState = () => {
    let states = [];
    let shows = [];

    API.getStatesTotal()
      .then((res) => {
        setStatesShows(res.data);
        console.log(res.data);
        for (const dataObj of res.data) {
          states.push(dataObj._id);
          shows.push(dataObj.count);

          console.log(states, shows);
        }
        setStatesName(states);
        setStatesShows(shows);

        setChartStateData({
          labels: statesName,
          datasets: [
            {
              label: "myConcerts by State/Region",
              data: statesShows,
              backgroundColor: ["rgba(75, 192, 192, 0.6)"],
              borderWidth: 0,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    chartState();
  }, []);

const format = {
  labels: statesName,
  datasets: [
    {
      label: statesName,
      backgroundColor: [
        "#B21F00",
        "#C9DE00",
        "#2FDE00",
        "#00A6B4",
        "#6800B4",
        "#ffafbd",
        "#2193b0",
        "#bdc3c7",
        "#ffc3a0",
        "#6dd5ed",
        "#6dd5ed",
        "#cc2b5e",
        "#753a88",
        "#734b6d",
        "#2c3e50",
        "#42275a",
        "#48b1bf",
        "#06beb6",
        "#06beb6",
        "#ef629f",
      ],
      hoverBackgroundColor: [
        "#501800",
        "#4B5000",
        "#175000",
        "#003350",
        "#35014F",
        "#ffafbd",
        "#2193b0",
        "#bdc3c7",
        "#ffc3a0",
        "#6dd5ed",
        "#6dd5ed",
        "#cc2b5e",
        "#753a88",
        "#734b6d",
        "#2c3e50",
        "#42275a",
        "#48b1bf",
        "#06beb6",
        "#06beb6",
        "#ef629f",
      ],
      data: statesShows,
    },
  ],
};

  return (
    <div>
      <Typography style={{display: "flex", fontSize: 32, color: "gray"}}><strong>myConcerts by State/Region</strong></Typography><br />
      <Pie
        data={format}
        options={{
          // title: {
          //   display: true,
          //   text: "myConcerts by State/Region",
          //   fontSize: 32,
          // },
          legend: {
            display: true,
            position: "right",
          },
        }}
        style={{ height: "400" }}
      />
    </div>
  );
};

export default StatesTotal;

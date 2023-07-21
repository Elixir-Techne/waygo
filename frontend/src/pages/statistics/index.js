import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useQuery } from "@tanstack/react-query";
import ArgonBox from "components/ArgonBox";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Endpoints } from "utils/httpServices";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Grid } from "@mui/material";
import { useArgonController } from "context";
import ArgonTypography from "components/ArgonTypography";

const Statistics = () => {
  const [controller] = useArgonController();
  const { darkMode } = controller;

  const [start, setStart] = React.useState();
  const [end, setEnd] = React.useState();

  const [options, setOptions] = useState({
    theme: {
      mode: "light",
      palette: "#fff",
    },
    chart: {
      width: "100%",
      height: 400,
    },
    stroke: {
      curve: "smooth",
      show: "false",
    },
    fill: {
      type: "solid",
      opacity: 1,
    },
    xaxis: {
      type: "category",
    },
    plotOptions: {
      bar: {
        columnWidth: 40,
        borderRadius: 5,
      },
    },
    colors: ["#2E93fA", "#66DA26", "#546E7A", "#7be3af", "#c5206ab5"],
  });

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      theme: { ...prev.theme, mode: darkMode ? "dark" : "light" },
    }));
  }, [darkMode]);

  const { data } = useQuery(
    [
      `${Endpoints.statistics}`,
      {
        start: dayjs(start).format("YYYY-MM-DD HH:mm:ss"),
        end: dayjs(end).format("YYYY-MM-DD HH:mm:ss"),
      },
    ],
    {
      enabled: Boolean(start && end),
    }
  );

  return (
    <ArgonBox>
      <ArgonBox sx={{ gap: "10px", display: "flex" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Start Date"
            value={start}
            onChange={(newValue) => setStart(newValue)}
          />
          <DatePicker
            label="Select End Date"
            value={end}
            onChange={(newValue) => setEnd(newValue)}
          />
        </LocalizationProvider>
      </ArgonBox>
      {data ? (
        <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
          <Grid item xs={12}>
            <ArgonTypography>
              Wood of selected species dry out in the time frame (in cubic
              meters)
            </ArgonTypography>
            <Chart
              height="300px"
              options={options}
              series={[
                {
                  name: "Species",
                  data: data?.total_wood_dried,
                  type: "bar",
                },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <ArgonTypography>
              Total quantity have the selected chambers dried in the time frame
              (in cubic meters, regardless of species)
            </ArgonTypography>
            <Chart
              height="300px"
              options={options}
              series={[
                {
                  name: "Chambers",
                  data: data?.total_chamber_quantity_dried,
                  type: "bar",
                },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <ArgonTypography>
              Chambers be in operation, operation vs idle time
            </ArgonTypography>
            <Chart
              height="300px"
              options={{
                ...options,
                chart: {
                  ...options.chart,
                  stacked: true,
                  stackType: "normal",
                  type: "bar",
                },
                xaxis: {
                  ...options.xaxis,
                  categories: Object.keys(data?.operation_time),
                },
                plotOptions: {
                  ...options.plotOptions,
                  bar: {
                    ...options.plotOptions.bar,
                    columnWidth: 40,
                    dataLabels: {
                      position: "top",
                      total: {
                        enabled: true,
                        formatter: (p, { seriesIndex, dataPointIndex, w }) => {
                          let idle = w?.config?.series[1]?.data[dataPointIndex];
                          if (idle && p) {
                            let total = parseFloat(p);
                            idle = parseFloat(idle);
                            return `${
                              Math.round(((total - idle) / total) * 10000) / 100
                            } %`;
                          }
                          return "0 %";
                        },
                      },
                    },
                  },
                },
              }}
              series={[
                {
                  name: "Operation Time",
                  data: Object.values(data?.operation_time),
                  type: "bar",
                },
                {
                  name: "Idle Time",
                  data: Object.values(data?.idle_time),
                  type: "bar",
                },
              ]}
            />
          </Grid>
        </Grid>
      ) : null}
    </ArgonBox>
  );
};

export default Statistics;

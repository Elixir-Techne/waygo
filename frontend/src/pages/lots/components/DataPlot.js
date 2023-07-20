import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "utils/httpServices";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import { Controller } from "swiper";
import "chartjs-plugin-zoom";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArgonButton from "components/ArgonButton";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const keys = ["rh", "amc"];

export const LotsDataPlot = ({ lotData, setView }) => {
  const navigate = useNavigate();
  const { darkMode } = Controller;
  const [series, setSeries] = useState([]);

  const typographyProps = {
    fontWeight: "medium",
    color: darkMode ? "#fff" : "#000",
  };
  const { data, isLoading } = useQuery(
    [`${Endpoints.lots}${lotData.id}/lot-data/`],

    {
      enabled: true,
    }
  );
  useEffect(() => {
    if (data) {
      const temp = data?.reduce((acc, curr) => {
        keys.forEach((key) => {
          const obj = {
            x: moment(curr.time).format("YYYY-MM-DD"),
            y: curr[key],
          };
          if (acc?.[key]) {
            acc[key].push(obj);
          } else {
            acc[key] = [obj];
          }
        });
        return acc;
      }, {});
      setSeries(Object.entries(temp).map(([k, v]) => ({ name: k, data: v })));
    }
  }, [data]);

  return (
    <ArgonBox>
      <ArgonButton
        onClick={() => {
          setView("all");
          navigate("/ongoing-lots");
        }}
      >
        <ArrowBackIosIcon />
        Back
      </ArgonButton>
      <Chart
        options={{
          chart: { type: "bar" },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "datetime",
          },
          colors: ["#2E93fA", "#66DA26", "#546E7A", "#E91E63", "#FF9800"],
        }}
        series={series}
      />
      <ArgonBox mt={2}>
        <ArgonTypography {...typographyProps}>
          Chamber:{lotData?.chamber}
        </ArgonTypography>
        <ArgonTypography {...typographyProps}>
          Lot ID: {lotData?.id}
        </ArgonTypography>
        <ArgonTypography {...typographyProps}>
          Species: {lotData?.species}
        </ArgonTypography>
        <ArgonTypography {...typographyProps}>
          Program Name: {lotData?.program_name}
        </ArgonTypography>
        <ArgonTypography {...typographyProps}>
          Quantity: {lotData?.quantity}
        </ArgonTypography>
      </ArgonBox>
    </ArgonBox>
  );
};

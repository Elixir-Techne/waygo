import { Card, CardContent, CardHeader } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import React from "react";
import { Controller } from "swiper";
import { getChamberStatus } from "utils/helper";

const StatusReportCard = ({ data }) => {
  const { darkMode } = Controller;
  return (
    <Card
      sx={{
        background: "transparent",
        boxShadow: "none",
        minWidth: "400px",
        backgroundColor: "#3f8693",
        borderRadius: "5px",
        maxHeight: "421px",
      }}
    >
      <CardHeader
        sx={{ textAlign: "center" }}
        title={
          <ArgonTypography fontWeight="medium" color="white">
            Chamber {data.chamber}
          </ArgonTypography>
        }
      />
      <CardContent>
        <ArgonTypography fontWeight="medium" color="white">
          Last Report:
        </ArgonTypography>
        <ArgonTypography fontWeight="medium" color="white">
          Status: {getChamberStatus(data?.lot?.status_code)}
        </ArgonTypography>
        <ArgonTypography fontWeight="medium" color="white">
          Species: {data?.lot?.species}
        </ArgonTypography>
        <ArgonTypography fontWeight="medium" color="white">
          Quantity: {data?.lot?.quantity}
        </ArgonTypography>
        <ArgonTypography fontWeight="medium" color="white">
          RH:
        </ArgonTypography>
        <ArgonBox display="flex" justifyContent="space-between">
          <ArgonTypography fontWeight="medium" color="white">
            DBTI:
          </ArgonTypography>
          <ArgonTypography fontWeight="medium" color="white">
            WBTI:
          </ArgonTypography>
        </ArgonBox>
        <ArgonTypography fontWeight="medium" color="white">
          AMC:
        </ArgonTypography>
        <ArgonTypography fontWeight="medium" color="white">
          Current Command:
        </ArgonTypography>
        <ArgonTypography fontWeight="medium" color="white">
          Start time:
        </ArgonTypography>
        <ArgonTypography fontWeight="medium" color="white">
          Time ellapsed:
        </ArgonTypography>
      </CardContent>
    </Card>
  );
};

export default StatusReportCard;

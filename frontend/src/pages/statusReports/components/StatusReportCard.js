import { Card, CardContent, CardHeader } from "@mui/material";
import { typography } from "@mui/system";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import React from "react";
import { Controller } from "swiper";
import { getChamberStatus } from "utils/helper";

const typographyProps = {
  fontWeight: "medium",
  color: "white",
};
const StatusReportCard = ({ data }) => {
  const { darkMode } = Controller;
  return (
    <Card
      sx={{
        flex: 1,
        background: "transparent",
        boxShadow: "none",
        minWidth: "350px",
        backgroundColor: "transparent",
        boxShadow: "0px 0px 5px 2px lightgray",
        borderRadius: "5px",
        maxHeight: "421px",
      }}
    >
      <CardHeader
        sx={{ textAlign: "center" }}
        title={
          <ArgonTypography {...typographyProps} color="black">
            Chamber {data.chamber}
          </ArgonTypography>
        }
      />
      <CardContent>
        <ArgonTypography {...typographyProps} color="black">
          Last Report:
        </ArgonTypography>
        <ArgonTypography {...typographyProps} color="black">
          Status: {getChamberStatus(data?.lot?.status_code)}
        </ArgonTypography>
        <ArgonTypography {...typographyProps} color="black">
          Species: {data?.lot?.species}
        </ArgonTypography>
        <ArgonTypography {...typographyProps} color="black">
          Quantity: {data?.lot?.quantity}
        </ArgonTypography>
        <ArgonTypography {...typographyProps} color="black">
          RH:
        </ArgonTypography>
        <ArgonBox display="flex" justifyContent="space-between">
          <ArgonTypography {...typographyProps} color="black">
            DBTI:
          </ArgonTypography>
          <ArgonTypography {...typographyProps} color="black">
            WBTI:
          </ArgonTypography>
        </ArgonBox>
        <ArgonTypography {...typographyProps} color="black">
          AMC:
        </ArgonTypography>
        <ArgonTypography {...typographyProps} color="black">
          Current Command:
        </ArgonTypography>
        <ArgonTypography {...typographyProps} color="black">
          Start time:
        </ArgonTypography>
        <ArgonTypography {...typographyProps} color="black">
          Time ellapsed:
        </ArgonTypography>
      </CardContent>
    </Card>
  );
};

export default StatusReportCard;

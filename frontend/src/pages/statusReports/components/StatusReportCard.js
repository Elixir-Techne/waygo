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
          <ArgonTypography {...typographyProps}>
            Chamber {data.chamber}
          </ArgonTypography>
        }
      />
      <CardContent>
        <ArgonTypography {...typographyProps}>Last Report:</ArgonTypography>
        <ArgonTypography {...typographyProps}>
          Status: {getChamberStatus(data?.lot?.status_code)}
        </ArgonTypography>
        <ArgonTypography {...typographyProps}>
          Species: {data?.lot?.species}
        </ArgonTypography>
        <ArgonTypography {...typographyProps}>
          Quantity: {data?.lot?.quantity}
        </ArgonTypography>
        <ArgonTypography {...typographyProps}>RH:</ArgonTypography>
        <ArgonBox display="flex" justifyContent="space-between">
          <ArgonTypography {...typographyProps}>DBTI:</ArgonTypography>
          <ArgonTypography {...typographyProps}>WBTI:</ArgonTypography>
        </ArgonBox>
        <ArgonTypography {...typographyProps}>AMC:</ArgonTypography>
        <ArgonTypography {...typographyProps}>Current Command:</ArgonTypography>
        <ArgonTypography {...typographyProps}>Start time:</ArgonTypography>
        <ArgonTypography {...typographyProps}>Time ellapsed:</ArgonTypography>
      </CardContent>
    </Card>
  );
};

export default StatusReportCard;

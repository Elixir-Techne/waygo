import { Card, CardContent, CardHeader, useMediaQuery } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import React from "react";
import { getChamberStatus } from "utils/helper";
import dayjs from "dayjs";
import styled from "styled-components";
const typographyProps = {
  fontWeight: "medium",
  color: "white",
  display: "flex",
};

const TypoGraphyLabel = styled(ArgonTypography)({
  color: "lightgray",
  fontSize: "1.2rem",
  marginRight: "1rem",
});

const StatusReportCard = ({ data }) => {
  const status = getChamberStatus(data?.lot?.status_code);
  const isMobile = useMediaQuery("(max-width:475px)");
  return (
    <Card
      sx={{
        flex: 1,
        background: "transparent",
        minWidth: isMobile ? "260px" : "350px",
        backgroundColor: status === "idel" ? "blue" : "green",
        boxShadow: "0px 0px 5px 2px lightgray",
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
        <ArgonTypography {...typographyProps}>
          <TypoGraphyLabel>Last Report:</TypoGraphyLabel>
        </ArgonTypography>
        <ArgonTypography {...typographyProps}>
          <TypoGraphyLabel>Status:</TypoGraphyLabel>
          {getChamberStatus(data?.lot?.status_code)}
        </ArgonTypography>
        {!status === "idel" ? (
          <>
            <ArgonTypography {...typographyProps}>
              <TypoGraphyLabel>Species:</TypoGraphyLabel>
              {data?.lot?.species}
            </ArgonTypography>
            <ArgonTypography {...typographyProps}>
              <TypoGraphyLabel>Quantity:</TypoGraphyLabel>
              {data?.lot?.quantity}
            </ArgonTypography>
            <ArgonTypography {...typographyProps}>
              <TypoGraphyLabel>RH:</TypoGraphyLabel>
            </ArgonTypography>
            <ArgonBox display="flex" justifyContent="space-between">
              <ArgonTypography {...typographyProps}>
                <TypoGraphyLabel>DBTI:</TypoGraphyLabel>
              </ArgonTypography>
              <ArgonTypography {...typographyProps}>
                <TypoGraphyLabel>WBTI:</TypoGraphyLabel>
              </ArgonTypography>
            </ArgonBox>
            <ArgonTypography {...typographyProps}>
              <TypoGraphyLabel>AMC:</TypoGraphyLabel>
            </ArgonTypography>
            <ArgonTypography {...typographyProps}>
              <TypoGraphyLabel>Current Command:</TypoGraphyLabel>
            </ArgonTypography>
            <ArgonTypography {...typographyProps}>
              S<TypoGraphyLabel>tart time:</TypoGraphyLabel>
            </ArgonTypography>
            <ArgonTypography {...typographyProps}>
              <TypoGraphyLabel>Time ellapsed:</TypoGraphyLabel>
            </ArgonTypography>
          </>
        ) : (
          <>
            <ArgonTypography {...typographyProps}>
              <TypoGraphyLabel>Last completed lot:</TypoGraphyLabel>
            </ArgonTypography>
            <ArgonTypography {...typographyProps}>
              <TypoGraphyLabel>Idel for:</TypoGraphyLabel>
              {`${dayjs().format("D")}days,${dayjs().format(
                "H"
              )}hours,${dayjs().format("m")}mins`}
            </ArgonTypography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusReportCard;

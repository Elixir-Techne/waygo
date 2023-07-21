import { Card, CardContent, CardHeader, useMediaQuery } from "@mui/material";
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
  const status = getChamberStatus(data?.lot?.status_code);
  const isMobile = useMediaQuery("(max-width:475px)");
  const { darkMode } = Controller;
  return (
    <Card
      sx={{
        flex: 1,
        background: "transparent",
        boxShadow: "none",
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
        <ArgonTypography {...typographyProps}>Last Report:</ArgonTypography>
        <ArgonTypography {...typographyProps}>
          Status: {getChamberStatus(data?.lot?.status_code)}
        </ArgonTypography>
        {!status === "idel" ? (
          <>
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
            <ArgonTypography {...typographyProps}>
              Current Command:
            </ArgonTypography>
            <ArgonTypography {...typographyProps}>Start time:</ArgonTypography>
            <ArgonTypography {...typographyProps}>
              Time ellapsed:
            </ArgonTypography>
          </>
        ) : (
          <>
            <ArgonTypography {...typographyProps}>
              Last completed lot:
            </ArgonTypography>
            <ArgonTypography {...typographyProps}>
              Idel for:{data?.time}
            </ArgonTypography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusReportCard;

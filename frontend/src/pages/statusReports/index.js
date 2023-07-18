import React from "react";
import ArgonBox from "components/ArgonBox";
import StatusReportCard from "./components/StatusReportCard";
import { Endpoints } from "utils/httpServices";
import { useQuery } from "@tanstack/react-query";

const StatusReports = () => {
  const { data, isLoading } = useQuery([Endpoints.statusReport], {
    enabled: true,
  });
  return (
    <ArgonBox
      mt={8}
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      gap="20px"
    >
      {!isLoading &&
        data?.map((item) => <StatusReportCard data={item} key={item.id} />)}
    </ArgonBox>
  );
};

export default StatusReports;

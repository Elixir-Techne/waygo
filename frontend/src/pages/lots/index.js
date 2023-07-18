import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import moment from "moment";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Endpoints } from "utils/httpServices";

export const Lots = () => {
  const location = useLocation();
  const [view, setView] = useState("all");
  const { data, isLoading } = useQuery(
    location.pathname === "/ongoing-lots"
      ? [Endpoints.ongoingLots]
      : [Endpoints.historicalLots],
    {
      enabled: true,
    }
  );

  const columns = [
    { field: "chamber", headerName: "Chamber", flex: 1 },
    {
      field: "id",
      headerName: "Lot ID",
      flex: 1,
      sortable: false,
    },
    {
      field: "start_time",
      headerName: "Start Time",
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => moment(row.start_time).format("YYYY-MM-DD"),
    },
    {
      field: "program_name",
      headerName: "Program",
      type: "number",
      flex: 1,
      sortable: false,
    },
    {
      field: "total_commands",
      headerName: "Commands",
      sortable: false,
      flex: 1,
    },
    {
      field: "species",
      headerName: "Species",
      sortable: false,
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      sortable: false,
      flex: 1,
    },
    {
      field: "duration",
      headerName: "Ellapsed",
      sortable: false,
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      sortable: false,
      width: 350,
      renderCell: ({ row }) => (
        <ArgonBox gap="10px">
          <ArgonButton>Data table</ArgonButton>
          <ArgonButton>Data plot</ArgonButton>
        </ArgonBox>
      ),
    },
  ];

  const renderContent = () => {
    switch (view) {
      case "table":
        return null;
      case "plot":
        return null;
      default:
        return (
          <DataGrid
            rows={data || []}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        );
    }
  };

  return (
    <ArgonBox sx={{ height: 400, width: "100%" }} mt={8}>
      {renderContent()}
    </ArgonBox>
  );
};

import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import moment from "moment";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Endpoints } from "utils/httpServices";
import { LotsDataTable } from "./components/DataTable";
import { LotsDataPlot } from "./components/DataPlot";

export const Lots = () => {
  const location = useLocation();
  const [view, setView] = useState("all");
  const [lotID, setLotID] = useState("");
  const[lotData,setLotData]=useState({})

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });

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
          <ArgonButton
            onClick={() => {
              setView("table");
              setLotID(row?.id);
            }}
          >
            Data table
          </ArgonButton>
          <ArgonButton
            onClick={() => {
              setView("plot");
              setLotData(row)
            }}
          >
            Data plot
          </ArgonButton>
        </ArgonBox>
      ),
    },
  ];

  const renderContent = () => {
    switch (view) {
      case "table":
        return <LotsDataTable lotID={lotID} />;
      case "plot":
        return <LotsDataPlot lotData={lotData} />;
      default:
        return (
          <DataGrid
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rows={data || []}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            disableRowSelectionOnClick
          />
        );
    }
  };

  return (
    <ArgonBox sx={{ height: "100%", width: "100%" }} mt={8}>
      {renderContent()}
    </ArgonBox>
  );
};

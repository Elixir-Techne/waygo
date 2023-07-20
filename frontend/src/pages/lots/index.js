import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import moment from "moment";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Endpoints } from "utils/httpServices";
import { LotsDataTable } from "./components/DataTable";
import { LotsDataPlot } from "./components/DataPlot";

export const Lots = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState("all");
  const [lotID, setLotID] = useState("");
  const [lotData, setLotData] = useState({});

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
    { field: "chamber", headerName: "Chamber", width: 90 },
    {
      field: "id",
      headerName: "Lot ID",
      // flex: 1,
      width: 155,
      sortable: false,
    },
    {
      field: "start_time",
      headerName: "Start Time",
      // flex: 1,
      width: 130,
      sortable: false,
      renderCell: ({ row }) => moment(row.start_time).format("YYYY-MM-DD"),
    },
    {
      field: "program_name",
      headerName: "Program",
      // flex: 1,
      width: 210,
      sortable: false,
    },
    {
      field: "total_commands",
      headerName: "Commands",
      sortable: false,
      // flex: 1,
      width: 110,
    },
    {
      field: "species",
      headerName: "Species",
      sortable: false,
      // flex: 1,
      width: 135,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      sortable: false,
      // flex: 1,
      width: 110,
    },
    {
      field: "duration",
      headerName: "Ellapsed",
      sortable: false,
      // flex: 1,
      width: 140,
    },
    {
      field: "actions",
      type: "actions",
      sortable: false,
      width: 290,
      renderCell: ({ row }) => (
        <ArgonBox gap="10px" sx={{ width: "100%", display: "flex" }}>
          <ArgonButton
            onClick={() => {
              setView("table");
              setLotID(row?.id);
              navigate(`/ongoing-lots/data/${row?.id}`);
            }}
          >
            Data table
          </ArgonButton>
          <ArgonButton
            onClick={() => {
              setView("plot");
              setLotData(row);
              navigate(`/ongoing-lots/data/${row?.id}`);
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
        return <LotsDataTable lotID={lotID} setView={setView} />;
      case "plot":
        return <LotsDataPlot lotData={lotData} setView={setView} />;
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

import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import moment from "moment";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Endpoints } from "utils/httpServices";
import { LotsDataTable } from "./components/DataTable";
import { LotsDataPlot } from "./components/DataPlot";
import Loader from "examples/Loader";
import ExportToolBar from "examples/ExportToolBar";

export const Lots = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, view } = useParams();

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });
  const name = location.pathname.split("/").slice(1);

  const url =
    location.pathname === "/ongoing-lots"
      ? Endpoints.ongoingLots
      : Endpoints.historicalLots;

  const { data, isLoading } = useQuery(
    [
      url,
      {
        page: paginationModel.page + 1,
        page_size: paginationModel.pageSize,
      },
    ],
    {
      enabled: !id,
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
              navigate(`/${name[0]}/data/${row?.id}`);
            }}
          >
            Data table
          </ArgonButton>
          <ArgonButton
            onClick={() => {
              navigate(`/${name[0]}/plot/${row?.id}`);
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
      case "data":
        return <LotsDataTable lotID={id} />;
      case "plot":
        return <LotsDataPlot lotID={id} />;
      default:
        return (
          <>
            {/* <ArgonBox mb={2} display="flex" justifyContent="end">
              <ArgonButton onClick={handlePrint}>Print</ArgonButton>
            </ArgonBox> */}
            <DataGrid
              autoHeight
              rows={data?.results || []}
              columns={columns}
              loading={isLoading}
              disableRowSelectionOnClick
              sx={{ overflowY: "auto" }}
              rowCount={data?.count || 0}
              paginationMode="server"
              pageSizeOptions={[25, 50, 100]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              slots={{ toolbar: ExportToolBar }}
            />
          </>
        );
    }
  };

  return (
    <ArgonBox sx={{ height: "100%", width: "100%" }} mt={8}>
      {renderContent()}
    </ArgonBox>
  );
};

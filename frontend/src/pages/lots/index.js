import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Endpoints } from "utils/httpServices";
import { LotsDataTable } from "./components/DataTable";
import { LotsDataPlot } from "./components/DataPlot";
import ExportToolBar from "examples/ExportToolBar";
import dayjs from "dayjs";

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
      renderCell: ({ row }) => dayjs(row.start_time).format("YYYY-MM-DD"),
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
      field: "complete_time",
      headerName: "Complete Time",
      sortable: false,
      // flex: 1,
      width: 140,
      renderCell: ({ row }) =>
        row.complete_time ? dayjs(row.complete_time).format("YYYY-MM-DD") : "",
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
    <ArgonBox sx={{ height: "100%", width: "100%" }}>
      {renderContent()}
    </ArgonBox>
  );
};

import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import { useRef, useState } from "react";
import { Endpoints } from "utils/httpServices";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import ExportToolBar from "examples/ExportToolBar";

export const LotsDataTable = ({ lotID }) => {
  const navigate = useNavigate();
  const ref = useRef();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const { data, isLoading } = useQuery(
    [
      `${Endpoints.lots}${lotID}/lot-data/`,
      {
        page: paginationModel.page + 1,
        page_size: paginationModel.pageSize,
      },
    ],
    {
      enabled: true,
    }
  );

  const columns = [
    { field: "amc", headerName: "Amc", width: 110 },
    {
      field: "command_name",
      headerName: "Command",
      // flex: 1,
      width: 130,
      sortable: false,
    },
    {
      field: "dbt1",
      headerName: "dbt1",
      // flex: 1,
      width: 80,
      sortable: false,
    },
    {
      field: "dbt2",
      headerName: "dbt2",
      type: "number",
      // flex: 1,
      width: 80,
      sortable: false,
    },
    {
      field: "details",
      headerName: "details",
      sortable: false,
      // flex: 1,
      width: 100,
    },
    {
      field: "fan_ccw",
      headerName: "fan_ccw",
      sortable: false,
      // flex: 1,
      width: 90,
    },
    {
      field: "fan_cw",
      headerName: "fan_cw",
      sortable: false,
      // flex: 1,
      width: 90,
    },
    {
      field: "flaps",
      headerName: "flaps",
      sortable: false,
      // flex: 1,
      width: 80,
    },
    {
      field: "heat",
      headerName: "heat",
      sortable: false,
      // flex: 1,
      width: 80,
    },
    {
      field: "id",
      headerName: "id",
      sortable: false,
      // flex: 1,
      width: 100,
    },
    {
      field: "mc1",
      headerName: "mc1",
      sortable: false,
      // flex: 1,
      width: 80,
    },
    {
      field: "mc2",
      headerName: "mc2",
      sortable: false,
      // flex: 1,
      width: 80,
    },
    {
      field: "mc3",
      headerName: "mc3",
      sortable: false,
      // flex: 1,
      width: 80,
    },
    {
      field: "mc4",
      headerName: "mc4",
      sortable: false,
      // flex: 1,
      width: 80,
    },
    {
      field: "mc5",
      headerName: "mc5",
      sortable: false,
      // flex: 1,
      width: 80,
    },
    {
      field: "mc6",
      headerName: "mc6",
      sortable: false,
      // flex: 1,
      width: 80,
    },
    {
      field: "mc7",
      headerName: "mc7",
      sortable: false,
      // flex: 1,
      width: 80,
    },
    {
      field: "mc8",
      headerName: "mc8",
      sortable: false,
      // flex: 1,
      width: 80,
    },
    {
      field: "reserved",
      headerName: "reserved",
      sortable: false,
      // flex: 1,
      width: 100,
    },
    {
      field: "rh",
      headerName: "rh",
      sortable: false,
      // flex: 1,
      width: 80,
    },
    {
      field: "spray",
      headerName: "spray",
      sortable: false,
      // flex: 1,
      width: 80,
    },
    {
      field: "time",
      headerName: "time",
      sortable: false,
      // flex: 1,
      width: 200,
    },
    {
      field: "wbt1",
      headerName: "wbt1",
      sortable: false,
      // flex: 1,
      width: 80,
    },
    {
      field: "wbt2",
      headerName: "wbt2",
      sortable: false,
      // flex: 1,
      width: 80,
    },
    {
      field: "wood_temp1",
      headerName: "wood_temp1",
      sortable: false,
      // flex: 1,
      width: 120,
    },
    {
      field: "wood_temp2",
      headerName: "wood_temp2",
      sortable: false,
      // flex: 1,
      width: 120,
    },
  ];

  return (
    <ArgonBox sx={{ height: "100%", width: "100%" }} mt={8}>
      <ArgonBox mb={2} display="flex" justifyContent="space-between">
        <ArgonButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIosIcon />
          Back
        </ArgonButton>
      </ArgonBox>
      <DataGrid
        ref={ref}
        rows={data || []}
        columns={columns}
        loading={isLoading}
        disableRowSelectionOnClick
        rowCount={data?.count || 0}
        paginationMode="server"
        pageSizeOptions={[25, 50, 100]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        slots={{ toolbar: ExportToolBar }}
      />
    </ArgonBox>
  );
};

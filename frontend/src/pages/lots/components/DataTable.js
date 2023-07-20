import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import { useRef } from "react";
import { Endpoints } from "utils/httpServices";
import { useReactToPrint } from "react-to-print";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

export const LotsDataTable = ({ lotID, setView }) => {
  const navigate = useNavigate();
  const ref = useRef();
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
  const { data, isLoading } = useQuery(
    [`${Endpoints.lots}${lotID}/lot-data/`],

    {
      enabled: true,
    }
  );
  const columns = [
    { field: "amc", headerName: "Amc", width: 70 },
    {
      field: "command_name",
      headerName: "Command",
      // flex: 1,
      width: 120,
      sortable: false,
    },
    {
      field: "dbt1",
      headerName: "dbt1",
      // flex: 1,
      width: 70,
      sortable: false,
    },
    {
      field: "dbt2",
      headerName: "dbt2",
      type: "number",
      // flex: 1,
      width: 70,
      sortable: false,
    },
    {
      field: "details",
      headerName: "details",
      sortable: false,
      // flex: 1,
      width: 90,
    },
    {
      field: "fan_ccw",
      headerName: "fan_ccw",
      sortable: false,
      // flex: 1,
      width: 80,
    },
    {
      field: "fan_cw",
      headerName: "fan_cw",
      sortable: false,
      // flex: 1,
      width: 80,
    },
    {
      field: "flaps",
      headerName: "flaps",
      sortable: false,
      // flex: 1,
      width: 70,
    },
    {
      field: "heat",
      headerName: "heat",
      sortable: false,
      // flex: 1,
      width: 70,
    },
    {
      field: "id",
      headerName: "id",
      sortable: false,
      // flex: 1,
      width: 90,
    },
    {
      field: "mc1",
      headerName: "mc1",
      sortable: false,
      // flex: 1,
      width: 70,
    },
    {
      field: "mc2",
      headerName: "mc2",
      sortable: false,
      // flex: 1,
      width: 70,
    },
    {
      field: "mc3",
      headerName: "mc3",
      sortable: false,
      // flex: 1,
      width: 70,
    },
    {
      field: "mc4",
      headerName: "mc4",
      sortable: false,
      // flex: 1,
      width: 70,
    },
    {
      field: "mc5",
      headerName: "mc5",
      sortable: false,
      // flex: 1,
      width: 70,
    },
    {
      field: "mc6",
      headerName: "mc6",
      sortable: false,
      // flex: 1,
      width: 70,
    },
    {
      field: "mc7",
      headerName: "mc7",
      sortable: false,
      // flex: 1,
      width: 70,
    },
    {
      field: "mc8",
      headerName: "mc8",
      sortable: false,
      // flex: 1,
      width: 70,
    },
    {
      field: "reserved",
      headerName: "reserved",
      sortable: false,
      // flex: 1,
      width: 90,
    },
    {
      field: "rh",
      headerName: "rh",
      sortable: false,
      // flex: 1,
      width: 70,
    },
    {
      field: "spray",
      headerName: "spray",
      sortable: false,
      // flex: 1,
      width: 70,
    },
    {
      field: "time",
      headerName: "time",
      sortable: false,
      // flex: 1,
      width: 190,
    },
    {
      field: "wbt1",
      headerName: "wbt1",
      sortable: false,
      // flex: 1,
      width: 70,
    },
    {
      field: "wbt2",
      headerName: "wbt2",
      sortable: false,
      // flex: 1,
      width: 70,
    },
    {
      field: "wood_temp1",
      headerName: "wood_temp1",
      sortable: false,
      // flex: 1,
      width: 110,
    },
    {
      field: "wood_temp2",
      headerName: "wood_temp2",
      sortable: false,
      // flex: 1,
      width: 110,
    },
  ];

  return (
    <ArgonBox sx={{ height: "100%", width: "100%" }} mt={8}>
      <ArgonBox mb={2} display="flex" justifyContent="space-between">
        <ArgonButton
          onClick={() => {
            setView("all");
            navigate("/ongoing-lots");
          }}
        >
          <ArrowBackIosIcon />
          Back
        </ArgonButton>
        <ArgonButton onClick={handlePrint}>Print</ArgonButton>
      </ArgonBox>
      <DataGrid
        ref={ref}
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
    </ArgonBox>
  );
};

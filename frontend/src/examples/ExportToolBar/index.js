const { GridToolbarContainer, GridToolbarExport } = require("@mui/x-data-grid");

const ExportToolBar = () => (
  <GridToolbarContainer>
    <GridToolbarExport csvOptions={{ disableToolbarButton: true }} />
  </GridToolbarContainer>
);

export default ExportToolBar;

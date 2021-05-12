import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { useSelector } from "react-redux";
import { selectDoujinsUrlData } from "../doujins.slice";

export const DoujinUrlDataTable: React.FunctionComponent = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "url", headerName: "Url", width: 300 },
    { field: "title", headerName: "Title", width: 600 },
  ];

  const doujinsUrlData = useSelector(selectDoujinsUrlData);
  const rows = doujinsUrlData.map((data, index) => {
    return { id: index, url: data.url, title: data.title };
  });

  return (
    <div style={{ height: 375, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
      ></DataGrid>
    </div>
  );
};

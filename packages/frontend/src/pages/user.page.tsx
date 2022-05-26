import { Chip } from "@mui/material";

import User from "../api/user.api";
import DataGrid, { gridCol } from "../components/DataGrid.component";

import AppTemplate from "./app.template";

const columns = [
  gridCol(User, "id", { label: "ID", flex: 0.5 }),
  gridCol(User, "name", { label: "Name", flex: 1 }),
  gridCol(User, "phone", { label: "Phone", flex: 1 }),
  gridCol(User, "tags", {
    label: "tags",
    flex: 1,
    renderCell: (value) => (
      <>
        {value.map((tag) => (
          <Chip
            key={tag.id}
            label={tag.name}
            color="primary"
            variant="outlined"
          />
        ))}
      </>
    ),
  }),
];

export default function UserPage() {
  const { data, error } = User.getAll();
  return (
    <AppTemplate title="User">
      <DataGrid data={data} error={error} cols={columns} idKey="id"></DataGrid>
    </AppTemplate>
  );
}

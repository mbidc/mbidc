import { Button, Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";

import { User } from "../api/user.api";
import DataGrid, { gridCol } from "../components/DataGrid.component";
import { DialogForm } from "../components/form/dialog.component";
import { usePagination } from "../utils/pagination";

import { AppContext } from "./app.template";

const columns = [
  gridCol(User, "id", { label: "ID", sx: { flex: 0.5 } }),
  gridCol(User, "name", { label: "Name", sx: { flex: 0.5 } }),
  gridCol(User, "phone", { label: "Phone", sx: { flex: 1 } }),
  gridCol(User, "email", { label: "Email", sx: { flex: 1 } }),
  gridCol(User, "tags", { label: "tags", sx: { flex: 1 } }),
];

export default function UserManagePage() {
  const context = useContext(AppContext);
  useEffect(() => {
    context.modify({
      title: "用户管理",
      action: (
        <Button variant="contained" onClick={() => setOpen(true)}>
          添加
        </Button>
      ),
      breadcrumbs: [
        <Typography key="0" color="text.primary">
          User
        </Typography>,
      ],
    });
  }, []);

  const pagination = usePagination();
  const { data, error } = User.getAll({
    limit: pagination.limit,
    page: pagination.page,
  });

  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogForm
        open={open}
        setOpen={setOpen}
        title="添加用户"
        form={{
          id: {
            formType: "input",
            label: "ID",
          },
          name: {
            formType: "input",
            label: "Name",
          },
          phone: {
            formType: "input",
            label: "Phone",
            type: "phone",
          },
          email: {
            formType: "input",
            label: "Email",
            type: "email",
          },
          department: {
            formType: "input",
            label: "Department",
          },
          tags: {
            formType: "input",
            label: "Tags",
          },
          password: {
            formType: "input",
            label: "Password",
            type: "password",
          },
        }}
        onSubmit={async (data) => {
          await User.create(data);
          window.location.reload();
        }}
      />
      <DataGrid
        data={data?.data}
        total={data?.total}
        error={error}
        cols={columns}
        idKey="id"
        limit={pagination.limit}
        page={pagination.page}
        onPageChange={pagination.setPage}
        onLimitChange={pagination.setLimit}
      ></DataGrid>
    </>
  );
}

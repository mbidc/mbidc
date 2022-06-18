import { Button, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { Subject } from "../api/subject.api";
import DataGrid, { gridCol } from "../components/DataGrid.component";
import { usePagination } from "../utils/pagination";

import { AppContext } from "./app.template";

const columns = [
  gridCol(Subject, "subId", { label: "ID", sx: { flex: 1 } }),
  gridCol(Subject, "name", { label: "名称", sx: { flex: 1 } }),
  gridCol(Subject, "type", { label: "类型", sx: { flex: 0.5 } }),
  gridCol(Subject, "department", { label: "专业", sx: { flex: 0.5 } }),
  gridCol(Subject, "subId", {
    label: "操作",
    sx: { flex: 0.5 },
    renderCell: (row) => (
      <Button size="small" component={Link} to={`/subject/${row}`}>
        查看
      </Button>
    ),
  }),
];

export default function SubjectsPage() {
  const context = useContext(AppContext);
  useEffect(() => {
    context.modify({
      title: "课程列表",
      action: null,
      breadcrumbs: [
        <Typography key="0" color="text.primary">
          Subject
        </Typography>,
      ],
    });
  }, []);

  const pagination = usePagination();
  const { data, error } = Subject.getAll({
    limit: pagination.limit,
    page: pagination.page,
  });

  return (
    <>
      <DataGrid
        data={data?.data}
        total={data?.total}
        error={error}
        cols={columns}
        idKey="subId"
        limit={pagination.limit}
        page={pagination.page}
        onPageChange={pagination.setPage}
        onLimitChange={pagination.setLimit}
      ></DataGrid>
    </>
  );
}

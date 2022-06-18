import { Button, Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Subject } from "../api/subject.api";
import DataGrid, { gridCol } from "../components/DataGrid.component";
import { DialogForm } from "../components/form/dialog.component";
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

const form = {
  subId: {
    formType: "input",
    label: "ID",
  },
  name: {
    formType: "input",
    label: "名称",
  },
  description: {
    formType: "input",
    label: "描述",
    multiline: true,
  },
  type: {
    formType: "input",
    label: "课程类型",
  },
  department: {
    formType: "input",
    label: "专业",
  },
  detail: {
    formType: "input",
    label: "课程信息",
  },
  maxStudents: {
    formType: "input",
    type: "number",
    label: "课程人数",
  },
  document: {
    formType: "file",
    label: "课程文档",
  },
  img: {
    formType: "file",
    label: "课程图片",
  },
  teacherId: {
    formType: "input",
    label: "教师ID",
  },
} as const;

export default function SubjectManagePage() {
  const context = useContext(AppContext);
  useEffect(() => {
    context.modify({
      title: "课程管理",
      action: (
        <Button variant="contained" onClick={() => setOpen(true)}>
          添加
        </Button>
      ),
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

  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogForm
        open={open}
        setOpen={setOpen}
        title="添加课程"
        form={form}
        onSubmit={async (data) => {
          await Subject.create(data);
          window.location.reload();
        }}
      />
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

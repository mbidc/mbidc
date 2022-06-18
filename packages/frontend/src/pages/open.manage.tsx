import { Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Course } from "../api/course.api";
import { Open } from "../api/open.api";
import DataGrid, { gridCol } from "../components/DataGrid.component";
import { DialogForm } from "../components/form/dialog.component";
import { usePagination } from "../utils/pagination";

import { AppContext } from "./app.template";

const columns = [
  gridCol(Course, "subject", {
    label: "课程名称",
    sx: { flex: 1 },
    renderCell(v) {
      return v.name;
    },
  }),
  gridCol(Course, "subject", {
    label: "任课老师",
    sx: { flex: 0.5 },
    renderCell(v) {
      return v.teacher.name;
    },
  }),
  gridCol(Course, "subject", {
    label: "专业",
    sx: { flex: 0.5 },
    renderCell(v) {
      return v.department;
    },
  }),
  gridCol(Course, "subject", {
    label: "类型",
    sx: { flex: 0.5 },
    renderCell(v) {
      return v.type;
    },
  }),
  gridCol(Course, "subject", {
    label: "时间地点",
    sx: { flex: 1 },
    renderCell(v) {
      return v.detail;
    },
  }),
  gridCol(Course, "currentStudent", {
    label: "选课人数",
    sx: { flex: 0.5 },
    renderCell(v, t) {
      return `${v}/${t.subject.maxStudents}`;
    },
  }),
  gridCol(Course, "subject", {
    label: "操作",
    sx: { flex: 1 },
    renderCell(v) {
      return (
        <>
          <Button size="small" component={Link} to={`/subject/${v.subId}`}>
            查看
          </Button>
        </>
      );
    },
  }),
];

const form = {
  subId: {
    formType: "input",
    label: "课程编号",
  },
} as const;

export default function OpenManagePage() {
  const { openId } = useParams();
  const { data: openData } = Open.useOpen(openId ?? "");
  const [open, setOpen] = useState(false);

  const context = useContext(AppContext);
  useEffect(() => {
    context.modify({
      title: openData?.data.name ?? "选课",
      action: (
        <Button variant="contained" onClick={() => setOpen(true)}>
          添加
        </Button>
      ),
      breadcrumbs: [
        <Typography key="1" color="text.primary">
          Open
        </Typography>,
      ],
    });
  }, [openData]);

  const pagination = usePagination();
  const { data } = Open.useCourses(openId ?? "", {
    limit: pagination.limit,
    page: pagination.page,
  });

  return (
    <>
      <DialogForm
        open={open}
        setOpen={setOpen}
        title="添加课程"
        form={form}
        onSubmit={async (data) => {
          await openData?.data.addSubject(data.subId);
          window.location.reload();
        }}
      />
      <DataGrid
        data={data?.data}
        total={data?.total}
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

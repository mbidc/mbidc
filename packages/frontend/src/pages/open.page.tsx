import { Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Course } from "../api/course.api";
import { APIError } from "../api/fetcher";
import { Open } from "../api/open.api";
import DataGrid, { gridCol } from "../components/DataGrid.component";
import { usePagination } from "../utils/pagination";

import { AppContext } from "./app.template";

export default function OpenPage() {
  const { openId } = useParams();
  const { data: openData } = Open.useOpen(openId ?? "");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const context = useContext(AppContext);
  useEffect(() => {
    context.modify({
      title: openData?.data.name ?? "选课",
      action: null,
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

  const handleClose = () => {
    setOpen(false);
  };

  function select(id: number) {
    openData?.data
      .selectCourse(id)
      .then(() => {
        setMessage("选课成功");
        setOpen(true);
      })
      .catch((e: APIError) => {
        setMessage(e.message);
        setOpen(true);
      });
  }

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
      renderCell(v, t) {
        return (
          <>
            <Button size="small" component={Link} to={`/subject/${v.subId}`}>
              查看
            </Button>
            <Button size="small" onClick={() => select(t.id)}>
              选课
            </Button>
          </>
        );
      },
    }),
  ];

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>好的</Button>
        </DialogActions>
      </Dialog>
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

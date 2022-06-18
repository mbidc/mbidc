import { Button, Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Score } from "../api/score.api";
import DataGrid, { gridCol } from "../components/DataGrid.component";
import { DialogForm } from "../components/form/dialog.component";
import { usePagination } from "../utils/pagination";

import { AppContext } from "./app.template";

export default function ScorePage() {
  const courseId = useParams().courseId ?? "";
  const context = useContext(AppContext);
  useEffect(() => {
    context.modify({
      title: "登记分数",
      action: (
        <Button variant="contained" onClick={() => setOpen(true)}>
          确认
        </Button>
      ),
      breadcrumbs: [
        <Typography key="0" color="text.primary">
          Score
        </Typography>,
      ],
    });
  }, []);

  const pagination = usePagination();
  const { data, error } = Score.useScore(courseId, {
    limit: pagination.limit,
    page: pagination.page,
  });

  const [open, setOpen] = useState(false);
  const [score, setScore] = useState<Score>();
  const columns = [
    gridCol(Score, "id", { label: "ID", sx: { flex: 0.5 } }),
    gridCol(Score, "name", { label: "姓名", sx: { flex: 0.5 } }),
    gridCol(Score, "department", { label: "专业", sx: { flex: 1 } }),
    gridCol(Score, "score", {
      label: "分数",
      sx: { flex: 1 },
      renderCell(v) {
        if (v === -1) {
          return "未评分";
        } else {
          return v;
        }
      },
    }),
    gridCol(Score, "id", {
      label: "操作",
      sx: { flex: 1 },
      renderCell(v, t) {
        return (
          <Button
            size="small"
            onClick={() => {
              setScore(t);
              setOpen(true);
            }}
          >
            评分
          </Button>
        );
      },
    }),
  ];

  return (
    <>
      <DialogForm
        open={open}
        setOpen={setOpen}
        title={`${score?.name} ${score?.id} 登记分数`}
        form={{
          score: {
            formType: "input",
            label: "分数",
            type: "number",
          },
        }}
        onSubmit={async (data) => {
          if (score) {
            await Score.setScore(courseId, score.id, data.score);
            window.location.reload();
          }
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

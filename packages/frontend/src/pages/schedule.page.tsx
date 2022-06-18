import { Button, Typography } from "@mui/material";
import { useContext, useRef, useEffect } from "react";
import * as XLSX from "xlsx";

import Schedule from "../components/Schedule.component";

import { AppContext } from "./app.template";

export default function SchedulePage() {
  const ref = useRef<HTMLTableElement>(null);
  const context = useContext(AppContext);
  useEffect(() => {
    context.modify({
      title: "课程表",
      action: (
        <Button variant="contained" onClick={download}>
          保存
        </Button>
      ),
      breadcrumbs: [
        <Typography key="0" color="text.primary">
          Schedule
        </Typography>,
      ],
    });
  }, []);
  function download() {
    if (ref.current) {
      const book = XLSX.utils.table_to_book(ref.current, { sheet: "Sheet1" });
      XLSX.writeFile(book, "schedule.xlsx");
    }
  }
  return <Schedule ref={ref}></Schedule>;
}

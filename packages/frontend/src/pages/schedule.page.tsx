import { Button } from "@mui/material";
import { useRef } from "react";
import * as XLSX from "xlsx";

import Schedule from "../components/Schedule.component";

import AppTemplate from "./app.template";

export default function SchedulePage() {
  const ref = useRef<HTMLTableElement>(null);
  function download() {
    if (ref.current) {
      const book = XLSX.utils.table_to_book(ref.current, { sheet: "Sheet1" });
      XLSX.writeFile(book, "schedule.xlsx");
    }
  }
  return (
    <AppTemplate
      title="课程表"
      action={
        <Button variant="contained" onClick={download}>
          保存
        </Button>
      }
    >
      <Schedule ref={ref}></Schedule>
    </AppTemplate>
  );
}

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import GREEN from "@mui/material/colors/green";
import { forwardRef, useEffect, useState } from "react";

import ScheduleClass from "../utils/schedule.class";

const compare = (a: string, b: string) =>
  [a, b]
    .map((x) => x.split(":").reduce((acc, cur) => acc * 60 + parseInt(cur), 0))
    .reduce((acc, cur) => acc - cur);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ScheduleProps {}

function _Schedule(props: ScheduleProps, ref?: React.Ref<HTMLTableElement>) {
  const theme = useTheme();
  const schedule = ScheduleClass.mock();
  const [currentDay, setDay] = useState(new Date().getDay());
  const [currentTime, setTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toTimeString().split(":", 2).join(":");
      setDay(new Date().getDay());
      setTime(
        schedule.times.findIndex(
          (x) => compare(x.start, time) <= 0 && compare(x.end, time) >= 0,
        ),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [schedule]);
  return (
    <TableContainer component={Paper}>
      <Table size="small" ref={ref}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              时间
            </TableCell>
            {schedule.days.map((day, dayIndex) => (
              <TableCell
                key={day}
                sx={{
                  textAlign: "center",
                  backgroundColor:
                    dayIndex === currentDay
                      ? GREEN[200]
                      : theme.palette.grey[200],
                }}
              >
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {schedule.times.map((time, timeIndex) => (
            <TableRow key={timeIndex}>
              <TableCell
                sx={{
                  backgroundColor: time.color,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "0.5rem",
                }}
              >
                {time.name}
                <br />
                {`${time.start} - ${time.end}`}
              </TableCell>
              {schedule.schedule.map((data, dayIndex) => (
                <TableCell
                  key={dayIndex}
                  sx={{
                    textAlign: "center",
                    backgroundColor:
                      dayIndex === currentDay
                        ? timeIndex === currentTime
                          ? GREEN[400]
                          : GREEN[100]
                        : undefined,
                  }}
                >
                  {data[timeIndex].description}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const Schedule = forwardRef<HTMLTableElement, ScheduleProps>(_Schedule);
export default Schedule;

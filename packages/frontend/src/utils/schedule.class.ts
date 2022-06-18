import { yellow, red, blue } from "@mui/material/colors";

interface TimeCell {
  start: string;
  end: string;
  name: string;
  color: string;
}

interface ScheduleCell {
  description: string;
}

type ScheduleData = ScheduleCell[][];

const DEFAULT_TIME_CELLS = [
  {
    start: "8:00",
    end: "8:45",
    name: "第一节",
    color: yellow[100],
  },
  {
    start: "8:50",
    end: "9:35",
    name: "第二节",
    color: yellow[100],
  },
  {
    start: "9:50",
    end: "10:35",
    name: "第三节",
    color: yellow[100],
  },
  {
    start: "10:40",
    end: "11:25",
    name: "第四节",
    color: yellow[100],
  },
  {
    start: "11:30",
    end: "12:15",
    name: "第五节",
    color: yellow[100],
  },
  {
    start: "13:00",
    end: "13:45",
    name: "第六节",
    color: red[100],
  },
  {
    start: "13:50",
    end: "14:35",
    name: "第七节",
    color: red[100],
  },
  {
    start: "14:50",
    end: "15:35",
    name: "第八节",
    color: red[100],
  },
  {
    start: "15:40",
    end: "16:25",
    name: "第九节",
    color: red[100],
  },
  {
    start: "16:30",
    end: "17:15",
    name: "第十节",
    color: red[100],
  },
  {
    start: "18:00",
    end: "18:45",
    name: "第十一节",
    color: blue[100],
  },
  {
    start: "18:50",
    end: "19:35",
    name: "第十二节",
    color: blue[100],
  },
  {
    start: "19:40",
    end: "20:25",
    name: "第十三节",
    color: blue[100],
  },
  {
    start: "20:30",
    end: "21:15",
    name: "第十四节",
    color: blue[100],
  },
];

const DEFAULT_DAYS = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日",
];

export class Schedule {
  constructor(
    public readonly schedule: ScheduleData = [],
    public readonly days: string[] = DEFAULT_DAYS,
    public readonly times: TimeCell[] = DEFAULT_TIME_CELLS,
  ) {
    if (schedule.length !== days.length) {
      throw new Error("时间轴和课程表的列数不一致");
    }
    for (let i = 0; i < schedule.length; i++) {
      if (schedule[i].length !== times.length) {
        throw new Error("时间轴和课程表的行数不一致");
      }
    }
  }
  static mock() {
    return new Schedule(
      Array<ScheduleCell[]>(7).fill(
        Array<ScheduleCell>(14).fill({
          description: "测试课程",
        }),
      ),
    );
  }
}

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Link,
  Skeleton,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { Course } from "../api/course.api";
import { Open } from "../api/open.api";
import { User } from "../api/user.api";
import { DialogForm } from "../components/form/dialog.component";

import { AppContext } from "./app.template";

const form = {
  name: {
    formType: "input",
    label: "名称",
  },
  start: {
    formType: "date",
    label: "开始时间",
  },
  end: {
    formType: "date",
    label: "结束时间",
  },
  studentTag: {
    formType: "input",
    label: "学生标签",
  },
} as const;

const CardSkeleton = () => (
  <Card>
    <CardHeader
      avatar={
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
      }
      title={
        <Skeleton
          animation="wave"
          height={10}
          width="80%"
          style={{ marginBottom: 6 }}
        />
      }
      subheader={<Skeleton animation="wave" height={10} width="40%" />}
    />
    <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
    <CardContent>
      {
        <>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </>
      }
    </CardContent>
  </Card>
);

export default function MainPage() {
  const me = User.useMe();
  const context = useContext(AppContext);
  useEffect(() => {
    context.modify({
      title: undefined,
      action: me?.tags.split(",").includes("admin") && (
        <Button variant="contained" onClick={() => setOpen(true)}>
          新建选课
        </Button>
      ),
      breadcrumbs: [],
    });
  }, []);
  const [open, setOpen] = useState(false);
  const { data } = Open.useMyOpen();
  const { data: courseData } = Course.useMy();
  return (
    <>
      <DialogForm
        open={open}
        setOpen={setOpen}
        title="新建选课"
        form={form}
        onSubmit={async (data) => {
          await Open.create(data);
          window.location.reload();
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        <Box
          mr={2}
          sx={{
            flex: 1,
          }}
        >
          <Typography variant="h6">我的选课</Typography>

          {!data ? (
            <CardSkeleton />
          ) : (
            data?.data.map((item) => (
              <Card
                key={item.name}
                sx={{
                  margin: 2,
                }}
              >
                <CardHeader title={item.name} />
                <CardContent>
                  开始时间：
                  <Link
                    href={`https://www.timeanddate.com/countdown/to?iso=${item.start.toISOString()}`}
                  >
                    {item.start.toLocaleString()}
                  </Link>
                  <br />
                  结束时间：
                  <Link
                    href={`https://www.timeanddate.com/countdown/to?iso=${item.end.toISOString()}`}
                  >
                    {item.end.toLocaleString()}
                  </Link>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                  }}
                >
                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    variant="contained"
                    disabled={
                      !me?.isAdmin &&
                      (item.start > new Date() || item.end < new Date())
                    }
                    href={(me.isAdmin ? "/manage" : "") + `/open/${item.id}`}
                  >
                    {item.start > new Date()
                      ? "暂未开始"
                      : item.end < new Date()
                      ? "已结束"
                      : "进入选课"}
                  </Button>
                </CardActions>
              </Card>
            ))
          )}
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Typography variant="h6">我的课程</Typography>
          {!courseData ? (
            <CardSkeleton />
          ) : (
            courseData.data.teach
              .map((item) => (
                <Card
                  key={item.subject.name}
                  sx={{
                    margin: 2,
                  }}
                >
                  <CardHeader title={item.subject.name} />
                  <CardContent></CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                      variant="contained"
                      LinkComponent={Link}
                      href={`/subject/${item.subject.subId}`}
                    >
                      查看
                    </Button>
                    <Button variant="contained">登记分数</Button>
                  </CardActions>
                </Card>
              ))
              .concat(
                courseData.data.student.map((item) => (
                  <Card
                    key={item.subject.name}
                    sx={{
                      margin: 2,
                    }}
                  >
                    <CardHeader title={item.subject.name} />
                    <CardContent>
                      <b>我的分数：</b>{" "}
                      {item.myScore === -1 ? "暂无" : item.myScore}
                    </CardContent>
                    <CardActions
                      sx={{
                        display: "flex",
                      }}
                    >
                      <Box sx={{ flexGrow: 1 }} />
                      <Button
                        variant="contained"
                        LinkComponent={Link}
                        href={`/subject/${item.subject.subId}`}
                      >
                        查看
                      </Button>
                    </CardActions>
                  </Card>
                )),
              )
          )}
        </Box>
      </Box>
    </>
  );
}

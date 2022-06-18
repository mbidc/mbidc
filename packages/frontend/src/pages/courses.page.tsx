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
import { useContext, useEffect } from "react";

import { Course } from "../api/course.api";

import { AppContext } from "./app.template";

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

export default function CoursesPage() {
  const context = useContext(AppContext);
  useEffect(() => {
    context.modify({
      title: undefined,
      action: null,
      breadcrumbs: [],
    });
  }, []);
  const { data: courseData } = Course.useMy();
  return (
    <>
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
          <Typography variant="h6">我任教的</Typography>
          {!courseData ? (
            <CardSkeleton />
          ) : (
            courseData.data.teach.map((item) => (
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
                  <Button
                    variant="contained"
                    sx={{
                      ml: 1,
                    }}
                    LinkComponent={Link}
                    href={`/score/${item.id}`}
                  >
                    登记分数
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
          <Typography variant="h6">我参加的</Typography>
          {!courseData ? (
            <CardSkeleton />
          ) : (
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
            ))
          )}
        </Box>
      </Box>
    </>
  );
}

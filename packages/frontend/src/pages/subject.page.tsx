import {
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
  Button,
  Link,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { Link as RouteLink, useParams } from "react-router-dom";

import { Subject } from "../api/subject.api";

import { AppContext } from "./app.template";

export default function SubjectPage() {
  const { sub } = useParams();
  const context = useContext(AppContext);
  const { data, error } = Subject.useSubject(sub ?? "");
  useEffect(() => {
    context.modify({
      title: data?.data.name ?? "课程详情",
      breadcrumbs: [
        <Link to="/subjects" key="0" component={RouteLink}>
          Subjects
        </Link>,
        <Typography key="1" color="text.primary">
          {sub}
        </Typography>,
      ],
      action: null,
    });
  }, [data]);
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <>
      {error && (
        <div>
          {error.code} {error.message}
        </div>
      )}
      <Card>
        {!data ? (
          <Skeleton
            sx={{ height: 190 }}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <CardMedia
            component="img"
            sx={{
              maxHeight: 240,
            }}
            image={data.data.img ?? require("../static/bg.jpg")}
          />
        )}
        <CardContent>
          {!data ? (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton
                  key={i}
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
              ))}

              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            </>
          ) : (
            <Typography variant="body2" color="text.secondary">
              <b>任课老师：</b> {data.data.teacher.name}
              <br />
              <b>联系方式：</b> {data.data.teacher.phone}{" "}
              {data.data.teacher.email}
              <br />
              <b>上课时间：</b> {data.data.detail}
              <br />
              <b>人数：</b> {data.data.maxStudents}
              <br />
              <b>课程简介：</b> {data.data.description}
            </Typography>
          )}
        </CardContent>
        {data && (
          <CardActions>
            {data.data.document && (
              <Button size="small" href={data.data.document}>
                下载教案
              </Button>
            )}
          </CardActions>
        )}
      </Card>
    </>
  );
}

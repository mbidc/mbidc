import {
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
  Button,
} from "@mui/material";

import Subject from "../api/subject.api";

import AppTemplate from "./app.template";

interface SubjectPageProps {
  id: number;
}

export default function SubjectPage(props: SubjectPageProps) {
  const { data, error } = Subject.getById(props.id);

  return (
    <AppTemplate title={data?.name || "Loading"}>
      {error && <div>{error.message}</div>}
      <Card>
        {!data ? (
          <Skeleton
            sx={{ height: 190 }}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          data.img && (
            <CardMedia
              component="img"
              sx={{
                maxHeight: 240,
              }}
              image={data?.img}
            />
          )
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
              {data.description}
            </Typography>
          )}
        </CardContent>
        {data && (
          <CardActions>
            <Button size="small" href={data.document}>
              下载
            </Button>
            <Button size="small">分享课程</Button>
          </CardActions>
        )}
      </Card>
    </AppTemplate>
  );
}

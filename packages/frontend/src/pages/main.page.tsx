import { Box, Card, CardContent, CardHeader, Skeleton } from "@mui/material";

import AppTemplate from "./app.template";

export default function MainPage() {
  return (
    <AppTemplate>
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
          <Card>
            <CardHeader
              avatar={
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                />
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
            <Skeleton
              sx={{ height: 190 }}
              animation="wave"
              variant="rectangular"
            />
            <CardContent>
              {
                <>
                  <Skeleton
                    animation="wave"
                    height={10}
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={10} width="80%" />
                </>
              }
            </CardContent>
          </Card>
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Card>233</Card>
        </Box>
      </Box>
    </AppTemplate>
  );
}

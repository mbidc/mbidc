import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import EmptyTemplate from "./empty.template";

export default function LoginPage() {
  return (
    <EmptyTemplate
      sx={{
        backgroundImage: `url(${require("../static/bg.jpg")})`,
        backgroundSize: "cover",
      }}
    >
      <Container maxWidth="xs">
        <Card variant="outlined">
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
              }}
            >
              Login
            </Typography>
          </CardContent>
          <CardActions>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <TextField
                fullWidth
                label="Name"
                size="small"
                sx={{
                  m: 1,
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                size="small"
                sx={{
                  m: 1,
                }}
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  m: 1,
                }}
              >
                Login
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Container>
    </EmptyTemplate>
  );
}

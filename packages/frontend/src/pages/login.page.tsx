import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  TextField,
  Collapse,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

import { User } from "../api/user.api";

export default function LoginPage() {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const naviagate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await User.login(name, password);
      localStorage.setItem("token", token.data);
      naviagate("/");
    } catch (e) {
      console.error(e);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    }
  };

  return (
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
            component="form"
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              label="ID"
              size="small"
              sx={{
                m: 1,
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              size="small"
              sx={{
                m: 1,
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                m: 1,
              }}
              component="button"
              type="submit"
            >
              Login
            </Button>
            <Collapse in={open} sx={{ width: "100%" }}>
              <Alert severity="error">Login Failed!</Alert>
            </Collapse>
          </Box>
        </CardActions>
      </Card>
    </Container>
  );
}

import { Box, CssBaseline } from "@mui/material";
import { StrictMode } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppTemplate from "./pages/app.template";
import LoginPage from "./pages/login.page";

function App() {
  return (
    <StrictMode>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backgroundImage: `url(${require("./static/bg.jpg")})`,
            backgroundSize: "cover",
          }}
        >
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<AppTemplate />} />
          </Routes>
        </Box>
      </Router>
    </StrictMode>
  );
}

export default App;

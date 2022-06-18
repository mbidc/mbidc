import {
  Box,
  Breadcrumbs,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { createContext } from "react";
import { Route, Routes } from "react-router-dom";

import AppBar from "../components/AppBar.component";
import MiniDrawer from "../components/Drawer.component";

import CoursesPage from "./courses.page";
import MainPage from "./main.page";
import OpenManagePage from "./open.manage";
import OpenPage from "./open.page";
import ScorePage from "./score.page";
import SubjectManagePage from "./subject.manage";
import SubjectPage from "./subject.page";
import SubjectsPage from "./subjects.page";
import UserManagePage from "./user.manage";

export const AppContext = createContext<{
  title: string | undefined;
  action: React.ReactNode;
  breadcrumbs: React.ReactNode[];
  modify: (o: {
    title: React.SetStateAction<string | undefined>;
    action: React.SetStateAction<React.ReactNode>;
    breadcrumbs: React.SetStateAction<React.ReactNode[]>;
  }) => void;
}>({
  title: "",
  action: null,
  breadcrumbs: [],
  modify() {
    //
  },
});

export default function AppTemplate() {
  const drawerWidth = 240;
  const [title, setTitle] = React.useState<string>();
  const [action, setAction] = React.useState<React.ReactNode>();
  const [breadcrumbs, setBreadcrumbs] = React.useState<React.ReactNode[]>([
    <Typography color="text.primary" key="a">
      Breadcrumbs
    </Typography>,
    <Typography color="text.primary" key="b">
      Breadcrumbs
    </Typography>,
  ]);
  const [open, setOpen] = React.useState(false);

  function modify({
    title,
    action,
    breadcrumbs,
  }: {
    title: React.SetStateAction<string | undefined>;
    action: React.SetStateAction<React.ReactNode>;
    breadcrumbs: React.SetStateAction<React.ReactNode[]>;
  }) {
    setTitle(title);
    setAction(action);
    setBreadcrumbs(breadcrumbs);
  }

  return (
    <AppContext.Provider
      value={{
        title,
        action,
        breadcrumbs,
        modify,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          backgroundColor: "background.paper",
        }}
      >
        <AppBar
          title="MBIDC"
          onMenuClick={() => setOpen(true)}
          open={open}
          drawerWidth={drawerWidth}
        />
        <MiniDrawer open={open} setOpen={setOpen} drawerWidth={drawerWidth} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            p: 3,
            height: "100vh",
          }}
        >
          <Toolbar />
          <Container
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                marginBottom: 5,
                display: "flex",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                }}
              >
                {title && (
                  <Typography variant="h4" component="div">
                    {title}
                  </Typography>
                )}
                <Breadcrumbs aria-label="breadcrumb" maxItems={3}>
                  {breadcrumbs}
                </Breadcrumbs>
              </Box>
              <Box>{action}</Box>
            </Box>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/manage/users" element={<UserManagePage />} />
              <Route path="/manage/subjects" element={<SubjectManagePage />} />
              <Route path="/subjects" element={<SubjectsPage />} />
              <Route path="/subject/:sub" element={<SubjectPage />} />
              <Route path="/manage/open/:openId" element={<OpenManagePage />} />
              <Route path="/open/:openId" element={<OpenPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/score/:courseId" element={<ScorePage />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </AppContext.Provider>
  );
}

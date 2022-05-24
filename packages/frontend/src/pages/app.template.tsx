import {
  Box,
  Breadcrumbs,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { PropsWithChildren } from "react";

import AppBar from "../components/AppBar.component";
import MiniDrawer from "../components/Drawer.component";

interface AppProps {
  title?: string;
  drawerWidth?: number;
  action?: React.ReactNode;
}

export default function AppTemplate(props: PropsWithChildren<AppProps>) {
  const { title, action } = props;
  let { drawerWidth } = props;
  drawerWidth = drawerWidth ?? 240;
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Box sx={{ display: "flex" }}>
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
            p: 3,
          }}
        >
          <Toolbar />
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
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
                  <Typography color="text.primary">Breadcrumbs</Typography>
                  <Typography color="text.primary">Breadcrumbs</Typography>
                </Breadcrumbs>
              </Box>
              <Box>{action}</Box>
            </Box>
            {props.children}
          </Container>
        </Box>
      </Box>
    </>
  );
}

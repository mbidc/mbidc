import { Typography, Box, Toolbar } from "@mui/material";
import React from "react";

import AppBar from "../components/AppBar.component";
import MiniDrawer from "../components/Drawer.component";

export default function AppTemplate() {
  const drawerWidth = 240;
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
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit
            amet diam eget purus auctor fermentum ac vitae ex. Praesent commodo
            ultricies nisl id egestas. Vestibulum nulla nibh, efficitur in
            lobortis vitae, varius sed ligula. Curabitur nec quam in nisi
            laoreet blandit ac at turpis. Vestibulum non dolor id sapien maximus
            dapibus. Curabitur id vulputate mauris, a molestie ex. Suspendisse
            potenti. Proin sed tellus porta, tempor ipsum vitae, suscipit massa.
            Donec ornare libero tempor erat mollis, ut faucibus lacus vehicula.
            Nam aliquam tortor et odio rhoncus vulputate. Nunc sit amet neque ac
            sapien efficitur sagittis. Aliquam in vulputate augue. Ut vitae
            lacus ligula. In sagittis nunc a lorem posuere finibus. Aliquam erat
            volutpat. Phasellus et convallis nulla. Donec in tellus vehicula,
            ornare ante nec, laoreet elit. Sed eget pulvinar nibh. Vestibulum
            viverra ligula odio, a lobortis augue vehicula eget. Maecenas
            tincidunt rutrum tristique. Cras tortor purus, gravida vestibulum
            ipsum at, sollicitudin posuere dolor. Nam et sem nulla. Suspendisse
            efficitur interdum ligula ut dictum. In laoreet feugiat nisi in
            sollicitudin. Sed laoreet hendrerit ante in finibus. Nam vitae eros
            sed ex viverra laoreet et in libero. Nullam libero nulla, vehicula
            vitae suscipit eget, luctus vitae dolor. Etiam diam justo, ornare et
            nisl at, cursus euismod massa. Vivamus eget varius leo, nec
            ullamcorper velit. Mauris pharetra turpis quis commodo dictum. Sed a
            nunc vitae metus volutpat finibus a a orci. Pellentesque nec augue
            egestas, porttitor nisl eu, ultricies felis. Vivamus sit amet ipsum
            quis risus ornare consequat vel nec massa. Etiam lectus felis,
            varius sit amet cursus et, posuere id sem. Morbi pharetra ligula
            metus, non pharetra turpis tempor ut. Curabitur fringilla finibus
            lacus ut venenatis. Nulla eu neque dapibus, efficitur urna nec,
            suscipit arcu. Integer dignissim nunc purus, sit amet fermentum
            tellus congue quis. Nunc congue non massa id venenatis.
          </Typography>
        </Box>
      </Box>
    </>
  );
}

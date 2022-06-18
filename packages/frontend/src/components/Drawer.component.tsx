import { Home } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import BookIcon from "@mui/icons-material/Book";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme, Theme, CSSObject } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

import { User } from "../api/user.api";

const openedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

interface Props {
  open: boolean;
  drawerWidth: number;
  setOpen: (open: boolean) => void;
}

const links = [
  {
    text: "首页",
    icon: <Home />,
    link: "/",
  },
  {
    text: "课程列表",
    icon: <BookIcon />,
    link: "/subjects",
  },
];

const adminLinks = [
  {
    text: "用户管理",
    icon: <AccountCircle />,
    link: "/manage/users",
  },
  {
    text: "课程管理",
    icon: <CollectionsBookmarkIcon />,
    link: "/manage/subjects",
  },
];

const userLinks = [
  {
    text: "我的课程",
    icon: <EventNoteIcon />,
    link: "/courses",
  },
];

const Item = (
  open: boolean,
  {
    text,
    icon,
    link,
  }: {
    text: string;
    icon: React.ReactElement;
    link: string;
  },
) => (
  <ListItem
    key={text}
    disablePadding
    sx={{ display: "block" }}
    component={NavLink}
    to={link}
    style={{ textDecoration: "none", color: "inherit" }}
  >
    <ListItemButton
      sx={{
        minHeight: 48,
        justifyContent: open ? "initial" : "center",
        px: 2.5,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : "auto",
          justifyContent: "center",
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
    </ListItemButton>
  </ListItem>
);

export default function MiniDrawer(props: Props) {
  const theme = useTheme();
  const { open, setOpen, drawerWidth } = props;

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const me = User.useMe();

  return (
    <MuiDrawer
      variant="permanent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
          ...openedMixin(theme, drawerWidth),
          "& .MuiDrawer-paper": openedMixin(theme, drawerWidth),
        }),
        ...(!open && {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": closedMixin(theme),
        }),
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: theme.spacing(0, 1),
          // necessary for content to be below app bar
          ...theme.mixins.toolbar,
          minHeight: "64px !important",
        }}
      >
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </Box>
      <Divider />
      <List>
        {links.map(({ text, icon, link }) => Item(open, { text, icon, link }))}
      </List>
      <Divider />
      {(me.isAdmin ? adminLinks : userLinks).map(({ text, icon, link }) =>
        Item(open, { text, icon, link }),
      )}
    </MuiDrawer>
  );
}

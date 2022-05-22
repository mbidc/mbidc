import SearchIcon from "@mui/icons-material/Search";
import { alpha, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";

export default function Search() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: `${theme.shape.borderRadius}px`,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          marginLeft: theme.spacing(1),
          width: "auto",
        },
      }}
    >
      <Box
        sx={{
          padding: theme.spacing(0, 2),
          height: "100%",
          position: "absolute",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SearchIcon />
      </Box>
      <InputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        sx={{
          color: "inherit",
          "& .MuiInputBase-input": {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("sm")]: {
              width: "12ch",
              "&:focus": {
                width: "20ch",
              },
            },
          },
        }}
      />
    </Box>
  );
}

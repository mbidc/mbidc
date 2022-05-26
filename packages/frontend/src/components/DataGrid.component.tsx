import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Skeleton,
  Box,
  Container,
  IconButton,
  Toolbar,
} from "@mui/material";

interface DataGridProps<T = any> {
  data?: T[];
  idKey: keyof T;
  cols: GridCol<T, any>[];
  error?: Error;
}

export interface GridCol<T, K extends keyof T> {
  obj: { new (): T };
  key: K;
  label?: K | string;
  flex?: number;
  renderCell?: (value: T[K]) => React.ReactNode;
}

export function gridCol<T, K extends keyof T>(
  obj: { new (): T },
  key: K,
  optons?: {
    label?: K | string;
    flex?: number;
    renderCell?: (value: T[K]) => React.ReactNode;
  },
): GridCol<T, K> {
  return {
    obj,
    key,
    label: key,
    ...optons,
  };
}

export default function DataGrid<T = any>(props: DataGridProps<T>) {
  return props.error ? (
    <Container
      component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Typography color="error.main" component="pre">
        {props.error.toString()}
      </Typography>
    </Container>
  ) : props.data ? (
    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Table
        size="small"
        sx={{
          flexGrow: 1,
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              display: "flex",
            }}
          >
            {props.cols.map((col) => (
              <TableCell
                key={col.key}
                sx={{
                  flex: col.flex ?? 1,
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data?.map((row) => (
            <TableRow
              key={row[props.idKey] as any}
              sx={{
                display: "flex",
              }}
            >
              {props.cols.map((col) => (
                <TableCell
                  key={col.key}
                  sx={{
                    flex: col.flex ?? 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {col.renderCell
                    ? col.renderCell((row as any)[col.key])
                    : (row as any)[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Toolbar variant="dense">
        <Box
          sx={{
            flexGrow: 1,
          }}
        ></Box>
        <Typography component="div">1 - 1 of 1</Typography>
        <Box>
          <IconButton color="inherit">
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton color="inherit">
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </TableContainer>
  ) : (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Skeleton variant="rectangular" width="100%" height="100%" />
    </Paper>
  );
}

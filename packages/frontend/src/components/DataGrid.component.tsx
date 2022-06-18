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
  Toolbar,
  TablePagination,
  SxProps,
  Theme,
} from "@mui/material";

interface DataGridProps<T = any> {
  data?: T[];
  total?: number;
  idKey: keyof T;
  cols: GridCol<T, any>[];
  error?: Error;
  limit?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export interface GridCol<T, K extends keyof T> {
  obj: { new (): T };
  key: K;
  label?: K | string;
  sx?: SxProps<Theme>;
  renderCell?: (value: T[K], full: T) => React.ReactNode;
}

export function gridCol<T, K extends keyof T>(
  obj: { new (): T },
  key: K,
  optons?: Omit<GridCol<T, K>, "obj" | "key">,
): GridCol<T, K> {
  return {
    obj,
    key,
    label: key,
    ...optons,
  };
}

export default function DataGrid<T = any>(props: DataGridProps<T>) {
  const { total } = props;
  const limit = props.limit ?? 10;
  const page = props.page ?? 0;
  const onPageChange = props.onPageChange ?? (() => 0);
  const onLimitChange = props.onLimitChange ?? (() => 0);

  return props.error ? (
    <Container
      component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
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
                key={col.label}
                sx={{
                  textAlign: "center",
                  verticalAlign: "middle",
                  ...col.sx,
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
                  key={col.label}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ...col.sx,
                  }}
                >
                  {col.renderCell
                    ? col.renderCell((row as any)[col.key], row)
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
        <TablePagination
          component="div"
          count={total ?? -1}
          page={page}
          onPageChange={(e, p) => onPageChange(p)}
          rowsPerPage={limit}
          rowsPerPageOptions={[10, 20, 50, 100]}
          onRowsPerPageChange={(e) => onLimitChange(parseInt(e.target.value))}
          showFirstButton
          showLastButton
        />
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

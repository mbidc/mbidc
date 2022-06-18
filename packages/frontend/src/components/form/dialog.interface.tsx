import UploadIcon from "@mui/icons-material/Upload";
import { Box, IconButton, TextFieldProps } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as React from "react";

export type InputObject = TextFieldProps & {
  formType: "input";
  label: string;
  value?: string;
};

export type FileObject = {
  accept?: string;
  formType: "file";
  label: string;
};

export type DateObject = {
  formType: "date";
  label: string;
};

export type FormObject = InputObject | FileObject | DateObject;

export type Form = Record<string, FormObject>;

export function dispatch(
  key: string,
  obj: FormObject,
  form: any,
  setForm: React.Dispatch<React.SetStateAction<any>>,
) {
  const { formType } = obj;
  switch (formType) {
    case "input":
      return (
        <TextField
          {...obj}
          id={key.toString()}
          key={obj.label}
          variant="outlined"
          fullWidth
          margin="dense"
          onChange={(e) => {
            setForm((form: any) => ({ ...form, [key]: e.target.value }));
          }}
        />
      );
    case "file":
      return (
        <Box
          sx={{ display: "flex", alignItems: "flex-end" }}
          component="label"
          htmlFor={obj.label}
          key={obj.label}
          my={0.5}
        >
          <input
            type="file"
            accept={obj.accept}
            style={{
              display: "none",
            }}
            id={obj.label}
            onChange={(e) => {
              setForm((form: any) => ({ ...form, [key]: e.target.files }));
            }}
          />
          <IconButton size="small" component="span">
            <UploadIcon />
          </IconButton>
          <TextField
            value={
              form[key]
                ? Array.from(form[key])
                    .map((file: any) => file.name)
                    .join(", ")
                : ""
            }
            label={obj.label}
            variant="standard"
            fullWidth
            disabled
          />
        </Box>
      );
    case "date":
      return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => (
              <TextField
                {...props}
                fullWidth
                sx={{
                  mt: 1,
                }}
              />
            )}
            key={obj.label}
            label={obj.label}
            value={form[key]}
            onChange={(newValue) => {
              setForm((form: any) => ({ ...form, [key]: newValue }));
            }}
          />
        </LocalizationProvider>
      );
    default:
      return null;
  }
}

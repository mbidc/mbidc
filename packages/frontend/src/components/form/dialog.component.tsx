import {
  Alert,
  Button,
  Collapse,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { FormEvent, useEffect, useState } from "react";

import { Form, dispatch } from "./dialog.interface";

interface DialogFormProps<T extends Form = Form> {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  description?: string;
  form: T;
  onSubmit?: (form: Record<keyof T, any>) => Promise<void>;
}

export function DialogForm<T extends Form = Form>(props: DialogFormProps<T>) {
  const [form, setForm] = useState<Record<keyof T, any>>(
    Object.fromEntries(
      Object.entries(props.form).map(([key]) => [key, undefined]),
    ) as any,
  );
  const [errorOpen, setErrorOpen] = useState(false);
  const [err, setErr] = useState<Error>();
  useEffect(() => {
    if (err) {
      setErrorOpen(true);
      setTimeout(() => {
        setErrorOpen(false);
      }, 3000);
    } else {
      setErrorOpen(false);
    }
  }, [err]);
  const handleClose = () => {
    props.setOpen(false);
  };

  function submit(e: FormEvent) {
    e.preventDefault();
    if (props.onSubmit) {
      props
        .onSubmit(form)
        .then(() => {
          handleClose();
        })
        .catch((e) => {
          setErr(e);
        });
    }
  }
  return (
    <Dialog open={props.open} onClose={handleClose} fullWidth>
      <DialogTitle>{props.title}</DialogTitle>
      <form onSubmit={submit}>
        <DialogContent>
          {props.description}
          {Object.entries(props.form).map(([key, obj]) =>
            dispatch(key, obj, form, setForm),
          )}
          <Collapse in={errorOpen} sx={{ width: "100%" }}>
            <Alert severity="error">{err?.toString()}</Alert>
          </Collapse>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submit} type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

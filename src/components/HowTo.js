import React from "react";
import "../App.css";

import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  Button
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export default function HowTo(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullScreen={fullScreen}
      className="app-how-to"
    >
      <DialogTitle>How to use this app:</DialogTitle>
      <DialogContent>
        <DialogContentText component={"span"}>
          <ol>
            <li>
              Click 'Sign in' button to sign in to the google accout and grant
              access to Google Drive
            </li>
            <li>Add Some tasks to you todo list</li>
            <li>Optionally mark some asks as completed</li>
            <li>
              Upload Todo list to the Google Drive by clicking 'Upload list to
              Google Drive' button
            </li>
          </ol>
          You can find source code of the app{" "}
          <a
            target="_blank"
            href="https://github.com/Nostia/GoogleDriveToDo"
            rel="noopener noreferrer"
          >
            here
          </a>
        </DialogContentText>
        <DialogActions>
          <Button autoFocus onClick={props.handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

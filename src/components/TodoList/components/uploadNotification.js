import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UploadNotification(props) {
  if (!props.uploadResult) return "";
  return (
    <div>
      <Snackbar
        open={!!props.uploadResult}
        autoHideDuration={3000}
        onClose={() => props.handleResetResult()}
      >
        <Alert
          severity={props.uploadResult.type}
          onClose={() => props.handleResetResult()}
        >
          {props.uploadResult.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

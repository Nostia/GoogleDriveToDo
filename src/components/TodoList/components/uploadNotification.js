import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UploadNotification(props) {
  if (!props.uploadResult) return "";
  let type = props.uploadResult === "success" ? "success" : "error";
  let text =
    props.uploadResult && props.uploadResult !== "success"
      ? `Todo list upload failed. Reason: ${props.uploadResult.message}`
      : "Todo list was uploaded successfully";
  return (
    <div>
      <Snackbar
        open={!!props.uploadResult}
        autoHideDuration={3000}
        onClose={() => props.handleResetResult()}
      >
        <Alert severity={type} onClose={() => props.handleResetResult()}>
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
}

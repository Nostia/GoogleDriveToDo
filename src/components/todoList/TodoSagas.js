import { UPLOAD_TODO_LIST } from "./todoActions";
import { getTodoList } from "./todoReducer";

import { select, takeLatest } from "redux-saga/effects";
import todoItem from "./components/TodoItem";

export function* uploadTodoList(action) {
  let fileContent = JSON.stringify(yield select(getTodoList));
  const folderId = "1qXkkJKUFORexsCqfWDjRcJrVSSzxes1r";
  let fileMetadata = {
    mimeType: "application/vnd.google-apps.document",
    name: "Todo.doc"
  };
  let media = {
    mimeType: "application/vnd.google-apps.document",
    body: fileContent
  };
  ifFileExists();
  window.gapi.client.drive.files
    .create({
      name: "Todo.doc",
      mimeType: "application/vnd.google-apps.document",
      parents: folderId,
      resource: fileMetadata,
      media,
      params: {
        uploadType: "media"
      },
      //   body: fileContent,
      fields: "id"
    })
    .then(function(result) {
      save(result.result.id).then(function(result) {
        console.log("File update", result);
      });
    });

  function save(fileId) {
    return window.gapi.client.request({
      path: "/upload/drive/v3/files/" + fileId,
      method: "PATCH",
      params: {
        uploadType: "media"
      },
      body: fileContent
    });
  }

  function ifFileExists() {
    window.gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name)"
      })
      .then(response => {
        var files = response.result.files;
        if (files && files.length) {
          let check = files.map(f => {
            return f.name === "Todo.doc";
          });
          console.log(check);
        } else {
          this.appendPre("No files found.");
        }
      });
  }
}

export function* onUploadTodoList() {
  yield takeLatest(UPLOAD_TODO_LIST, uploadTodoList);
}

// console.log("ok");
// let fileContent = yield JSON.stringify(select(getTodoList));
// console.log("content", fileContent);
// // let fileContent = JSON.stringify(todoList);
// let file = new Blob([fileContent], { type: "text/plain" });
// let metadata = {
//   name: "New T",
//   mimeType: "text/plain",
//   parents: [""]
// };

// var accessToken = window.gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
// var form = new FormData();
// form.append(
//   "metadata",
//   new Blob([JSON.stringify(metadata)], { type: "application/json" })
// );
// form.append("file", file);
// console.log(form, file);
// var xhr = new XMLHttpRequest();
// xhr.open(
//   "post",
//   "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart"
//   //  https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart
// );
// xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
// xhr.responseType = "json";
// xhr.onload = () => {
//   console.log(xhr.response.id); // Retrieve uploaded file ID.
// };
// xhr.send(form);

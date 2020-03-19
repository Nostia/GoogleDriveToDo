import { UPLOAD_TODO_LIST } from "./TodoActions";
import { getCompletedTodos, getIncompletedTodos } from "./TodoReducer";

import { select, takeLatest } from "redux-saga/effects";

export function* uploadTodoList(action) {
  let completed = yield select(getCompletedTodos);
  let incompleted = yield select(getIncompletedTodos);
  let fileContent = composeFileContent(completed, incompleted);
  const folderId = "1qXkkJKUFORexsCqfWDjRcJrVSSzxes1r";
  let fileMetadata = {
    mimeType: "application/vnd.google-apps.document",
    name: "Todo.doc"
  };
  let media = {
    mimeType: "application/vnd.google-apps.document",
    body: fileContent
  };
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
}
function composeFileContent(completed, incompleted) {
  let composeIncompleted = incompleted.map(t => `${t.text}\n`).join("");

  let composeCompleted = completed.map(t => `${t.text}\n`).join("");

  return `Todo list:\n${composeIncompleted}\nCompleted items:\n${composeCompleted}`;
}

export function* onUploadTodoList() {
  yield takeLatest(UPLOAD_TODO_LIST, uploadTodoList);
}

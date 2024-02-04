import { FilterFileBrowserModel } from "@jupyterlab/filebrowser";
import DocumentManager from "../manager/DocumentManager";

export default new FilterFileBrowserModel({
  manager: DocumentManager,
})
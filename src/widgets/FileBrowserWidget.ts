import { FileBrowser } from "@jupyterlab/filebrowser";
import FileBrowserModel from "../model/FileBrowserModel";

const model = FileBrowserModel


export default new FileBrowser({
  id: "jp-file-browser",
  model,
})
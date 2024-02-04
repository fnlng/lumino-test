import { DirListing } from "@jupyterlab/filebrowser";
import FileBrowserModel from "../model/FileBrowserModel";


const model = FileBrowserModel

export default new DirListing({
  model
})
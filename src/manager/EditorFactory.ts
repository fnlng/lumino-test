import { CodeMirrorEditorFactory, CodeMirrorMimeTypeService, EditorLanguageRegistry } from "@jupyterlab/codemirror";
import { FileEditorFactory } from "@jupyterlab/fileeditor";
import { NotebookPanel, NotebookWidgetFactory, StaticNotebook } from "@jupyterlab/notebook";
import { CommandToolbarButton } from "@jupyterlab/ui-components";
import CommandRegistry from "./CommandRegistry";
import RenderMimeRegistry from "./RenderMimeRegistry";

const commands = CommandRegistry
const rendermime = RenderMimeRegistry

const languages = new EditorLanguageRegistry()
EditorLanguageRegistry.getDefaultLanguages().forEach((e) => {
  languages.addLanguage(e)
})

const factoryService = new CodeMirrorEditorFactory({ languages })
const mimeTypeService = new CodeMirrorMimeTypeService(languages)

const editorServices = {
  factoryService,
  mimeTypeService,
}

export const fileEditorFactory = new FileEditorFactory({
  editorServices,
  factoryOptions: {
    name: "Editor",
    modelName: 'text',
    fileTypes: ['*'],
    defaultFor: ['*'],
    preferKernel: false,
    canStartKernel: true
  }
})

const editorFactory = factoryService.newInlineEditor
const contentFactory = new NotebookPanel.ContentFactory({ editorFactory })

const toolbarFactory = (panel: NotebookPanel) => {
  return [{
    name: "",
    widget: new CommandToolbarButton({
      commands,
      id: "",
      args: { toolbar: true }
    }),
  }]
}

export const notebookWidgetFactory = new NotebookWidgetFactory({
  name: 'Notebook',
  modelName: 'notebook',
  fileTypes: ['notebook'],
  defaultFor: ['notebook'],
  preferKernel: true,
  canStartKernel: true,
  rendermime,
  contentFactory,
  mimeTypeService,
  toolbarFactory,
  notebookConfig: {
    ...StaticNotebook.defaultNotebookConfig,
    windowingMode: 'none'
  }

})
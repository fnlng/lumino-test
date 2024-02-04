import { DocumentManager } from "@jupyterlab/docmanager";
import ServiceManager from "./ServiceManager";
import { DocumentRegistry } from "@jupyterlab/docregistry";
import { Widget } from "@lumino/widgets";
import { fileEditorFactory, notebookWidgetFactory } from "./EditorFactory";
import EditorDockPanel from "../widgets/EditorDockPanel";
import { NotebookModelFactory } from "@jupyterlab/notebook";


const registry = new DocumentRegistry({
  // textModelFactory: {
  //   name: "common factory",
  //   contentType: "text/all",
  //   fileFormat: "text",
  //   isDisposed: true,
  //   createNew: (options) => {
  //     return null;
  //   }

  // }
})

const mFactory = new NotebookModelFactory()

registry.addWidgetFactory(fileEditorFactory)
// registry.addWidgetFactory(notebookWidgetFactory)
registry.addModelFactory(mFactory)

const dock = EditorDockPanel

const widgets: Widget[] = []
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let activeWidget: Widget

export default new DocumentManager({
  manager: ServiceManager,
  opener:  {
    open: (widget: Widget) => {
      console.log(widgets)
      if (widgets.indexOf(widget) === -1) {
        dock.addWidget(widget, { mode: 'tab-after' });
        widgets.push(widget);
      }
      dock.activateWidget(widget);
      activeWidget = widget;
      widget.disposed.connect((w: Widget) => {
        const index = widgets.indexOf(w);
        widgets.splice(index, 1);
      });
    },
    get opened() {
      return {
        connect: () => {
          return false;
        },
        disconnect: () => {
          return false;
        }
      };
    }
  },
  registry,
})
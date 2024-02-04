import { BoxPanel, Widget } from '@lumino/widgets'
import { ReactWidget } from '@jupyterlab/ui-components'
import App from './App.tsx'
import './index.css'
import EditorDockPanel from './widgets/EditorDockPanel.ts'

const app = ReactWidget.create(<App />)
const dock = EditorDockPanel
const wrapper = new BoxPanel()
wrapper.id = 'jp-app-wrapper'
wrapper.direction = 'left-to-right'
wrapper.addWidget(app)
wrapper.addWidget(dock)

Widget.attach(wrapper, document.getElementById('root')!)

console.log(wrapper)

// window.addEventListener('resize', () => {
//   wrapper.update()
// })

import { Widget } from '@lumino/widgets'
import { ReactWidget } from '@jupyterlab/ui-components'
import App from './App.tsx'
import './index.css'

const app = ReactWidget.create(<App />)

Widget.attach(app, document.getElementById('root')!)

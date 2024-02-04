import { Contents } from '@jupyterlab/services'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import FileBrowserModel from '../model/FileBrowserModel'

const model = FileBrowserModel

export interface SelectedItemState {
  items: { [key: string]: boolean },
  checked: boolean,
  indeterminate: boolean,
}

const initialState: SelectedItemState = {
  items: Object.create(null),
  checked: false,
  indeterminate: false,
}

const _is_checked = (state: SelectedItemState) => {
  const items = Array.from(model.items())
  state.checked = items.length > 0 && items.every(item => state.items[item.path])
}

const _is_indeterminate = (state: SelectedItemState) => {
  const items = Array.from(model.items())
  state.indeterminate = items.some(item => !state.items[item.path]) && items.some(item => state.items[item.path])
}

export const selectedItemSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    refreshed: (state, action: PayloadAction<{ [key: string]: boolean }>) => {
      state.items = action.payload
    },
    toggleByName: (state, action: PayloadAction<string>) => {
      const { payload: name } = action

      const existing = Object.keys(state.items)
      if (existing.indexOf(name) !== -1) {
        state.items[name] = !state.items[name]
      } else {
        state.items[name] = true
      }
      _is_checked(state)
      _is_indeterminate(state)
    },
    toggleAll: (state, action: PayloadAction<Contents.IModel[]>) => {
      const existing = Object.keys(state.items)
      const currentState = existing.length > 0 && existing.every(item => state.items[item])
      if (currentState) {
        state.items = Object.create(null)
      } else {
        action.payload.forEach(item => state.items[item.path] = true)
      }
      state.checked = !currentState
      state.indeterminate = false
    },
    clearAll: (state) => {
      state.items = Object.create(null)
      state.checked = false
      state.indeterminate = false
    }
  },
})


// Action creators are generated for each case reducer function
export const { refreshed, toggleByName, toggleAll, clearAll } = selectedItemSlice.actions

export default selectedItemSlice.reducer
import { Signal } from "@lumino/signaling"
import { Widget } from "@lumino/widgets"

export default class CounterWidget extends Widget {
  constructor() {
    super()
  }

  private _value = 0
  private _valueChanged = new Signal<this, number>(this)

  get value(): number {
    return this._value
  }

  set value(value: number) {
    if (this._value == value) {
      return
    }
    this._value = value
    this._valueChanged.emit(value)
  }

  get valueChanged(): Signal<this, number> {
    return this._valueChanged
  }

}
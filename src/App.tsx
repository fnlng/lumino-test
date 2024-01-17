import { UseSignal } from "@jupyterlab/ui-components"
import { useEffect, useState } from "react"
import CounterWidget from "./widgets/CounterWidget"

function App() {

  const [counterWidget, setCounterWidget] = useState<CounterWidget>()

  useEffect(() => {
    console.log('render effect')
    const cw = new CounterWidget()
    setCounterWidget(cw)

    return () => cw.dispose()
  }, [])

  const MyComponent = (
    { count, setCount }: 
    { 
      count: number, 
      setCount: (arg: number) => void | undefined 
    }
  ) => {
    return (
      <>
        <h1>lumino + React</h1>
        <div className="card">
          <button onClick={() => setCount(count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
      </>
    )
  }

  return (
    <div>
      { counterWidget && 
      <UseSignal signal={counterWidget.valueChanged} initialArgs={counterWidget.value}>
        { 
          (_sender, count) => 
            count !== undefined && 
            <MyComponent 
              count={count} 
              setCount={
                (newValue) => { 
                  counterWidget.value = newValue
                  counterWidget.valueChanged.emit(newValue)
                }
              } 
            /> 
        }
      </UseSignal>
      }
    </div>
  )
}

export default App

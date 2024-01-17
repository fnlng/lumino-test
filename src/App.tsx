import { UseSignal } from "@jupyterlab/ui-components"
import { CounterWidgetSingleton } from "./widgets/CounterWidget"


function App() {

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
      { CounterWidgetSingleton && 
      <UseSignal signal={CounterWidgetSingleton.valueChanged} initialArgs={CounterWidgetSingleton.value}>
        { 
          (_sender, count) => 
            count !== undefined && 
            <MyComponent 
              count={count} 
              setCount={
                (newValue) => {
                  CounterWidgetSingleton.value = newValue
                  CounterWidgetSingleton.valueChanged.emit(newValue)
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

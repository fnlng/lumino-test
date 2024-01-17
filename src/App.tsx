import { UseSignal } from "@jupyterlab/ui-components"
import { Signal } from "@lumino/signaling"
import { useEffect, useRef, useState } from "react"
import './App.css'


function App() {

  const self = useRef(null);

  const [countUpdateSignal, setCountUpdateSignal] = useState<Signal<React.Component, number>>()

  const [value, setValue] = useState(0)

  useEffect(() => {
    setCountUpdateSignal(new Signal<React.Component, number>(self.current!))
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
    <div ref={self}>
      { countUpdateSignal && 
      <UseSignal signal={countUpdateSignal} initialArgs={value}>
        { 
          (_sender, count) => 
            count !== undefined && <MyComponent 
                        count={count} 
                        setCount={
                          (newValue) => { 
                            setValue(() => newValue)
                            countUpdateSignal.emit(newValue)
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

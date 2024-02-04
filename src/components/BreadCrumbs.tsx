import { Breadcrumbs, Typography } from "@mui/material";
import FileBrowserModel from "../model/FileBrowserModel";
import { UseSignal } from "@jupyterlab/ui-components";

export default function BreadCrumbs() {
  const model = FileBrowserModel
  
  const handleClick = (lookup: number) => {
    const goThrough = lookup == 0 ? '.' : '../'.repeat(lookup)
    model.cd(goThrough)
      .then(() => {})
      .catch(undefined)
  }

  return (
    <>
    <UseSignal signal={model.pathChanged}>
      { (_, path) => {
        const pathList = (path?.newValue ?? "").split('/')
        // console.log(path)
        // console.log(pathList)

        return (
          <Breadcrumbs className="p-2">
            <Typography 
              className="hover:underline cursor-pointer"
              onClick={() => handleClick(pathList.length)}
            >Home</Typography>
            { pathList.map((p, i) => {
              return (
                <Typography 
                  key={i}
                  className="hover:underline cursor-pointer"
                  onClick={() => handleClick(pathList.length - i)}
                >
                  {p}
                </Typography>
              )
            })}
          </Breadcrumbs>
        )
      }
      }
    </UseSignal>
    </>
  )
}
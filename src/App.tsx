import { useState } from "react"
import BreadCrumbs from "./components/BreadCrumbs"
import FileList from "./components/FileList"
import { Box, Button, Chip, Divider, Drawer, List, ListItem, Stack } from "@mui/material"
import FolderIcon from '@mui/icons-material/Folder';
import HexagonIcon from '@mui/icons-material/Hexagon';
import AddIcon from '@mui/icons-material/Add';
import DocumentManager from "./manager/DocumentManager";
import FileBrowserModel from "./model/FileBrowserModel";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "./app/store";


function App() {

  const menu = [
    {
      name: 'folder',
      icon: <FolderIcon />,
    },
    {
      name: 'kernel',
      icon: <HexagonIcon />,
    },
  ]

  const [menuOpened, setMenuOpened] = useState<boolean[]>(new Array(2).fill(false))

  const toggleMenuItemOpen = (position: number) => {
    const updatedMenuOpened = menuOpened.map((t, i) => 
      i === position ? !t : false
    )
    setMenuOpened(updatedMenuOpened)
  }

  const Icons = () => {
    return (
      <List className="w-[40px] h-screen">
        { menu.map((t, i) => 
          <ListItem key={t.name} disablePadding>
            <Button 
              
              onClick={() => toggleMenuItemOpen(i)}
              className="w-fit hover:bg-slate-400/50 overflow-auto p-1"
            >
              {t.icon}
            </Button>
          </ListItem>
          )
        }
      </List>
    )
  }

  const SidePanel = () => {

    const docManager = DocumentManager
    const fbModel = FileBrowserModel

    // const [itemSelected, setItemSelected] = useState<boolean[]>([])
    // type setItemSelectedType = React.Dispatch<React.SetStateAction<boolean[]>>
    const selectedItems = useSelector((state: RootState) => state.selectedItem.items)

    const createAndOpenNew = () => {
      console.log('clicked')
      console.log(fbModel.path)
      docManager.newUntitled({
          type: "file ",
          path: fbModel.path
        })
        .then(model => {
          console.log(model)
          docManager.open(model.path)
        })

    }

    const deleteSelectedItem = () => {
      const items = Array.from(fbModel.items())
        .filter((_, index) => selectedItems[index])
      Promise.all(items.map(model => 
          docManager.deleteFile(model.path)
            .catch(e => console.error(e))
        ))
        // .then(() => fbModel.refresh())
    }

    return (
      <Box className={["", menuOpened.some(t => t) ? "w-full" : "w-0"].join(" ")} >
      { menuOpened[0] &&
        <Stack direction='column'>
          <Stack direction='row' >
            <Button onClick={createAndOpenNew}>
              <AddIcon />
            </Button>
            <Button>upload</Button>
            <Button>refresh</Button>
            <Button onClick={deleteSelectedItem}>delete</Button>
          </Stack>
          <BreadCrumbs /> 
          <FileList /> 
        </Stack>
      }
      </Box>
    )
  }

  return (
    <Provider store={store}>
    <div>
      <Drawer
        variant="permanent"
        className={["", menuOpened.some(t => t) ? "w-full" : "w-full"]
          .join(" ")}
        open={menuOpened.some(t => t)}
        sx={{
          "& .MuiPaper-root": {
            // width: '100%',
          }
        }}
      >
        <Stack direction='row'
          className="w-fit"
        >
          <Icons />
          <Divider orientation="vertical" />
          <SidePanel />
          { menuOpened.some(t => t) && 
            <Divider component="div" role="presentation" orientation="vertical">
              <Chip label="<" size="small" onClick={() => setMenuOpened(new Array(2).fill(false))} />
            </Divider> 
          }
        </Stack>
      </Drawer>
    </div>
    </Provider>
  )
}

export default App

import { UseSignal } from "@jupyterlab/ui-components";
import FileBrowserModel from "../model/FileBrowserModel";
import Checkbox from "@mui/material/Checkbox";
import { default as MuiTableCell } from "@mui/material/TableCell";
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, Stack, Typography, styled } from "@mui/material";
import { Contents } from "@jupyterlab/services";
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import DocumentManager from "../manager/DocumentManager";
import { useDispatch, useSelector } from "react-redux";
import { toggleAll, toggleByName } from "../slice/selectedItemSlice";
import { RootState } from "../app/store";
import { useEffect } from "react";

export default function FileList() {

  const model = FileBrowserModel

  const docManager = DocumentManager

  // const dispatch = useDispatch()

  
  const CheckAllButton = ({ items } : { items: Contents.IModel[] }) => {

    const dispatch = useDispatch()
    const selectedItemState = useSelector((state: RootState) => state.selectedItem)
    const { checked, indeterminate } = selectedItemState


    return (
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        onChange={() => dispatch(toggleAll(items))} />
    );
  };

  const FileListTable = ({ items } : { items: Contents.IModel[] }) => {

    const dispatch = useDispatch()
    
    // const itemNum = items.length
    // const [itemSelected, setItemSelected] = useState<boolean[]>(new Array(itemNum).fill(false))
    
    const selectedItems = useSelector((state: RootState) => state.selectedItem.items)

    useEffect(() => {
      console.log(selectedItems)
    }, [selectedItems])

    const handleItemClick = (path: string, type: string) => {
      if (type == 'directory') {
        model.cd(path)
          // .then(() => { setItemSelected(new Array(itemNum).fill(false)) })
          .catch(undefined)
      } else {
        const docWidget = docManager.openOrReveal(path)
        console.log(model.manager)
        
        if (docWidget === undefined) {
          console.log("widget create fail")
        } else {
          console.log(docWidget)
          // EditorDockPanel.addWidget(docWidget)
        }
      }
    }

    const TableCell = styled(MuiTableCell)({
      padding: '0 16px'
    })

    return (
      <TableContainer component={Paper}>
      <Table size="small" className="min-w-0 w-full">
        <TableHead>
          <TableRow>
            <TableCell>
              <CheckAllButton items={items} />
            </TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Last&nbsp;Modified</TableCell>
            <TableCell align="right">File&nbsp;Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { items.map(
            (fd) => {
              return (
                <TableRow
                  key={fd.name}
                  selected={selectedItems[fd.path]}
                  // onClick={() => dispatch(toggleByName(fd.path))}
                  className="hover:bg-slate-100"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedItems[fd.path]}
                      onChange={() => dispatch(toggleByName(fd.path))} />
                  </TableCell>
                  <TableCell>
                    <Stack
                      direction='row'
                      onClick={() => handleItemClick(fd.name, fd.type)}
                      className="p-2"
                      spacing={0.5}
                    >
                      {fd.type == 'directory' ? <FolderIcon /> : <DescriptionIcon />}
                      <Typography noWrap>{fd.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    { new Date(fd.last_modified).toLocaleDateString() }
                  </TableCell>
                  <TableCell align="right">
                    {fd.size && <p>{fd.size > 1024 ? `${(fd.size / 1024).toFixed(1)}KB` : `${fd.size || 0}B`}</p>}
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
      </TableContainer>
    ) 
  }


  return (
    <>
      <UseSignal signal={model.refreshed}>
        { () => {
            const items = Array.from(model.items())

            return <FileListTable items={items} /> 
            // : (
            //     <Stack spacing={1}>
            //     <Skeleton variant="rounded" width={500} height={26} />
            //     <Skeleton variant="rounded" width={500} height={26} />
            //     <Skeleton variant="rounded" width={500} height={26} />
            //     <Skeleton variant="rounded" width={500} height={26} />
            //     </Stack>
            //   )
            
          }
        }
      </UseSignal>
    </>
  )
}
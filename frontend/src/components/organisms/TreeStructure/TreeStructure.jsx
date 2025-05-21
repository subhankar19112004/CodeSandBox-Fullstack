
import { useTreeStructureStore } from "../../../store/treeStructureStore"
import { useEffect } from "react";
import { TreeNode } from "../../molecules/TreeNode/TreeNode.jsx";

import { FileContextMenu } from "../../molecules/ContextMenu/FileContextMenu.jsx";
import { useFolderContextMenuStore } from "../../../store/folderContextMenuStore.js";
import { FolderContextMenu } from "../../molecules/ContextMenu/FolderContextMenu.jsx";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore.js";

export const TreeStructure = () => {

    const { treeStructure, setTreeStructure } = useTreeStructureStore();
    const {
        file, 
        isOpen: isFileContextOpen,
         x: fileContextX,
         y: fileContexty } = useFileContextMenuStore();

    const {
        folder, 
        isOpen: isFolderContextOpen,
         x: folderContextX,
         y: folderContexty } = useFolderContextMenuStore();
   

    

    useEffect(() => {
        if(treeStructure){
            console.log("tree: ",treeStructure )
        } else {
            setTreeStructure()
        }
       
    }, [ setTreeStructure,treeStructure]);

    return(
        <div>
        {isFileContextOpen && fileContextX && fileContexty && (
            <FileContextMenu x={fileContextX} y={fileContexty} path={file} />
        )}
        {isFolderContextOpen && folderContextX && folderContexty && (
            <FolderContextMenu x={folderContextX} y={folderContexty} path={folder} />
        )}
            {/* <h1>Tree Structure</h1> */}
            <TreeNode fileFolderData={treeStructure}/>
        </div>
    )
}
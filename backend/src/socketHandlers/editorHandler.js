import fs from "fs/promises";
import path from "path";
export const handleEditorSocketEvents = (socket) => {
  socket.on("writeFile", async ({ data, pathToFileOrFolder }) => {
    try {
      const response = await fs.writeFile(pathToFileOrFolder, data);
      socket.emit("writeFileSuccess", {
        data: "File written successfully",
      });
    } catch (error) {
      console.log("Error writing the file", error);
      socket.emit("error", { 
        message: "Error writing the file" 
    });
    }
  });

  socket.on("createFile", async ({ pathToFileOrFolder }) => {
    const isFileAlreadyPresent = await fs.stat(pathToFileOrFolder);/** stat -> checks the file if it exists or not */
    if (isFileAlreadyPresent) {
      socket.emit("error", { 
        message: "File already present" 
    });
      return;
    }

    try {
      const response = await fs.writeFile(pathToFileOrFolder, "");/**writefile -> creates the file */
      socket.emit("createFileSuccess", {
        message: "File created successfully",
      });
    } catch (error) {
      console.log("Error creating the file", error);
      socket.emit("error", {
        message: "Error creating or internal server error come back again",
      });
    }
  });

  socket.on("readFile", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.readFile(pathToFileOrFolder,);/**readfile -> reads the file */
      console.log(response.toString());
      socket.emit("readFileSuccess", { 
        value: response.toString(),
        path: pathToFileOrFolder
    });
    
    } catch (error) {
      console.log("Error reading the file", error);
      socket.emit("error", { 
        message: "Error reading the file" 
    });
    }
  });

  socket.on("deleteFile", async ({ pathToFileOrFolder }) => {
    try {
        const response = await fs.unlink(pathToFileOrFolder);/**unlink likely deletes the file */
        socket.emit("deleteFileSuccess", {
            message: "File deleted successfully"
        })
    } catch (error) {
        console.log("Error deleting the file", error);
        socket.emit("error", { 
            message: "Error deleting the file" 
        });
    }
  });

  socket.on("createFolder", async ({ pathToFileOrFolder }) => {
    try {
        const response = await fs.mkdir(pathToFileOrFolder);/**mkdir -> it creates a folder in fs module */
        socket.emit("createFolderSuccess", {
            message: "Folder created successfully"
        })
    } catch (error) {
        console.log("Error creating the folder", error);
        socket.emit("error", { 
            message: "Error creating the folder" 
        });
    }
  });

  socket.on("deleteFolder", async ({ pathToFileOrFolder }) => {
    try {
        const response = await fs.rmdir(pathToFileOrFolder);/**rmdir -> to delete the folder in fs module */
        socket.emit("deleteFolderSuccess", {
            message: "Folder deleted successfully"
        })
    } catch (error) {
        console.log("Error deleting the folder", error);
        socket.emit("error", { 
            message: "Error deleting the folder" 
        });
    }
  });


};

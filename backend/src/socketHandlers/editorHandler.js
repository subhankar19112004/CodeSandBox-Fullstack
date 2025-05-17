import fs from "fs/promises";
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
      const response = await fs.readFile(pathToFileOrFolder, "utf-8");/**readfile -> deletes the file */
      socket.emit("readFileSuccess", { 
        data: response.toString() 
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

  socket.on("craeteFolder", async ({ pathToFileOrFolder }) => {
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

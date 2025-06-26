import express from "express";
import { PORT } from "./config/serverConfig.js";
import apiRouter from "./routes/index.js";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "node:http";
import chokidar from "chokidar";
import { WebSocketServer } from 'ws';

import { handleEditorSocketEvents } from "./socketHandlers/editorHandler.js";
import { handleContainerCreate } from "./containers/handleContainerCreate.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

io.on("connection", (socket) => {
  console.log("A verified user has connected");
});

app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
}); 

const editorNameSpace = io.of("/editor");


editorNameSpace.on("connection", (socket) => {
  console.log("Editor connected");

  //somehow we will get the projectId from frontend

  let projectId = socket.handshake.query["projectId"]; // ass of now

  if (projectId) {
    var watcher = chokidar.watch(`./projects/${projectId}`, {
      ignored: (path) => path.includes("node_modules"),
      persistent: true /** keeps the watcher in running state till the time watch is running */,
      awaitWriteFinish: {
        stabilityThreshold: 2000 /**Ensures stability of files before triggering event */,
        // pollInterval: 100
      },
      ignoreInitial: true /** Ignores the initial files in the directory */,
    });
    watcher.on("all", (event, path) => {
      console.log(event, path);
    });
  }

  handleEditorSocketEvents(socket, editorNameSpace);

  // socket.on("disconnect", async () => {
  //     await watcher.close();
  //     console.log("Editor disconnected");
  // })
});

// const terminalNameSpace = io.of("/terminal");

// terminalNameSpace.on("connection", (socket) => {
//   console.log("Terminal connected");

//   let projectId = socket.handshake.query["projectId"];

//   // socket.on("shell-input", (data) => {
//   //   console.log("Terminal input", data);
//   //   terminalNameSpace.emit("shell-input", data); 
//   // })

//   socket.on("disconnect", () => {
//     console.log("Terminal disconnected");
//   });
//   handleContainerCreate(projectId, socket);
// });



server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

const webSocketForTerminal = new WebSocketServer({
  noServer: true, // You should set this to true if you're not using a custom server
});

server.on("upgrade", (req, socket, head) => {
  /**
   * req: Incoming http request
   * socket: TCP socket
   * head: Buffer containing the first packet of the upgraded stream
   */
  //This callback will be called when a client tries to connect to the server through websocket
  const isTerminal = req.url.includes("/terminal");

  
});

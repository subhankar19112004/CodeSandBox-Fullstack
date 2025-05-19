import express from "express";
import { PORT } from "./config/serverConfig.js";
import apiRouter from "./routes/index.js";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "node:http";
import chokidar from "chokidar";

import { handleEditorSocketEvents } from "./socketHandlers/editorHandler.js";

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

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

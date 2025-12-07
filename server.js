import { WebSocketServer } from "ws";
import http from "http";
import { setupWSConnection } from "./utils.js";

const host = process.env.HOST || "localhost";
const port = parseInt(process.env.PORT || "1234");

const wss = new WebSocketServer({ noServer: true });

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Yjs WebSocket Server is running");
});

wss.on("connection", setupWSConnection);

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

server.listen(port, host, () => {
  console.log(`Yjs WebSocket server running at '${host}' on port ${port}`);
});

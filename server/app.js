const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`App listening  on port ${port}`);
})

const WebSocket = require("ws");
const http = require('http');

const server = http.createServer();

const wss = new WebSocket.Server({ port: 8082 });

wss.on("connection", (ws) => {
  console.log("websocket connection established");

  ws.on('message', (e) => {
    console.log(JSON.parse(e));
    if (JSON.parse(e)['teamNumber'] != undefined) {

      console.log(JSON.parse(e)['teamNumber']);
      // if (localStorage.getItem('teamNum') != null && localStorage.getItem('teamNum') == JSON.parse(e)['teamNumber']) {
      //   localStorage.setItem("numLikes", localStorage.getItem("numLikes") + 1);
      //   document.getElementById('likes').innerHTML = 'likes: ' + localStorage.getItem('numLikes');
      // }
    }

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(e);
      }
    })
  });

  ws.on("close", () => {
    console.log("Websocket connection closed");
  });


});

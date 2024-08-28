import express from "express";
import {WebSocketServer} from "ws";
// package json in // "type": "module", also included
const app = express();
const port=8080;

const server = app.listen(port,()=>{
    console.log("server started ...");
});

const wss = new WebSocketServer({server});

wss.on("connection",(ws)=>{
    ws.on("message",(data)=>{
        console.log("data from client %s",data);
        ws.send("Thank you ,buddy")
    })
})
'use strict'
const http= require('http');
const debug = require('debug')('node');
const app = require('./app');
require("dotenv").config();

const normalizePort = val => {
  var port = parseInt(val, 10);
  if(isNaN(port)){
    return val;
  }
  if(port >= 0){
    return port;
  }
  return false;
};

const onError = error => {

  if(error.syscall !== "listen"){
    throw error;
  }
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code){
    case "EACCES":
      console.log(bind+ "requires elevated privigeles");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.log(bind+ " is already in used");
      process.exit(1);
      break;
    default:
      throw error;
  }}

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port "+ port;
    debug("Listening "+ bind);
}

const port = normalizePort( process.env.PORT || "8080" );
app.set('port', port);
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);

server.listen(port);

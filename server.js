const express= require("express");
const app= express();
// const serverx= app.listen(8000, '192.168.1.64'); // const server= app.listen(3000, '192.168.0.3');
const serverx= app.listen(8000, '138.68.14.62'); // const server= app.listen(3000, '192.168.0.3');
// WebSocket Socket.IO Code
const SocketIO = require("socket.io");
const io= SocketIO(serverx);

let Arduino;
let arduinoConnected=false;

app.use(express.static("./public"));

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
    
});

// let objGlobal;
// objGlobal= {
        
// }

io.on("connection", (socket) => {
    console.log("websocket new connection, "+ socket.id);
    if(arduinoConnected){
        Arduino.sendUTF("newWebsocketConnected");
    }
    // console.log(socket.accept);
    socket.on("clientMotor1Value", (message) => {
        console.log("Mensaje Recibido: " + message);
        if(arduinoConnected){
            Arduino.sendUTF(message);
        }
    });
    socket.on("clientEmergencyStop", (message) => {
        console.log("Mensaje Recibido: " + message);
        if(arduinoConnected){
            Arduino.sendUTF("emergencyStop");
        }
    });
    socket.on("clientRunPermissionAsk", (message) => {
        console.log("Mensaje Recibido: " + message);
        if(arduinoConnected){
            Arduino.sendUTF("runAuthorizationFromClient");
        }
    });
    // socket.on("motor1_control", (message) => {
    //     console.log("Mensaje Recibido: " + message);
    //     io.sockets.emit("arduinoContador", "0");
    //     Arduino.sendUTF(message);
    // });
});






///// Original

var WebSocketServer = require('websocket').server;
var http = require('http');
 
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(3000, function() {
    console.log((new Date()) + ' Server is listening on port 3000');
});
 
wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production 
    // applications, as it defeats all standard cross-origin protection 
    // facilities built into the protocol and the browser.  You should 
    // *always* verify the connection's origin and decide whether or not 
    // to accept it. 
    autoAcceptConnections: false
});
 
function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed. 
  return true;
}
 
wsServer.on('request', function(request) {
	
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin 
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
    var connection = request.accept('arduino', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    
	connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            let obj= JSON.parse(message.utf8Data);
            console.log(obj);
            // console.log(obj.id == "arduinoNewWebSocketData");
            if(obj.id == "WStype_CONNECTED"){
                io.sockets.emit("WStype_CONNECTED", obj); //AQUI
                // console.log("emit accionado");
            }else if(obj.id == "arduinoNewWebSocketData"){
                // console.log("Envie a la Pagina Web");
                io.sockets.emit("newWebSocketArduinoConfirmation", obj); //AQUI
            }else if(obj.id == "runAuthorizationFromArduino"){
                // console.log("Envie a la Pagina Web");
                io.sockets.emit("runAuthorizationFromArduino", obj); //AQUI
            }else if(obj.id == "colorFromArduino"){
                if(obj.colorValue == "color_1"){
                    console.log(obj.colorValue);
                    io.sockets.emit("colorFromArduino", obj);
                }else if(obj.colorValue == "color_2"){
                    console.log(obj.colorValue);
                    io.sockets.emit("colorFromArduino", obj);
                }else if(obj.colorValue == "color_3"){
                    console.log(obj.colorValue);
                    io.sockets.emit("colorFromArduino", obj);
                }else if(obj.colorValue == false){
                    // console.log("caramelo");
                    io.sockets.emit("colorFromArduino", obj);
                }
            }else if(obj.id == "emergencyStopFromArduino"){
                io.sockets.emit("emergencyStopFromArduino", obj); //AQUI
            }
            // connection.sendUTF("Message Received Client!");
            // connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            
           //connection.sendBytes(message.binaryData);
        }
    });
    
	connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        arduinoConnected= false;
        io.sockets.emit("close", {heart: 0});
    });
	
    connection.sendUTF("Hallo Client!");
    Arduino= connection;
    arduinoConnected= true;
});
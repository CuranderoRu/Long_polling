/**
 * Created by Sergey on 06.07.2018.
 */
var http = require('http');
var serverStatic = require('node-static');
var WS = require('WS');
var moment = require('moment');
var clientsNow = {};

var WSServer = new WS.Server({
    port: 8081
});

WSServer.on('connection', function(ws){
    var idUser = Math.random();
    clientsNow[idUser] = {
        name: null,
        ws: ws
    };
    console.log('New user', 'id:', idUser);
    ws.on('message', function(clientMessage){
        clientMessage = JSON.parse(clientMessage);
        for (var keyClient in clientsNow){
            if (clientsNow[keyClient].name == null){
                clientsNow[keyClient].name = clientMessage.username;
            }
            clientsNow[keyClient].ws.send(clientsNow[keyClient].name + " ("+ moment().format('lll') +")" + ": " + clientMessage.message);
        }
    });

    ws.on('close', function(){
        delete clientsNow[idUser];
    })

});

var myServer = new serverStatic.Server('.');
http.createServer(function (req, res) {
    myServer.serve(req, res);
}).listen(8080);

console.log('Server running');
const ntClient = require('wolfbyte-networktables');
const http = require('http');

const client = new ntClient.Client();
var data = {};

client.start((isConnected, err) => {
    // Displays the error and the state of connection
    console.log({ isConnected, err });
});

client.addListener((key, val, type, id) => {
    console.log({ key, val, type, id });

    data[key] = val;     
}, true);

//create a server object:
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});


    res.write('<!DOCTYPE html><html><head><title>Web Dash</title><meta http-equiv="refresh" content="1"></head>');
    res.write('<body><ul>');
    Object.keys(data).forEach(key=>{
        res.write("<li>" + key + ":" + data[key] + "</li>");
    });
    res.write("</ul></body>");

    res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

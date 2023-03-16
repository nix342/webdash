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
    Object.keys(data).forEach(key=>{
        res.write(key + ":" + data[key] + "\n");
    })
    res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

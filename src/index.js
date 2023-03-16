const ntClient = require('wolfbyte-networktables');

global.watch = function () {
        const client = new ntClient.Client();

        client.start((isConnected, err) => {
            // Displays the error and the state of connection
            console.log({ isConnected, err });
        });

        // Adds a listener to the client
        client.addListener((key, val, type, id) => {
            console.log({ key, val, type, id });
        });
};

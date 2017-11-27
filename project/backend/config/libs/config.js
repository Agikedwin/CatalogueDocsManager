
var mongoose = require('mongoose');

var isConnectedBefore = false;

 var db =  mongoose.connect('mongodb://localhost/' + + 'test_dev', {server: { auto_reconnect: true }});


mongoose.connection.on('error', function() {
    console.log('Could not connect to MongoDB');
});

mongoose.connection.on('disconnected', function(){
    console.log('Lost MongoDB connection...');
    if (!isConnectedBefore)
        connect();
});
mongoose.connection.on('connected', function() {
    isConnectedBefore = true;
    console.log('Connection established to MongoDB');
});

mongoose.connection.on('reconnected', function() {
    console.log('Reconnected to MongoDB');
});

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Force to close the MongoDB conection');
        process.exit(0);
    });
});
module.exports= db;
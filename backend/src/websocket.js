const socketio = require('socket.io');
const StringToArray = require('./utils/StringToArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
var connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);
    console.log('[ Websocket ] Ok')

    io.on('connection', socket => {
        console.log(socket.id)
        console.log(socket.handshake.query)

        const { latitude, longitude, techs } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: StringToArray(techs)
        })
    });
};

exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10
        && connections.techs.some(item => techs.include(item))
    })
};

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    })
}

var socket

function setSocket(s){
	socket = s
}

function getSocket(){
	return socket
}

module.exports = {
    setSocket: setSocket,
    getSocket: getSocket
}
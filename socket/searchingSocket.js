const searchingSocket = (socketIo) => {
  socketIo.on('connection', (socket) => {
    socket.on('search', (searchingSocket) => {
      searchingSocket.emit('검색중');
    });
  });
};

module.exports = searchingSocket;

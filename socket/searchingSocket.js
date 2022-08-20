const matchFeature = require('./mongoose/matchFeature');
const matchItem = require('./mongoose/matchItem');

const searchingSocket = (socketIo) => {
  socketIo.on('connection', (socket) => {
    socket.on('search', async (searchingWord) => {
      try {
        //단순 매칭 단어
        const matchedItemsByItem = matchItem(searchingWord);
        //Feature 매칭 단어
        const matchedItemsByFeature = matchFeature(searchingWord);
        const socketRequest = {
          status: 'success',
          matchedItemsByItem,
          matchedItemsByFeature,
        };
        socket.emit('search', socketRequest);
      } catch (error) {
        const socketRequest = {
          status: 'fail',
          error,
        };
        socket.emit('search', socketRequest);
      }
    });
  });
};

module.exports = searchingSocket;

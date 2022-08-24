const matchFeature = require('./mongoose/matchFeature');
const matchItem = require('./mongoose/matchItem');

const searchingSocket = (socketIo) => {
  socketIo.on('connection', (socket) => {
    socket.on('search', async (searchingWord) => {
      console.log('log');
      console.log(searchingWord);
      try {
        //단순 매칭 단어
        const matchedItemsByItem = await matchItem(searchingWord);
        //Feature 매칭 단어
        const matchedItemsByFeature = await matchFeature(searchingWord);
        const socketRequest = {
          status: 'success',
          matchedItemsByItem,
          matchedItemsByFeature,
        };
        socket.emit('searchResult', socketRequest);
      } catch (error) {
        const socketRequest = {
          status: 'fail',
          error,
        };
        console.log(socketRequest);
        socket.emit('search', socketRequest);
      }
    });
  });
};

module.exports = searchingSocket;

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');

const cors = require('cors');
const { Server } = require('socket.io');

require('dotenv').config();

const app = express();

//몽고디비 연결
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to mongodb'))
  .catch(() => console.log('mongodb connection failed'));

//LISTENING
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

//CORS
const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? 'http://localhost:3000'
      : 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

//ROUTES
const featureRoute = require('./routes/feature');
const itemRoute = require('./routes/item');

app.use('/features', featureRoute);
app.use('/items', itemRoute);

//socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? 'http://localhost:3000'
        : 'http://localhost:3000',
    methods: ['GET'],
    credentials: true,
  },
});

const searchingSocket = require('./socket/searchingSocket');
searchingSocket(io);

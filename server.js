const express = require('express');
const db = require('./data/dbConfig.js');
const accountRouter = require('./routes/accountRouter');

const server = express();
server.use(express.json());

const logger = (req, res, next) => {
  console.log(`${req.method} request made to ${req.url} at ${Date.now()}`);
  next();
};

server.use(logger);

server.get('/', (req, res) => {
  res.status(200).json('nice');
});

server.use('/api/accounts', accountRouter);

module.exports = server;

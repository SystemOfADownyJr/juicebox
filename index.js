const { PORT = 1337 } = process.env;
const express = require('express');
const server = express();

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});
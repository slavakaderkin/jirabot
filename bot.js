const Server = require('./server');
const fs = require('fs');

const options = {
  cert: fs.readFileSync('./cert/cert.pem'),
  key: fs.readFileSync('./cert/key.pem')
}

Server.start(options); // options for https

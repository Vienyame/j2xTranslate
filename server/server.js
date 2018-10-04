const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const api = require('./api');

const server = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};
server.set('port', process.env.PORT || 8000);

//server.use(bodyParser.json());

server.use(cors(corsOptions));

server.use(bodyParser.urlencoded({extended: true}));

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, DELETE");
  next();
});


server.use(function(req, res, next) {
  req.rawBody = '';
  req.setEncoding('utf8');

  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });

  req.on('end', function() {
    next();
  });
});

server.post('/api/upload', api.upload);

server.get('/api/template', api.template);

server.post('/api/vien2json', api.vien2json);

server.listen(server.get('port'), () => {
  console.log('✔Express server listening on http://localhost:%d/', server.get('port'));
});



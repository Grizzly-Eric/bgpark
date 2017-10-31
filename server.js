var express = require("express");
var AV = require('leanengine');
var expressWs = require('express-ws');

var Realtime = require('leancloud-realtime').Realtime;
var TextMessage = require('leancloud-realtime').TextMessage;

// init LeanEngine
var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || 3000);
var APP_ID = process.env.LEANCLOUD_APP_ID;
var APP_KEY = process.env.LEANCLOUD_APP_KEY;
var MASTER_KEY = process.env.LEANCLOUD_APP_MASTER_KEY;
AV.initialize(APP_ID, APP_KEY, MASTER_KEY);

var realtime = new Realtime({
  appId: 'dDQLpS3C3cUFPTQ2gmU5jGeg-gzGzoHsz',
  region: 'cn', //美国节点为 "us"
});

// init websocket
var app = express();
expressWs(app);

app.set('view engine', 'ejs');  


app.get('/', function(req, res) {
  res.render('index');
});

app.ws('/echo', function(ws, req) {
  
  ws.on('message', function(msg) {

    ws.send(Number(msg)+1);
    ws.send(Number(msg)+2);

  });

  ws.send(Number("809")+2);
  
});
app.listen(PORT);

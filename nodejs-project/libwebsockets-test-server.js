/*
    first import all depend and initize setting
    ##########################################################################
 */
var WebSocketServer = require('websocket').server;
var http = require('http');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var path = require('path');
var app = express();
var connections = require("./cache_utils/connection_manager");
var WebSocketRouter = require('websocket/lib/WebSocketRouter');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));




if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

/*
 finish import all depend and initize setting
 ##########################################################################
 */





/*
 start set route
 ##########################################################################
 */
app.get('/', routes.index);
app.get('/users', user.list);
/*
 finish set route
 ##########################################################################
 */




var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});


wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});


var router = new WebSocketRouter();
router.attachServer(wsServer);


var share_code = '';




router.mount('*','lcz-protocol',function(request){

    // set filter
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }


    var cookies = [
        {
              name :"test_cookie",
              value: "CookieValue" + Math.floor(Math.random()*1000),
              path: '/',
              secure: false,
              maxage: 5000,
              httponly: true
        }

    ];

    var connection = request.accept(request.origin, cookies);
    console.error("start share_code:"+share_code);

    connections._push(connection);

    connection.on('message',function(message){

        if(message.type === 'utf8' && message.utf8Data!='start'){
                share_code = message.utf8Data;
            console.error("send()"+share_code);
        }
        connections._self.forEach(function (conn){
            conn.send(share_code,sendCallback);
        });

    });

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });



});



function sendCallback(err){
    if(err) console.error("send() error:"+err);
}

/*
   filter url
 */
function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

//setInterval(function() { console.log('timer: ', connections.me); }, 1000);

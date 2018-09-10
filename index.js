var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
});
app.get('/chat.html', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/vue', function(req, res){
    res.sendFile(__dirname + '/vue.html')
});
io.on('connection', function(socket){
    socket.broadcast.emit('chat connected', true);
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});
http.listen(3000, function(){
    console.log('listening on *:3000')
})

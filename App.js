const app =require('express')();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

app.get('/',function(req,res){
    var options ={
        root:path.join(__dirname)
    }
    var fileName='index.html';
    res.sendFile(fileName,options);
});

users=[];

io.on('connection',function(socket){

    socket.on('setUserName',function(data){
        console.log(data+'user connected');

    if(users.indexOf(data) > -1){
        socket.emit('userExists',data+'username is already in use! PLEASE another use name' )
    }
    else{
        users.push(data);
        socket.emit('setUser',{username:data});
    }
    });

    socket.on('msg',function(data){
        io.sockets.emit('newmsg',data);
    })
});

http.listen(3000,function(){
    console.log("Server started");
});
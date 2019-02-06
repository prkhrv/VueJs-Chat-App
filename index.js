var app = require('express')();
var http = require('http').Server(app);
var port = process.env.PORT || 3000
var io = require('socket.io')(http);



//socket

io.on("connection", (socket)=>{
  console.log("Socket is connected");
  io.emit("nusers",Object.keys(io.sockets.connected).length);

  socket.on("Created",(data)=>{
    socket.broadcast.emit("Created", data)
  });

  socket.on("chat-message",(data)=>{
    socket.broadcast.emit("chat-message", data)
  });

  socket.on("typing",(data)=>{
    socket.broadcast.emit("typing", data)
  });

  socket.on("stopTyping",(data)=>{
    socket.broadcast.emit("stopTyping", data)
  });

  socket.on("joined",(data)=>{
    socket.broadcast.emit("joined", data)
  });

  socket.on("left",(data)=>{
    socket.broadcast.emit("left", data)
  });



  socket.on("disconnect", ()=>{
    console.log("socket is disconnected");
    io.emit("nusers",Object.keys(io.sockets.connected).length);
  });
});




//Routes
app.get('/',(req,res)=>{
res.sendFile(__dirname + '/index.html');
});



//Server
http.listen(port,()=>{
  console.log("Server started on "+ port);
})

const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const cors = require('cors')
const routes = require('./routes')
const {addUsers, removeUser, getUser, getUserInRoom} = require('./users')

const app = express()

app.use(cors())
app.use(routes)

const server = http.createServer(app)

const io = socketIO(server, {
  cors: {origin: '*'}
})

io.on('connection', socket=>{
  //socket.emit(socket.id +' User connected')
  console.log(socket.id +' User connected')

  socket.on('sendMessage', (msg, callback) =>{
      const user = getUser(socket.id)
      if(user)
        io.to(user.room?user.room:'').emit('message', {user: user.name, text:msg})
      callback()
  })

  socket.on('join', ({name, room}, callback) =>{
    //console.log(name, room)
    const {error, newUser} = addUsers({id: socket.id, name, room})
    if(error)
      return callback(error)
    if(newUser)
      socket.emit('message', {name:'admin', text:`Hey! ${newUser.name}, welcome to ${newUser.room}`})
    
    socket.to(newUser.room?newUser.room:'').emit('message', {name:'admin', text:`${newUser.name} has joined the chat!`})
    
    socket.join(newUser.room)

    callback()
  })

  socket.on('disconnect', () => {
    //socket.emit(socket.id +' User disconnected')
    console.log(socket.id +' user disconnected')
    const user = getUser(socket.id)
    if(user)
      io.to(user.room?user.room:'').emit('message', {name:'admin', text:`${user.name} has left the chat!`})
    removeUser(socket.id)

  })
})

  
server.listen(8080, () => console.log(`Listening on port 8080`))
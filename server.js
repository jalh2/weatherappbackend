require('dotenv').config()

const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')
const http = require('http');
const socketIo = require('socket.io')

const userRoutes = require('./routes/user')

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use(cors({
  origin: '*'
}))

app.use('/api/user', userRoutes)

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)

  // Listen for user status updates from the client
  socket.on('user-status', (data) => {
    console.log('User status update received:', data)
    
    // Broadcast this update to all connected clients except the sender
    socket.broadcast.emit('update-user-status', data)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

mongoose.set('strictQuery', true)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests using the HTTP server instead of Express app
    server.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
require('dotenv').config()

const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')
const http = require('http');
const socketIo = require('socket.io');

const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')

const app = express()
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
});

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Configure CORS middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoutes)


// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)

  // Listen for user status updates from the client
  socket.on('user-status', async (data) => {
    console.log('User status update received:', data)
    
    try {
      // Update user status in database
      await mongoose.model('user').findByIdAndUpdate(
        data._id,
        {
          activeStatus: data.activeStatus,
          latitude: data.latitude,
          longitude: data.longitude
        }
      );
      
      // Broadcast this update to all connected clients
      io.emit('update-user-status', {
        _id: data._id,
        activeStatus: data.activeStatus,
        latitude: data.latitude,
        longitude: data.longitude
      });
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  });

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
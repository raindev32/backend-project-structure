#!/usr/bin/env node

/**
 * Module dependencies.
 */
import http from 'http'
import project from '../../config/project.config'
import app from '../app'

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val) => {
   let port = parseInt(val, 10)

   if (isNaN(port)) {
      // named pipe
      return val
   }

   if (port >= 0) {
      // port number
      return port
   }

   return false
}

/**
 * Get port from environment and store in Express.
 */
let port = normalizePort(project.api_port)
app.set('port', port)

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
   if (error.syscall !== 'listen') {
      throw error
   }

   let bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

   // handle specific listen errors with friendly messages
   switch (error.code) {
      case 'EACCES':
         console.error(`${bind} requires elevated privileges`)
         process.exit(1)
      case 'EADDRINUSE':
         console.error(`${bind} is already in use`)
         process.exit(1)
      default:
         throw error
   }
}

/**
 * Create HTTP server.
 */
const server = http.createServer(app)

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
   let addr = server.address()
   let bind = typeof addr === 'string' ?
      `pipe ${addr}` :
      `port ${addr.port}`
   console.log(`Server is listening on port ${port}-${bind}. Running version ${project.version}`)
}

/**
 * Add socket.io.
 */

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

export default server
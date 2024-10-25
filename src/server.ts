/* eslint-disable no-console */
import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    // origin: config.frontend_url as string,
  },
});

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    // Socket.IO connection handler
    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);

      // Listen for user registration
      socket.on('register', (userId) => {
        socket.join(userId?.toString());
        console.log(`${userId} has joined the room`);
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
      });
    });

    httpServer.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

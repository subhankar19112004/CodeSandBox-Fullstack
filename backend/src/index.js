import express from 'express';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/index.js';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'node:http';


const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

io.on('connection', (socket) => {
    console.log('A verified user has connected');
})

 
app.use('/api', apiRouter)

app.get('/ping', (req, res) => {
    return res.status(200).json({ message: 'pong' }); 
}); 

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})


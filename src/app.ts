import express, { Request, Response } from 'express';
import { router } from './routes/authRouter';
import { connectDB } from './config/db';
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();
const port = 4000;

// Middleware to parse JSON requests
app.use(express.json());

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true  
}))

app.use("/auth", router)
// Simple GET route

app.get('/ping', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

connectDB();

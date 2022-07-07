import dotenv from 'dotenv';
import express from 'express';
// import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

import postRouter from './routes/posts.js';
import userRouter from './routes/users.js';
import authRouter from './routes/auth.js';

const app = express();
dotenv.config();

app.use(compression());
app.use(helmet())

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) =>{
    res.send('Hello memories API')
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error));

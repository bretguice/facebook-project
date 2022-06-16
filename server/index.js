import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRouter from './routes/posts.js';
import userRouter from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(cors());

app.use('/posts', postRouter);
app.use('/user', userRouter);

app.get('/', (req, res) =>{
    res.send('Hello memories API')
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error));

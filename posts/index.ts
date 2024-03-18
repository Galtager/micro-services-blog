import express, { Express, Request, Response } from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from 'cors'
import axios from "axios";

import { IPost } from '../types'


const app: Express = express();
app.use(bodyParser.json());
app.use(cors())

const posts: IPost[] = [];

app.get('/posts', (req: Request, res: Response) => {
    res.send(posts)
})

app.post('/posts', async (req: Request, res: Response) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    const newPost: IPost = { id, title, comments: [] }
    posts.push(newPost);

    await axios.post("http://event-bus-srv:4005/events", {
        type: "postCreated",
        data: newPost
    })
    res.status(201).send(newPost);
});

app.post('/events', (req: Request, res: Response) => {
    console.log("Recieved Event ", req.body.type);
    res.send({})
})

app.listen(4000, () => {
    console.log("v50")
    console.log("Listenning in 4000")
})
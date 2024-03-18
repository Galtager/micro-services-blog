import express, { Express, Request, Response } from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from 'cors'
import axios from "axios";

import { BlogEvent, IComment } from '../types'

const app: Express = express();
app.use(bodyParser.json());
app.use(cors())

const comments: IComment[] = [];

app.post('/posts/:id/comments', async (req: Request, res: Response) => {
    const id = randomBytes(4).toString('hex');
    const { text } = req.body;
    const postID = req.params.id;
    const newComment: IComment = { id, postID, text, status: 'pending' }
    comments.push(newComment);

    await axios.post("http://event-bus-srv:4005/events", {
        type: "commentCreated",
        data: newComment
    });

    res.status(201).send(newComment);
})

app.post('/events', async (req: Request, res: Response) => {
    const { data, type } = req.body as BlogEvent
    console.log("Recieved Event ", type);
    console.log("Recieved Data ", data);

    if (type === "commentModerated") {
        const { id, status } = data as IComment
        comments.forEach(comment => {
            if (comment.id = id) {
                comment.status = status;
            }
        });
        console.log("saving  commentModerated in list", comments)
        await axios.post("http://event-bus-srv:4005/events", {
            type: "commentUpdated",
            data
        });

    }
    res.send({})
})


app.listen(4001, () => {
    console.log("Listenning in 4001")
})
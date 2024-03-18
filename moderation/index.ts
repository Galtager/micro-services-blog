import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import { BlogEvent, IComment, CommentStatus } from '../types'
import axios from "axios";

const app: Express = express();
app.use(bodyParser.json());
app.use(cors())



app.post('/events', async (req: Request, res: Response) => {
    const { data, type } = req.body as BlogEvent
    if (type === "commentCreated") {
        const comment = data as IComment;
        const status: CommentStatus = comment.text.includes('orange') ? 'rejected' : 'approved';
        console.log("commentModerated status to - ", comment.text, status)
        await axios.post("http://event-bus-srv:4005/events", {
            type: "commentModerated",
            data: { ...comment, status }
        });
    }
    res.send({})
})


app.listen(4003, () => {
    console.log("Listenning in 4003")
})
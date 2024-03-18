import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import { BlogEvent, EventType, IComment, IPost } from '../types'
import axios from "axios";

type EventData = IPost | IComment


const app: Express = express();
app.use(bodyParser.json());
app.use(cors())

const posts: IPost[] = [];

const handleEvent = (data: EventData, type: EventType) => {
    if (type === "postCreated") {
        const { id, title } = data as IPost;
        posts.push({ id, title, comments: [] })
    }
    if (type === "commentCreated") {
        const comment = data as IComment
        posts.forEach(post => {
            if (post.id === comment.postID) {
                post.comments.push(comment)
            }
        })
    }
    if (type === "commentUpdated") {
        const { postID, id, status, text } = data as IComment
        posts.forEach(post => {
            if (post.id === postID) {
                post.comments.forEach(comment => {
                    if (comment.id === id) {
                        comment.status = status;
                        comment.text = text;

                    }
                });
            }
        })
    }

}
app.get('/posts', (req: Request, res: Response) => {
    res.send(posts)
})

app.post('/events', async (req: Request, res: Response) => {
    const { data, type } = req.body as BlogEvent
    const events = await axios.get("http://event-bus-srv:4005/events");
    events.data.forEach((event: BlogEvent) => {
        console.log("proccesing event ", event.type)
        handleEvent(event.data, event.type);
    })

    handleEvent(data, type)
    res.send({})
})

app.listen(4002, async () => {
    console.log("Listenning in 4002");
})
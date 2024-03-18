import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import axios from 'axios'
import { BlogEvent } from '../types'
const app: Express = express();
app.use(bodyParser.json());
app.use(cors())

const events: BlogEvent[] = []

app.post('/events', (req: Request, res: Response) => {
    const event = req.body;
    event.push(event);
    axios.post('http://posts-clusterip-srv:4000/events', event);
    // axios.post('http://localhost:4001/events', event);
    // axios.post('http://localhost:4002/events', event);
    // axios.post('http://localhost:4003/events', event);

    res.send({ status: 'OK' })
})

app.get('/events', (req: Request, res: Response) => {
    res.send(events)
})
app.listen(4005, () => {
    console.log("Listenning in 4005")
})
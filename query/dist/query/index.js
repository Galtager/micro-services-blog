"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const posts = [];
const handleEvent = (data, type) => {
    if (type === "postCreated") {
        const { id, title } = data;
        posts.push({ id, title, comments: [] });
    }
    if (type === "commentCreated") {
        const comment = data;
        posts.forEach(post => {
            if (post.id === comment.postID) {
                post.comments.push(comment);
            }
        });
    }
    if (type === "commentUpdated") {
        const { postID, id, status, text } = data;
        posts.forEach(post => {
            if (post.id === postID) {
                post.comments.forEach(comment => {
                    if (comment.id === id) {
                        comment.status = status;
                        comment.text = text;
                    }
                });
            }
        });
    }
};
app.get('/posts', (req, res) => {
    res.send(posts);
});
app.post('/events', (req, res) => {
    const { data, type } = req.body;
    handleEvent(data, type);
    res.send({});
});
app.listen(4002, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Listenning in 4002");
    const events = yield axios_1.default.get("http://event-bus-srv:4005/events");
    events.data.forEach((event) => {
        console.log("proccesing event ", event.type);
        handleEvent(event.data, event.type);
    });
}));

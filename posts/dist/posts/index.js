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
const crypto_1 = require("crypto");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const posts = [];
app.get('/posts', (req, res) => {
    res.send(posts);
});
app.post('/posts/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, crypto_1.randomBytes)(4).toString('hex');
    const { title } = req.body;
    const newPost = { id, title, comments: [] };
    posts.push(newPost);
    yield axios_1.default.post("http://event-bus-srv:4005/events", {
        type: "postCreated",
        data: newPost
    });
    res.status(201).send(newPost);
}));
app.post('/events', (req, res) => {
    console.log("Recieved Event ", req.body.type);
    res.send({});
});
app.listen(4000, () => {
    console.log("v50");
    console.log("Listenning in 4000");
});

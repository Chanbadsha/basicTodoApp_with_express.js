"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
const filePath = path_1.default.join(__dirname, "../../db/todos.json");
app.get('/', (req, res) => {
    res.send("Welcome to todo Server using Express JS");
});
// Get all todos
app.get('/todos', (req, res) => {
    const todos = fs_1.default.readFileSync(filePath, { encoding: 'utf-8' });
    console.log(todos);
    res.send('This is all todos route');
});
// Get single todo
app.get('/todo', (req, res) => {
    res.send('This is todo route');
});
// Create todo
app.post('/createTodo', (req, res) => {
    const todo = req.body;
    console.log(todo);
    res.send('This is create todo routes');
});
exports.default = app;

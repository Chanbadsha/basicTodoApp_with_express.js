"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const todosRoute_1 = __importDefault(require("./todos/todosRoute"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// use express router 
app.use("/todos", todosRoute_1.default);
const filePath = path_1.default.join(__dirname, "../../db/todos.json");
// app.get('/', (req : Request, res : Response)=>{
//     res.send("Welcome to todo Server using Express JS")
// })
// Get all todos
// app.get('/todos', (req: Request, res: Response)=>{
// const todos = fs.readFileSync(filePath,{encoding:'utf-8'})
// console.log(todos)
//  res.send('This is all todos route')
// })
// Get single todo
// app.get('/todos/todo/:id', (req: Request, res: Response)=>{
//     const idQuery = req.query
//     console.log(idQuery)
// const id = req.params
// console.log(id)
//   res.send('This is todo route')
// })
// Create todo
// app.post('/createTodo', (req: Request, res: Response)=>{
//     const todo  = req.body
//     console.log(todo)
//   res.send('This is create todo routes')
// })
// Express Routing with Express Router
// todosRouter.get('/all-todos',(req:Request,res:Response)=>{
//     res.send("Msg from todosRouter")
// })
// Normal Routing
// app.get('/todos/all-todos',(req:Request,res:Response)=>{
//     res.send('Msg from normal router')
// })
// Create Custome Middleware
app.get('/', (req, res, next) => {
    console.log("this is from custome midleware");
    next();
}, (req, res) => {
    res.send("I am from custome midleware");
});
exports.default = app;

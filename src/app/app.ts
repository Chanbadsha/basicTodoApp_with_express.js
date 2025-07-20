
import express, { Application, Request, Response } from 'express'
import fs from "fs"
import path from 'path'
import todosRouter from './todos/todosRoute'

const app : Application = express()
// Middleware
app.use(express.json())

// Create todos router with express router
// const todosRouter = express.Router()

// use express router 
// app.use("/todos",todosRouter)


const filePath = path.join(__dirname,"../../db/todos.json")

app.get('/', (req : Request, res : Response)=>{
    res.send("Welcome to todo Server using Express JS")
})

// Get all todos
app.get('/todos', (req: Request, res: Response)=>{
const todos = fs.readFileSync(filePath,{encoding:'utf-8'})
console.log(todos)
 res.send('This is all todos route')
})
// Get single todo
app.get('/todos/todo/:id', (req: Request, res: Response)=>{
    const idQuery = req.query
    console.log(idQuery)
const id = req.params
console.log(id)
   
  res.send('This is todo route')
})
// Create todo
app.post('/createTodo', (req: Request, res: Response)=>{
    const todo  = req.body
    console.log(todo)
  res.send('This is create todo routes')
})


// Express Routing with Express Router
todosRouter.get('/all-todos',(req:Request,res:Response)=>{
    res.send("Msg from todosRouter")
})


// Normal Routing

app.get('/todos/all-todos',(req:Request,res:Response)=>{
    res.send('Msg from normal router')
})


export default app

import express, { Application, Request, Response } from 'express'
import fs from "fs"
import path from 'path'
import { URL } from 'url'
const app : Application = express()
// Middleware
app.use(express.json())


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
app.get('/todo', (req: Request, res: Response)=>{
   
  res.send('This is todo route')
})
// Create todo
app.post('/createTodo', (req: Request, res: Response)=>{
    const todo  = req.body
    console.log(todo)
  res.send('This is create todo routes')
})


export default app
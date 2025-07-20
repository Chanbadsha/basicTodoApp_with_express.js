import express, { Application, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
const app : Application = express()

app.use(express.json())

const filePath = path.join(__dirname,"../../../db/todos.json")

const todosRouter = express.Router()

todosRouter.get('/', (req: Request, res: Response) => {
    const todos = fs.readFileSync(filePath,{encoding:"utf-8"})
res.send({
    msg:'Msg from todosRouter from different file',
    todos
})
})

todosRouter.get('/todo/:id',(req:Request,res:Response)=>{

    res.send({
        msg: "Msg from todosRouter from diffrent file , Single Todo"
    })
})



export default todosRouter
import express, { Application, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { client } from '../config/mongodb'
import { ObjectId } from 'mongodb'

const app: Application = express()

app.use(express.json())

const filePath = path.join(__dirname, "../../../db/todos.json")

const todosRouter = express.Router()

// Find ALl todos
todosRouter.get('/', async(req: Request, res: Response) => {
    // const todos = fs.readFileSync(filePath, { encoding: "utf-8" })
    // res.send({
    //     msg: 'Msg from todosRouter from different file',
    //     todos
    // })

    const db = await client.db("todosDB")
    const todos = await db.collection('todos').find().toArray()

        res.json({
        msg: 'Msg from todosRouter from different file',
        todos
    })
})

// Find one todo
todosRouter.get('/todo/:id', async (req: Request, res: Response) => {
    const id = req.params.id
   
    const db = await client.db('todosDB')
    const todo = await db.collection('todos').findOne({ _id: new ObjectId(id) })
if (todo) {
  res.json({
    statusCode: 200,
    message: 'Todo fetched successfully',
    data: todo,
  });
} else {
  res.json({
    statusCode: 404,
    message: 'Todo not found',
  });
}
})

// Create todo with mongodb
todosRouter.post('/createTodo', async (req, res) => {
    const todoData = req.body
    const db = await client.db('todosDB')
    const collection = await db.collection('todos').insertOne(todoData)
    if (collection.acknowledged) {
        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'Todo inserted successfully.',
            insertedId: collection.insertedId
        });
    }
    return res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Failed to insert todo. Please try again later.'
    });


})

// Delete Todo with mongodb
todosRouter.delete('/deleteTodo/:id', async(req:Request,res:Response)=>{
  const id = req.params.id

  const filter = {_id:new ObjectId(id)}
  const db = await client.db("todosDB")
  // console.log(filter)
  const deletedTodo = await db.collection('todos').deleteOne(filter)
  console.log(deletedTodo)
if (deletedTodo.deletedCount === 1) {
   return res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'Todo deleted successfully.'
        });
} else {
   return res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Failed to delete todo. Please try again later.'
    });

}
})


// Const update todo in mongodb
todosRouter.put('/updateTodo/:id',async(req:Request,res:Response)=>{
  const {title,completed,priority,description} = req.body
  // console.log(updateData)
  const id = req.params.id
  const filter = {_id: new ObjectId(id)}
  const updateDoc ={
    title,
    completed,
    priority,
    description,

  }
  const db = await client.db('todosDB')
  const updateTodo = await db.collection("todos").updateOne(filter,{$set:updateDoc},{upsert:true})

  if (updateTodo.modifiedCount === 1) {
   return res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'Todo updated successfully.'
        });
} else {
   return res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Failed to update todo. Please try again later.'
    });

}


})

export default todosRouter
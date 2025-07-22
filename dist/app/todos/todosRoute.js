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
const path_1 = __importDefault(require("path"));
const mongodb_1 = require("../config/mongodb");
const mongodb_2 = require("mongodb");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const filePath = path_1.default.join(__dirname, "../../../db/todos.json");
const todosRouter = express_1.default.Router();
// Find ALl todos
todosRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const todos = fs.readFileSync(filePath, { encoding: "utf-8" })
    // res.send({
    //     msg: 'Msg from todosRouter from different file',
    //     todos
    // })
    const db = yield mongodb_1.client.db("todosDB");
    const todos = yield db.collection('todos').find().toArray();
    res.json({
        msg: 'Msg from todosRouter from different file',
        todos
    });
}));
// Find one todo
todosRouter.get('/todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongodb_1.client.db('todosDB');
    const todo = yield db.collection('todos').findOne({ _id: new mongodb_2.ObjectId(id) });
    if (todo) {
        res.json({
            statusCode: 200,
            message: 'Todo fetched successfully',
            data: todo,
        });
    }
    else {
        res.json({
            statusCode: 404,
            message: 'Todo not found',
        });
    }
}));
// Create todo with mongodb
todosRouter.post('/createTodo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoData = req.body;
    const db = yield mongodb_1.client.db('todosDB');
    const collection = yield db.collection('todos').insertOne(todoData);
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
}));
// Delete Todo with mongodb
todosRouter.delete('/deleteTodo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const filter = { _id: new mongodb_2.ObjectId(id) };
    const db = yield mongodb_1.client.db("todosDB");
    // console.log(filter)
    const deletedTodo = yield db.collection('todos').deleteOne(filter);
    console.log(deletedTodo);
    if (deletedTodo.deletedCount === 1) {
        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'Todo deleted successfully.'
        });
    }
    else {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Failed to delete todo. Please try again later.'
        });
    }
}));
// Const update todo in mongodb
todosRouter.put('/updateTodo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, completed, priority, description } = req.body;
    // console.log(updateData)
    const id = req.params.id;
    const filter = { _id: new mongodb_2.ObjectId(id) };
    const updateDoc = {
        title,
        completed,
        priority,
        description,
    };
    const db = yield mongodb_1.client.db('todosDB');
    const updateTodo = yield db.collection("todos").updateOne(filter, { $set: updateDoc }, { upsert: true });
    if (updateTodo.modifiedCount === 1) {
        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'Todo updated successfully.'
        });
    }
    else {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Failed to update todo. Please try again later.'
        });
    }
}));
exports.default = todosRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const filePath = path_1.default.join(__dirname, "../../../db/todos.json");
const todosRouter = express_1.default.Router();
todosRouter.get('/', (req, res) => {
    const todos = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    res.send({
        msg: 'Msg from todosRouter from different file',
        todos
    });
});
todosRouter.get('/todo/:id', (req, res) => {
    res.send({
        msg: "Msg from todosRouter from diffrent file , Single Todo"
    });
});
exports.default = todosRouter;

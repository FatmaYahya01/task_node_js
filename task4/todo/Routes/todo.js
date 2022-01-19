const express = require("express");
const { Todo, validateTodo } = require("../models/todo");
const { catchAsyncErrors } = require("../middleware")

const router = express.Router();

router.get("/", catchAsyncErrors(async (req, res, next) => {
    const todos = await Todo.find();
    res.json(todos);
}));

router.get("/:id", catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "user not found" })
    res.json(todo);
}));

router.delete("/:id", catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    //=> if user not present send 404
    const todo = await Todo.findByIdAndDelete(id);
    res.json(todo);
}));

router.put("/:id", catchAsyncErrors(async (req, res, next) => {
    const { error } = validateTodo(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message })
    const { id } = req.params;
    const { value } = req.body;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "user not found" })
    todo.value = value;
    await todo.save();
    res.json(todo);
}));

router.post("/",catchAsyncErrors(async (req, res, next) => {
    const { error } = validateTodo(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message })
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.json(newTodo);
}));

module.exports = router;

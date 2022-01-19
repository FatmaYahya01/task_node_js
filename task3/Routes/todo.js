
const express=require("express");
const Todo = require("../models/todo");
const router = express.Router();

router.get("/",async(req,res)=>{

    const todos = await Todo.find();
    res.json(todos)
})

router.post("/",async(req,res)=>{

    const {value} = req.body
    const todo = new Todo({value});
    await todo.save()
   
    res.json(todo)
})
module.exports = router
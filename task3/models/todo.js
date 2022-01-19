const mongoose=require("mongoose");
const todoSchema = new mongoose.Schema({
    value:String
});
const todo = mongoose.model("todo",todoSchema);
module.exports = todo;

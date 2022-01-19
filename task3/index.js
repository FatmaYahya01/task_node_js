const mongoose = require("mongoose");
const express = require("express");
const userRouter = require("./Routes/user");
const todoRouter = require("./Routes/todo");

const { logger } = require("./middleware");

const app = express();

//Middleware
app.use(express.json());
app.use(logger);
// app.use(auth);
app.use("/users", userRouter);
app.use("/todos", todoRouter);

mongoose
    .connect("mongodb://localhost:27017/mydb")
    .then(() => {
        app.listen(3000, () => {
            console.log("server running on port 3000");
        });
        console.log("successfully connected with the database")
    })
    .catch(() => {
        console.log("error connecting to mongodb");
    });


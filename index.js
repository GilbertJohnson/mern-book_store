import express from "express"
import mongoose from "mongoose"
import booksroutes from "./routes/books.js"
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
/**
 *      App config
 */
const PORT = process.env.PORT || 5500;
const mdbb_conn_str = process.env.CONN_STR_MDB;
const app = express()

app.listen(PORT,()=>{
    console.log(`App is running at port : ${PORT}`)
})

// middleware for parsing request body
app.use(express.json())

// middleware for cors
app.use(cors())
// app.use(cors({
//     origin:"http://localhost:5500",
//     methods:["GET","POST","PUT","DELETE"],
//     allowedHeaders: ["Content-Type"]
// }))

app.get("/",(request,response)=>{
    console.log(request)
    return response.status(202).send("You got this")
})

//      Books routes
app.use("/books",booksroutes)



mongoose.connect(mdbb_conn_str).then(()=>{
    console.log("Connected to mongodb")
}).catch((err)=>{
    console.log(err)
})
import express from "express"
import { Book } from "../models/book.js"
// Express Router

const router = express.Router();

// post method to save a book
router.post("/", async (req,res)=>{
    try {
        if(
            !req.body.title||!req.body.author||!req.body.publishYear
        ){
            return res.status(400).send({message:"Not all parameters have been passed"})
        }
        const newbook = {title : req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book = await Book.create(newbook)
        return res.status(201).send(book)

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})

// get method to get all books
router.get('/',async (req,res)=>{
    try {
        const books = await Book.find({});
        res.status(200).json({
            len: books.length,
            books: books})
    } catch (error) {
        console.log(`Error : get : ${error}`)
        res.status(500).send({message:error.message})
    }
})

// get one book where id = given id
router.get('/:id',async (req,res)=>{
    try {
        let {id} = req.params;
        const books = await Book.findById(id);
        res.status(201).json({
            length: books.length,
            book: books})
    } catch (error) {
        console.log(`Error : get : ${error}`)
        res.status(500).send({message:error.message})
    }
})
// update book
router.put('/:id',async (req,res) => {
    try {
        if(
            !req.body.title||!req.body.author||!req.body.publishYear
        ){
            return res.status(400).send({message:"Insufficient data"})
        }
        let {id} = req.params;
        const fromdb = await Book.findByIdAndUpdate(id,req.body);
        if(fromdb){
            return res.status(200).send({message: "Updated book successfully"})
        }else{
            return res.status(400).send({message:"Book not found"})
        }
    } catch (error) {
        console.log(`Error : put : ${error.message}`)
        res.status(500).send({message:error.message})
    }
})

router.delete("/:id",async (req,res) => {
    try {
        let {id} = req.params;
        let fromdb = await Book.findByIdAndDelete(id)
        if (!fromdb) {
            return res.status(400).send({message:"Book not found"})
        } 
        return res.status(200).send({message:"Book deleted"})
    } catch (error) {
        console.log(`Error : delete :${error.message}`)
        res.status(500).send({message:error.message})
    }
})

export default router;
const express = require("express")
const mongoose = require("mongoose")
const Product = require("./models/productModel")
const app = express()


app.use(express.json())
//routes

app.get('/',(req, res) => {
    res.send("hello NODE API")
} )

app.get('/blog',(req, res) => {
    res.send("hello blog")
} )

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

app.put('/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: 'cannot find ID ${id}'})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.delete('/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: 'cannot find ID ${id}'})
        }
        res.status(200).json({message: "product deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


mongoose.connect("mongodb+srv://arkkam:Arkkam@appapi.8a4x73k.mongodb.net/Node-API?retryWrites=true&w=majority")
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=>{
        console.log('APP is running on port 3000')
    })
   
}).catch((error) => {
    console.log(error)
})
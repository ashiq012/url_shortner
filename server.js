import express, { urlencoded } from "express";
import mongoose from "mongoose";
import { shortUrl } from "./controller/url.js";
import { Url } from "./model/urlDB.js";
import { config } from "dotenv";

const app = express();
//middleware to use url data
app.use(express.urlencoded({extended:true}))
//parsing data
app.use(express.json())
config({path:".env"})
//db connect 

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Database is connected")
}) 
.catch((er) => {
    console.log(er.message)
})

app.get('/',(req,res) => {
    res.render('index.ejs',{shortUrl:null})
})

app.post('/short',shortUrl)

app.get('/:short',async(req,res) => {
    const shortCode = req.params.short
    
    const original = await Url.findOne({shortCode});
    if(original){
    res.redirect(original.longUrl);
    }
    else{
        res.json({
            message:'invalid url'
        })
    }

})
app.listen(process.env.PORT,() => {
    console.log('sever started at port number 3000');
})

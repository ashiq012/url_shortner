import mongoose from 'mongoose'

let urlSchema = new mongoose.Schema({
    longUrl:String,
    shortCode:String
})

export const Url = mongoose.model("urlDatabase",urlSchema);
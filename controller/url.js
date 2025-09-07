import shortid from "shortid";
import { Url } from "../model/urlDB.js";
export const shortUrl = async(req,res) =>{
    const longUrl = req.body.longUrl;
    const shortCode = shortid.generate();
    const newUrl = new Url({shortCode,longUrl})
    await newUrl.save();
    const shortUrl = `https://url-shortner-1-9snj.onrender.com/${shortCode}`
    res.render('index.ejs',{shortUrl})

}

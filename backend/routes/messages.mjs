import express from 'express';
import db from '../dbFile.mjs';
import { nanoid } from 'nanoid';
import * as path from "path";
import multer from 'multer';
import config from '../config.mjs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
})

const upload = multer({storage})

const router = express.Router();

router.get('/', (req,res)=> {
   const messages =  db.getItems();
   res.send(messages);
})

router.post("/", upload.single('image'), (req,res)=> {
    if(req.body.message !== ''){
        const body = {id:nanoid(),...req.body};
        if(req.file){
            body.image = req.file.filename;
        } 
        db.addItem(body);
        res.send(body)
    } else {
        res.status(400).send({"error": "Author and message must be present in the request"})
    }
    
  })


export default router;  
import express from "express";
import mongoose from'mongoose';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
// import { validationResult } from 'express-validator';
import cors from 'cors'
c
import jwt from "jsonwebtoken";
import isAuth from './server/utils/checkAuth.js'
import User from "./models/User.js";
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'
import Post from "./models/Post.js";
import fileUpload from 'express-fileupload'

dotenv.config()

const PORT = process.env.PORT || 3001
const NAME = process.env.DB_NAME
const USER = process.env.DB_USER
const PASSWORD = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.vehvwxj.mongodb.net/${NAME}?retryWrites=true&w=majority`).then(()=>{
    console.log("DB Okey")
}).catch((err)=> console.log('DB error', err));

const app = express();

app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('/server/uploads'))


app.post('/registration', async (req, res)=>{
    try{
        const email= req.body.email
        const password = req.body.password

        const isUsed = await UserModel.findOne({email})
        if (isUsed) {
            return res.json({message:"this email is zanyat"})
        }

        // const salt = await bcrypt.genSalt(10)
        // const hash = await bcrypt.hash(password, salt)
        const user = new UserModel({
            email,
            passwordHash:password
        })


        const token = jwt.sign({
            _id:user._id,
        }, "lol")

        await user.save()

        res.json({user, token, message:"success"})

    }catch(err){
        console.log(err);
        res.status(500).json({message:"error on registration"})
    }
})

app.post('/login', async (req, res)=>{
    try{
        const email= req.body.email
        const password = req.body.password

        const user = await UserModel.findOne({email})
        if(!user){
            return res.json({message:"this email wasnt found"})
        }
        
        // const isPass = await bcrypt.compare(password, user.passwordHash)
        const isPass = user.passwordHash===password?true:false
        if (!isPass){
            return res.json({message:"wrong password"})
        }
        const token = jwt.sign({
            _id:user._id,
        }, "lol")
        
        res.json({user, token, message:"succes"})

    }catch(err){
        res.json({message:"error on login"})
    }
})

app.get('/getme', isAuth, async (req, res)=>{
    try{
        const user = await UserModel.findById(req.userId)
        if(!user){
            return res.status(400).json({message:"this token is uncorrect"})
        }

        const token = jwt.sign({
            _id:user._id,
        }, "lol")

        res.json({user, token})

    }catch(err){
        res.status(500).json({message:"error on login"})
    }
})

app.post('/posts', isAuth, async(req, res)=>{
    try {
        const {title, text} = req.body
        const user = await User.findById(req.userId)
        if(req.files){
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))

            req.files.image.mv(path.join(__dirname,'client','src', 'uploads', fileName))
            // console.log((path.join(__dirname,'client','src', 'uploads', fileName)));

            const newPostWithImage = new Post({
                username:user.email,
                title,
                text,
                imgUrl:fileName,
                author:req.userId
            })

            await newPostWithImage.save()
            await User.findOneAndUpdate(req.userId, {
                $push:{posts:newPostWithImage}
            })

            return res.json(newPostWithImage)
        }
        const newPostWithOutImage = new Post({
            username:user.email,
            title,
            text,
            imgUrl:'',
            author:req.userId
        })

        await newPostWithOutImage.save()
        await User.findOneAndUpdate(req.userId,{
            $push:{posts:newPostWithOutImage}
        })
        res.json(newPostWithOutImage)
    } catch (error) {
        res.json({message:"error on post"})
    }
})

app.get('/posts', isAuth, async(req, res)=>{
    try {
        const posts = await Post.find()
        const popularPosts = await Post.find().limit(5).sort('-views')
        if(!posts){
            return res.json({message:"posts were not found"})
        }
        res.json({posts, popularPosts})
    } catch (error) {
        res.json({message:"error on getPosts"})
    }
})

app.get('/post/:id', isAuth, async(req,res)=>{
    try {
        // const post = Post.findByIdAndUpdate(req.params.id, {
        //     $inc:{views : 1}
        // })
        const post = await Post.findById(req.params.id)
        res.json(post)
    } catch (error) {
        res.json({message:"error on getPostById"})
    }
})



app.listen(PORT,(err)=>{
    if(err){
        return console.log(err);
    }
    console.log("ok")
});

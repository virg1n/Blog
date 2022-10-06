import express from "express";
import mongoose from'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import jwt from "jsonwebtoken";
import UserModel from './models/User.js'
import isAuth from './utils/checkAuth.js'
import JuryModel from './models/Jury.js'
import ApplicationModel from './models/Application.js'
import checkRole from './utils/checkRole.js'
import AdminModel from './models/Admin.js'
import ScoreModel from './models/Score.js'

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
app.use(express.json())


app.post('/user/registration', async (req, res)=>{
    try{
        const email = req.body.email
        const password = req.body.password
        const IIN = req.body.iin
        const number = req.body.number
        const FIO = req.body.FIO

        const isUsed = await UserModel.findOne({email})
        if (isUsed) {
            return res.json({message:"Данная электронная почта уже занята"})
        }
        const user = new UserModel({
            email,
            password,
            IIN,
            number,
            FIO
        })
        const token = jwt.sign({
            _id:user._id,
        }, "lol")
        await user.save()
        res.json({user, token, message:"success"})
    }catch(err){
        console.log(err);
        res.json({message:"error on registration"})
    }
})

app.post('/user/login', async (req, res)=>{
    try{
        const email = req.body.email
        const password = req.body.password
        const user = await UserModel.findOne({email})
        if(!user){
            return res.json({message:"this email wasnt found"})
        }
        
        // const isPass = await bcrypt.compare(password, user.passwordHash)
        const isPass = user.password===password?true:false
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

app.post('/jury/registration', async (req, res)=>{
    try{
        const email = req.body.email
        const password = req.body.password

        const isUsed = await JuryModel.findOne({email})
        if (isUsed) {
            return res.json({message:"Данная электронная почта уже занята"})
        }
        const user = new JuryModel({
            email,
            password,
            id:5
        })
        const token = jwt.sign({
            _id:user._id,
        }, "lol")
        await user.save()
        res.json({user, token, message:"success"})
    }catch(err){
        console.log(err);
        res.json({message:"error on registration"})
    }
})

app.post('/jury/login', async (req, res)=>{
    try{
        const email = req.body.email
        const password = req.body.password

        const user = await JuryModel.findOne({email})
        if(!user){
            return res.json({message:"this email wasnt found"})
        }
        
        // const isPass = await bcrypt.compare(password, user.passwordHash)
        const isPass = user.password===password?true:false
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

app.post('/admin/registration', async (req, res)=>{
    try{
        const email = req.body.email
        const password = req.body.password
        const user = new AdminModel({
            email,
            password
        })
        const token = jwt.sign({
            _id:user._id,
        }, "lol")
        await user.save()
        res.json({user, token, message:"success"})
    }catch(err){
        console.log(err);
        res.json({message:"error on registration"})
    }
})

app.post('/admin/login', async (req, res)=>{
    try{
        const email = req.body.email
        const password = req.body.password

        const user = await AdminModel.findOne({email})
        if(!user){
            return res.json({message:"this email wasnt found"})
        }
        
        // const isPass = await bcrypt.compare(password, user.passwordHash)
        const isPass = user.password===password?true:false
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

app.get('/user/getme', isAuth, async (req, res)=>{
    try{
        const user = await UserModel.findById(req.userId)
        if(!user){
            return res.json({message:"this token is uncorrect"})
        }

        const token = jwt.sign({
            _id:user._id,
        }, "lol")

        res.json({user, token})

    }catch(err){
        console.log(err);
        res.json({message:"error on login"})
    }
})

app.post('/user/application', isAuth, async(req, res)=>{
    try {
        const title = req.body.title
        const text = req.body.text
        const user = await UserModel.findById(req.userId)
        const newApplication = new ApplicationModel({
            username:user.email,
            title,
            text,
            author:req.userId
        })

        // const isJury = await JuryModel.findById(req.userId)

        await newApplication.save()
        await UserModel.findOneAndUpdate(req.userId,{
            $push:{applications:newApplication}
        })
        res.json({newApplication, message:"success"})
    } catch (error) {
        res.json({message:"error on newApplication"})
        console.log(error);
    }
})

app.get('/jury/applications', checkRole, async(req, res)=>{
    try {
        const applications = await ApplicationModel.find()
        if(!applications){
            return res.json({message:"applications were not found"})
        }
        res.json({applications, role:req.userRole})
    } catch (error) {
        res.json({message:"error on getPosts"})
        console.log(error);
    }
})

app.get('/applications/:id', checkRole, async(req,res)=>{
    try {
        const application = await ApplicationModel.findById(req.params.id)
        const scores = []
        if (!application){
            return res.json({message:"Applications were not found"})
        }
        const scoreId = application.Scores
        
        for (let i = 0; i < scoreId.length; i++) {
            let a = await ScoreModel.findById(scoreId[i])
            scores[i] = a
        }

        res.json({application, scores})
    } catch (error) {
        console.log(error);
        res.json({message:"error on getApplicationById"})
    }
})

app.post('/applications/:id', isAuth, checkRole, async(req,res)=>{
    try {
        const postId = req.params.id
        const application = await ApplicationModel.findById(req.params.id)
        if (!application){
            return res.json({message:"Applications were not found"})
        }

        const scoreIdea = req.body.scoreIdea
        const scoreActual = req.body.scoreActual
        const scoreRealisation = req.body.scoreRealisation
        const jurysName = await JuryModel.findById(req.userId)

        const Score = new ScoreModel({ username:jurysName.email, scoreIdea, scoreActual, scoreRealisation})
        await Score.save()

        try {
            await ApplicationModel.findByIdAndUpdate(postId, {
                $push: { Scores: Score._id },
            })
        } catch (error) {
            console.log(error)
        }
        res.json(Score)
    } catch (error) {
        res.json({message:"error on getApplicationById"})
    }
})

app.listen(PORT,(err)=>{
    if(err){
        return console.log(err);
    }
    console.log("ok")
});
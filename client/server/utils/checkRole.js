import jwt from 'jsonwebtoken'
import JuryModel from '../models/Jury.js'
import AdminModel from '../models/Admin.js'

export default async (req, res, next)=>{
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if(token){
        try {
            const decoded = jwt.verify(token, 'lol')
            const id = decoded._id
            const isJury = await JuryModel.findById(id)
            const isAdmin = await AdminModel.findById(id)
            if (isJury || isAdmin){
                req.isRole = true
                next()
            }
    } catch (error) {
        res.json({message:"error on role"})
    }
}
    else{
        return res.json({message:"You are not a jury"})
    }
}
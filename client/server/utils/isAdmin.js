import jwt from 'jsonwebtoken'
import AdminModel from '../models/Jury.js'

export default async (req, res, next)=>{
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if(token){
        try {
            const decoded = jwt.verify(token, 'lol')
            const id = decoded._id
            const isAdmin = await AdminModel.findById(id)
            if (isAdmin){
                req.isAdmin = true
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
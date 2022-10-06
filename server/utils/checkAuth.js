import jwt from 'jsonwebtoken'

export default (req, res, next)=>{
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if(token){
        try {
            const decoded = jwt.verify(token, 'lol')
            req.userId = decoded._id
            next()
    } catch (error) {
        res.json({message:"error"})
    }
}
    else{
        return res.json({message:"wrong token"})
    }
}
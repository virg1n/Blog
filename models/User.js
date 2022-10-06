import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    passwordHash:{
        type:String,
        unique:false,
        required:true
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ]
},
    {timestamps:true}
)

export default mongoose.model("User", UserSchema)
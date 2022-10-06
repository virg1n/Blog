import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    FIO:{
        type:String,
        required:true
    },
    password:{
        type:String,
        unique:false,
        required:true
    },
    number:{
        type:String,
        unique:true,
        required:true
    },
    IIN:{
        type:String,
        unique:true,
        required:true
    },
    applications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Application'
        }
    ]
},
    {timestamps:true}
)

export default mongoose.model("User", UserSchema)
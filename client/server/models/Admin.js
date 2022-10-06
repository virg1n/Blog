import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:false,
        required:true
    }
},
    {timestamps:true}
)

export default mongoose.model("Admin", AdminSchema)
import mongoose from "mongoose";

const JurySchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:false,
        required:true
    },
    id:{
        type:String,
        unique:false,
        required:true
    }
},
    {timestamps:true}
)

export default mongoose.model("Jury", JurySchema)
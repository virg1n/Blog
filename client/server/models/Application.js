import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    username:{type:String, required:true},
    title:{type:String, required:true},
    text:{type:String, required:true},
    author:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    // score:[
    // {0:{scoreIdea:'-', scoreActual:'-',scoreRealisation:'-' }},
    // {1:{scoreIdea:'-', scoreActual:'-',scoreRealisation:'-'}},
    // {2:{scoreIdea:'-', scoreActual:'-',scoreRealisation:'-'}},
    // {3:{scoreIdea:'-', scoreActual:'-',scoreRealisation:'-'}},
    // {4:{scoreIdea:'-', scoreActual:'-',scoreRealisation:'-'}},
    // {5:{scoreIdea:'-', scoreActual:'-',scoreRealisation:'-'}}]
    Scores:[{type:mongoose.Schema.Types.ObjectId, ref:"Score"}]
},
{timestamps:true}
)

export default mongoose.model("Application", ApplicationSchema)
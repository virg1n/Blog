import mongoose from 'mongoose'

const ScoreSchema = new mongoose.Schema(
    {
        username:{type:String, required:true},
        scoreIdea: { type: String, required: true },
        scoreActual: { type: String, required: true },
        scoreRealisation: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true },
)
export default mongoose.model('Score', ScoreSchema)
import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cityPoster:{
        type: String,
        required: true
    },
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "State",
        required: true
    }
   
});

export default mongoose.model("City", citySchema);
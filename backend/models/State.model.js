import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
    stateName: {
        type: String,
        required: true,
    },
    countyName: {
        type: String,
        required: true
    },
    statePoster:{
        type: String,
        required: true
    }
   
});

export default mongoose.model("State", stateSchema);
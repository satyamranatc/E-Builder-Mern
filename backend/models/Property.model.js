import mongoose from "mongoose";
const propertySchema = new mongoose.Schema({
     name: {
          type: String,
          required: true,
     },
     propertyPoster:{
          type: String,
          required: true
     },
     propertyType:{
          type: String,
          enum:["House", "Apartment", "Villa","Plot"],
          required: true

     },
     cityId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "City",
          required: true
     }
    
});

export default mongoose.model("Property", propertySchema);
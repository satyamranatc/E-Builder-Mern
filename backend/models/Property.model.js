import mongoose from "mongoose";
const propertySchema = new mongoose.Schema({
     name: {
          type: String,
          required: true,
     },
     propertyPoster: {
          type: String,
          required: true
     },
     propertyType: {
          type: String,
          enum: ["House", "Apartment", "Villa", "Plot"],
          required: true

     },
     cityId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "City",
          required: true
     },
     price: {
          type: Number,
          required: true,
          min: 0
     },
     description: {
          type: String,
          required: true,
          trim: true
     }

});

export default mongoose.model("Property", propertySchema);
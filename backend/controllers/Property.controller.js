import PropertyModel from "../models/Property.model.js";

export const getAllProperties = async (req, res) => {
   let Properties = await PropertyModel.find().populate("cityId");
   res.json(Properties);
};

export const getPropertyById = async (req, res) => {
   let Property = await PropertyModel.findById(req.params.id).populate("cityId");
   res.json(Property);
};

export const getPropertyByCityId = async (req, res) => {
   let { id } = req.params;
   // console.log(id);
   let Property = await PropertyModel.find({ cityId: id}).populate("cityId");
   res.json(Property);
}

export const createProperty = async (req, res) => {
   let Property = await PropertyModel.create(req.body);
   res.json(Property);
};

export const updateProperty = async (req, res) => {
   let Property = await PropertyModel.findByIdAndUpdate(req.params.id, req.body);
   res.json(Property);
};

export const deleteProperty = async (req, res) => {
   let Property = await PropertyModel.findByIdAndDelete(req.params.id);
   res.json(Property);
};
import CityModel from "../models/City.model.js";

export const getAllCites = async (req, res) => {
   let Cities = await CityModel.find().populate("stateId");
   res.json(Cities);
};

export const getCityById = async (req, res) => {
   let City = await CityModel.findById(req.params.id).populate("stateId");
   res.json(City);
};

export const getCityByStateId = async (req, res) => {
   let id = req.params.id;
   console.log(id);
   let City = await CityModel.find({stateId:id}).populate("stateId");
   res.json(City);
};

export const createCity = async (req, res) => {
   let City = await CityModel.create(req.body);
   res.json(City);
};

export const updateCity = async (req, res) => {
   let City = await CityModel.findByIdAndUpdate(req.params.id, req.body);
   res.json(City);
};

export const deleteCity = async (req, res) => {
   let City = await CityModel.findByIdAndDelete(req.params.id);
   res.json(City);
};
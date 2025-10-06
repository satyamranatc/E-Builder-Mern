import StateModel from "../models/State.model.js";

export const getAllStates = async (req, res) => {
   let states = await StateModel.find();
   res.json(states);
};

export const getStateById = async (req, res) => {
   let state = await StateModel.findById(req.params.id);
   res.json(state);
};

export const createState = async (req, res) => {
   let state = await StateModel.create(req.body);
   res.json(state);
};

export const updateState = async (req, res) => {
   let state = await StateModel.findByIdAndUpdate(req.params.id, req.body);
   res.json(state);
};

export const deleteState = async (req, res) => {
   let state = await StateModel.findByIdAndDelete(req.params.id);
   res.json(state);
};
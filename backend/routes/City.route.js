import {Router} from "express";
import {getAllCites, getCityById,getCityByStateId, createCity, updateCity, deleteCity} from "../controllers/City.controller.js";

const router = Router();

router.get("/", getAllCites);
router.get("/:id", getCityById);
router.get("/by/:id", getCityByStateId);
router.post("/", createCity);
router.put("/:id", updateCity);
router.delete("/:id", deleteCity);

export default router;
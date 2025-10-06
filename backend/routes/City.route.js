import {Router} from "express";
import {getAllCites, getCityById, createCity, updateCity, deleteCity} from "../controllers/City.controller.js";

const router = Router();

router.get("/", getAllCites);
router.get("/:id", getCityById);
router.post("/", createCity);
router.put("/:id", updateCity);
router.delete("/:id", deleteCity);

export default router;
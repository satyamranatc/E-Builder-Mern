import {Router} from "express";
import {getAllProperties, getPropertyById, createProperty, updateProperty, deleteProperty} from "../controllers/Property.controller.js";

const router = Router();

router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.post("/", createProperty);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

export default router;
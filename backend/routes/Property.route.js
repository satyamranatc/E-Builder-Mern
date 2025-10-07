import {Router} from "express";
import {getAllProperties, getPropertyById, createProperty, getPropertyByCityId, updateProperty, deleteProperty} from "../controllers/Property.controller.js";

const router = Router();

router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.get("/by/:id", getPropertyByCityId);
router.post("/", createProperty);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

export default router;
import { Router } from "express";
import {createIncident, viewIncidents, viewIncidentsById, updateIncident} from "../controllers/incidentController.js"
import { protect, authorize } from "../middlewares/authMiddleware.js";

const incidentRoute=Router();

// POST /api/incident/report
incidentRoute.post("/report",protect,createIncident)

// GET /api/incident/view-incident
incidentRoute.get("/view-incidents",protect,viewIncidents)


// PATCH /api/incident/update-incident
incidentRoute.patch("/update-incident",protect,authorize("responder","admin"),updateIncident)

export default incidentRoute
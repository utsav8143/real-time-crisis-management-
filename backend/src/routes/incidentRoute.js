import { Router } from "express";
import {createIncident, viewIncidents, viewIncidentsById, updateIncident} from "../controllers/incidentController.js"
import { protect, authorize } from "../middlewares/authMiddleware.js";

const incidentRoute=Router();

// POST /api/incident/report
incidentRoute.post("/report",protect,createIncident)

// GET /api/incident/view-incident
incidentRoute.get("/view-incidents",protect,viewIncidents)

// GET /api/incidnet/view-incidents/:id
incidentRoute.get("/view-incidents/:id",protect,viewIncidentsById)


// PATCH /api/incident/update-incidents/:id
incidentRoute.patch("/update-incidents/:id",protect,authorize("responder","admin"),updateIncident)

export default incidentRoute
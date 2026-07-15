import { Router } from "express";
import {report, viewIncidents, viewIncidentsById, updateIncident} from "../controllers/incidentController.js"


const incidentRoute=Router();

// POST /api/incident/report
incidentRoute.post("/report",report)

// GET /api/incident/view-incident
incidentRoute.get("/view-incidents",viewIncidents)

// GET /api/incident/view-incident/:id
incidentRoute.get("/view-incidents/:id",viewIncidentsById)

// PATCH /api/incident/update-incident
incidentRoute.patch("/update-incident",updateIncident)

export default incidentRoute
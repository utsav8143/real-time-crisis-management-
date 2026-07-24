import incidentModel from "../models/incidentModel.js";
import userModel from "../models/userModel.js";

//  @desc report incident
// @ROUTE POST/api/incident/report
export async function createIncident(req, res) {
  const { title, description, category, location, reportedBy, coordinates, address } = req.body;

  try {
    if (!coordinates || coordinates.length !== 2) {
      return res
        .status(400)
        .json({ message: "Valid location coordinates are required" });
    }

    const incident = await incidentModel.create({
      title,
      description,
      category,
      location: {
        type: "Point",
        coordinates, //[lng,lat]
        address,
      },
      reportedBy: req.user._id,
    });

    const populate = await incident.populate(
      "reportedBy",
      "name email role",
    );

    res
      .status(201)
      .json({ message: "Incident created successfully", 
         incident });
  } catch (err) {
    res.status(500).json({ message: "Error in creating incident" });
    console.log(err);
  }
}

//  @desc view Incidents
// @ROUTE GET/api/incident/view-incidents
export async function viewIncidents(req, res) {
  try {
    const { status, category, severity } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (severity) filter.severity = severity;

    const incident = await incidentModel
      .find(filter)
      .populate("resportedBy", "name email role")
      .sort({ createdAt: -1 }); //newest first

    res.status(200).json({ message: "Incidents Fetched successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to fetch incidents" });
  }
}

//  @desc view Incidents by ID
// @ROUTE GET/api/incident/view-incidents/:id
export async function viewIncidentsById(req, res) {}

//  @desc update Incidents
// @ROUTE GET/api/incident/update-incidents
export async function updateIncident(req, res) {}

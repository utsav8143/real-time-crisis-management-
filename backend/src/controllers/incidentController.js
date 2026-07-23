import incidentModel from "../models/incidentModel.js";

//  @desc report incident
// @ROUTE POST/api/incident/report
export async function createIncident(req, res) {
  const { title, description, category, location, reportedBy } = req.body;

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

    const populate = await incidentModel.populate(
      "reportedBy",
      "name email role",
    );

    res
      .status(201)
      .json({ message: "Incident created successfully", populate });
  } catch (err) {
    res.status(500).json({ message: "Error in creating incident:", err });
  }
}

//  @desc view Incidents
// @ROUTE GET/api/incident/view-incidents
export async function viewIncidents(req, res) {}

//  @desc view Incidents by ID
// @ROUTE GET/api/incident/view-incidents/:id
export async function viewIncidentsById(req, res) {}

//  @desc update Incidents
// @ROUTE GET/api/incident/update-incidents
export async function updateIncident(req, res) {}

import incidentModel from "../models/incidentModel.js";
import userModel from "../models/userModel.js";

//  @desc report incident
// @ROUTE POST/api/incident/report
// @access Private
export async function createIncident(req, res) {
  const {
    title,
    description,
    severity,
    location,
    reportedBy,
    coordinates,
    address,
  } = req.body;

  try {
    if (!coordinates || coordinates.length !== 2) {
      return res
        .status(400)
        .json({ message: "Valid location coordinates are required" });
    }

    const incident = await incidentModel.create({
      title,
      description,
      severity,
      location: {
        type: "Point",
        coordinates, //[lng,lat]
        address,
      },
      reportedBy: req.user._id,
    });

    const populate = await incident.populate("reportedBy", "name email role");

    const io=req.app.get("io");
    console.log('📡 Emitting newIncident to dashboard room');
    io.to("dashboard").emit("newIncident", populate);

    res
      .status(201)
      .json({ message: "Incident created successfully", incident });
  } catch (err) {
    res.status(500).json({ message: "Error in creating incident" });
    console.log(err);
  }
}

//  @desc view Incidents
// @ROUTE GET/api/incident/view-incidents
// @access Private
export async function viewIncidents(req, res) {
  try {
    const { status, category, severity } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (severity) filter.severity = severity;

    const incident = await incidentModel
      .find(filter)
      .populate("reportedBy", "name email role")
      .sort({ createdAt: -1 }); //newest first

    res
      .status(200)
      .json({ message: "Incidents Fetched successfully", incidents:incident });
  } catch (err) {
    res.status(400).json({ message: "Failed to fetch incidents" });
    console.log(err);
  }
}

//  @desc view Incidents by ID
// @ROUTE GET/api/incident/view-incidents/:id
// @access Private
export async function viewIncidentsById(req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Incident ID is provided is invalid" });
    }

    const incident = await incidentModel
      .findById(id)
      .populate("reportedBy", "name email role");

    res
      .status(201)
      .json({ message: "Incident fetched successfully", incident });
  } catch (err) {
    res.status(400).json({ message: "Error in finding the invoice by ID" });
    console.log(err)``;
  }
}

//  @desc update Incidents
// @ROUTE GET/api/incident/update-incidents/:id
// @access Private
export async function updateIncident(req, res) {
  const { status, severity } = req.body;

  try {
    const allowedRoles = ["status", "severity"];
    const update = {};

    for (const key of allowedRoles) {
      if (req.body !== undefined) {
        update[key] = req.body[key];
      }
    }

    const incident = await incidentModel
      .findByIdAndUpdate(req.params.id, update, {
        new: true,
        runValidators: true,
      })
      .populate("reportedBy", "name email role");

    if (!incident) {
      return res.status(400).json({ message: "Incident not found" });

      const io=req.app.get("io")
      io.to("dashboard").emit("incidentUpdated",incident);
      io.to(`dashboard ${incident._id}`).emit("incidentUpdated",incident);
    }

    res
      .status(200)
      .json({ message: "Incident updated successfully", incident });
  } catch (err) {
    res.status(400).json({ message: "Error in updating the incident" });
    console.log(err);
  }
}

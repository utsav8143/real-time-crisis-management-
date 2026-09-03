import jwt from "jsonwebtoken";
import { Socket } from "socket.io";

export function setupSocket(io) {
    // Auth Middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication required"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      socket.userId = decoded.id;
      socket.userRole = decoded.role;
      next();
    } catch (err) {
      next(new Error("Inavlid or Expired token"));
    }
  });

  io.on("connection", (socket) => {
    
  

//   Join dashboard room
    socket.on("joinDashboard", () => {
    socket.join("dashboard");
  });

  socket.on("leaveDashboard", () => {
    socket.leave("dashboard");
  });

//   Join incidnet room
  socket.on("joinIncident", (incidentId) => {
    if (!incidentId) return;
    socket.join(`incident:${incidentId}`);
  });

  socket.on("leaveIncident", (incidentId) => {
    if (!incidentId) return;
    socket.leave(`incident:${incidentId}`);
  });

//   Basic chat message
  socket.on("sendMessage", ({ incidentId, text }) => {
    if (!incidentId || !text?.trim()) return;

    const message = {
      text: text.trim(),
      senderId: socket.userId,
      senderRole: socket.userRole,
      timestamp: new Date().toISOString(),
    };

    io.to(`incident:${incidentId}`).emit("new message", message);
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });

  socket.on("error", (err) => {
    console.log(`Socket error (${socket.id})`, err.message);
  });
  });
}

import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../utils/axiosInstance.js";

const IncidentForm = () => {
  const CATEGORIES = [
    "flood",
    "fire",
    "medical",
    "accident",
    "earthquake",
    "other",
  ];

  const [form, setform] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });
  const [coords, setCoords] = useState(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  // capture user current location via browser
  const captureLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setLocating(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocating(false);
      },
      (err) => {
        setLocationError(
          err.code === err.PERMISSION_DENIED
            ? "Location permission denied. Please enable it. "
            : "Could not get your location. Try again or enter address manually",
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!coords) {
      setError("Please capture your location before submitting");
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/api/incident/report", {
        title: form.title,
        description: form.description,
        category: form.category,
        location: form.location,
        coordinates: [coords.lng, coords.lat],
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit the report.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ps-4 mt-3">
      <div className="">
        <form onSubmit={handleSubmit} className="">
          <div className="flex items-center gap-1.5">
            <div className="size-2 bg-primary rounded-xl"></div>
            <h1 className="text-primary font-bold lg:text-xl">
              Report an incident
            </h1>
          </div>
          <p className="text-gray-400 mt-1">
            Give responders what they need to act fast. Severity is accessed
            automatically once submitted.
          </p>
          <div className="bg-gray-900 p-4 rounded-xl mt-5 me-5">
            {error && <div className="">{error}</div>}
            <div className="">
              <label htmlFor="title" className="text-white block  ">
                Title{" "}
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Flooding near Main St bridge"
                required
                className=" border-2 mt-1 p-1 text-white border-gray-700 w-1/2 rounded-sm"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="description" className="text-white block">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe what you're seeing."
                required
                className="border-2 p-1 text-white border-gray-700 w-1/2 rounded-sm mt-1"
              />
            </div>{" "}
            <div className="mt-5">
              <label htmlFor="category" className="text-white block">
                Category
              </label>
              <select
                name="category"
                onChange={handleChange}
                value={form.category}
                className="text-white p-1 border-2 border-gray-700 mt-1 w-1/4 rounded-sm"
              >
                {CATEGORIES.map((cat) => (
                  <option className="bg-gray-700" key={cat} value={cat}>
                    {cat[0].toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-5">
              <label htmlFor="location" className="text-white">
                Location
              </label>
              <div className="">
                {coords ? (
                  <div className="mt-2">
                    <span className="border-2 p-1 text-white border-gray-700 rounded-sm">
                      Location captured ({coords.lat.toFixed(5)},{" "}
                      {coords.lng.toFixed(5)})
                    </span>
                    <button
                      type="button"
                      className="ms-5 border  p-1 rounded-sm text-blue-500 font-bold  hover:scale-90 transition-all duration-200 hover:cursor-pointer"
                      onClick={captureLocation}
                    >
                      Recapture
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="border p-1 rounded-sm bg-gray-700 text-white hover:border-gray-700 hover:scale-95 transition-all duration-200 mt-2"
                    onClick={captureLocation}
                    disabled={locating}
                  >
                    {locating
                      ? "Getting your location..."
                      : "📍 Use my current location"}
                  </button>
                )}
                {locationError && <p>{locationError}</p>}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className=" mt-20 border p-2 rounded-full w-1/2 mx-auto bg-linear-to-r from-yellow-900 to-yellow-500  hover:scale-102 transition-all duration-200 hover:cursor-pointer"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentForm;

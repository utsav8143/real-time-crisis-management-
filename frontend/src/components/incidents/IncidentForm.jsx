import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const IncidentForm = () => {

  const CATEGORIES=[FLOOD, EARTHQUAKE, ACCIDENT, MEDICAL, FIRE, OTHER]

  const [form, setform] = useState({title:'', description:'', category:'', location:''})
  const [coords, setCoords] = useState(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const navigate=useNavigate();

  const handleChange=(e)=>{
    setform({...form,[e.target.name]:e.target.value})
  }

  // capture user current location via browser
  const captureLocation= ()=>{
    if(!navigator.geolocation){
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setLocating(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      (position)=>{
        setCoords({
          lat:position.coords.latitude,
          lng:position.coords.longitude
        });
        setLocating(false);
      },
      (err)=>{
        setLocationError(
          err.code===err.PERMISSION_DENIED
          ?"Location permission denied. Please enable it. "
          :"Could not get your location. Try again or enter address manually"
        )
        setLocating(false);
      },
      {enableHighAccuracy:true, timeout:10000}
    );
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError('');

    if(!coords){
      setError("Please capture your location before submitting");
      return;
    }

  setSubmitting(true)
  try{
    await api.post("/incidents", {
      title:form.title,
      description:form.description,
      category:form.category,
      location:form.location,
      coordinates:[coords.lng, coords.lat]
    });
    navigate("/dashboard");
  } catch(err){
    console.log(err.response?.dta?.message || "Failed to submit the report.")
  } finally{
    setSubmitting(false);
  }
  }

  return (
    <div id='incident-form'>
      
    </div>
  )
}

export default IncidentForm

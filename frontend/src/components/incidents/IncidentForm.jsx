import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const IncidentForm = () => {

  
  const CATEGORIES = ['flood', 'fire', 'medical', 'accident', 'earthquake', 'other'];

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
    <div className="ps-4 mt-3">
      <div className="">
        <form onSubmit={handleSubmit} className=''>
          <div className="flex items-center gap-1.5">
            <div className="size-2 bg-primary rounded-xl"></div>
            <h1 className="text-primary font-bold lg:text-xl">Report an incident</h1></div>
          
          <p className="text-gray-400 mt-1">Give responders what they need to act fast. Severity is accessed automatically once submitted.</p>

          {error && <div className=''>{error}</div>}

        <div className="">
          <label htmlFor="title" className='text-white block `'>Title </label>
          <input type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder='e.g. Flooding near Main St bridge'
            required
            className=' border-2 p-1 text-white border-gray-700'
          />
          </div>
          <div className="">
          <label htmlFor="description" className='text-white block'>Description</label>
          <input type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe what you're seeing — how many people affected, how fast it's changing, anything responders need to know."
            required
            className='border-2 p-1 text-white border-gray-700'
          />
          
        </div>
        `  <div className="">
          <label htmlFor="category" className='text-white block'>Category</label>
          <select name="category" onChange={handleChange} value={form.category} className='text-white p-1 border-2 border-gray-700'>
            {CATEGORIES.map((cat)=>(
            <option className='bg-gray-700' key={cat} value={cat}>{cat[0].toUpperCase() + cat.slice(1)}</option>))}
          </select>
          
        </div>`
        </form>
      </div>
    </div>
  )
}

export default IncidentForm

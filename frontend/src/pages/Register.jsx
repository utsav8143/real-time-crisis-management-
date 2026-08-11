import React from 'react'
import Particles from '../animations/Particles'
import { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FileText,Mail,Lock , ArrowRight, User, List} from 'lucide-react'

const Register = () => {

 const [formdata, setFormdata] = useState({
  name:'',
  email:'',
  password:'',
  role:"citizen"
 })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate();
  const {register}=useAuth()

  const handleChange=(e)=>{
    setFormdata({...formdata,[e.target.name]:e.target.value})
  }

  const handleSubmit= async(e)=>{
    e.preventDefault();
    setError('');
    setLoading(true);

    try{
      await register(formdata.name, formdata.email, formdata.password, formdata.role)
      navigate("/dashboard")
    } catch(err){
      setError(err.response?.data?.message || "Registration failed")
    } finally{
      setLoading(false)}
  }
  
  return (
    <div>
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div className="absolute inset-0 z-0">
      <Particles
        particleColors={["#F9A825"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={1}
         
      /> </div>

      <div className="min-h-screen bg-color relative z-10 opacity-95 ">
        <div className="flex">
          <div className=" h-3 w-3 bg-red-600 rounded-sm  mt-5 ms-2 flex justify-center items-center animate-glow">
            <div className="h-2 w-2 bg-red-800 rounded-lg "></div>
          </div>
          <h1 className="font-bold text-2xl m-2 text-white ">ResQ</h1>
        </div>
        <div className="w-full h-screen flex justify-center items-center mt-20">
          <div className="text-white bg-gray-800 w-2/3 rounded-4xl">
            <div className="flex items-center justify-center">
              <FileText className="mt-7  border border-yellow-700 h-15 w-15 p-3 rounded-xl bg-yellow-600 text-white shadow-[0_10px_20px] shadow-amber-900" />
            </div>

            <form className="p-10" onSubmit={handleSubmit}>
              <div>
                <h2 className="text-2xl font-bold text-center">
                  Create Account
                </h2>
                <p className="mt-3 text-center text-sm">
                  Join ResQ today
                </p>
              </div>

              <div className="flex justify-center">
                <div className="mt-10 ">

                 {/* Name */}
                 <label htmlFor="name">Name </label>
                 <div className="relative mt-2">
                  <User className='absolute w-6 h-6 m-3 text-gray-500'/>
                  <input type="text"
                  name='name' 
                    value={formdata.name}
                    required
                    placeholder='Enter your name'
                    onChange={handleChange}
                  className="absolute border border-white rounded-sm p-2 pl-12 py-3 pe-5 w-100" />
                 </div>


                  {/* Email */}
                  <div className="mt-20">
                  <label htmlFor='email'>Email</label>
                  </div>
                  <div className="relative  ">
                    <Mail className="absolute w-6 h-6 m-3 mt-5 text-gray-500 " />
                    <input
                      type="email"
                      name='email'
                      value={formdata.email}
                      required
                      className="border border-white rounded-sm p-2 pl-12 py-3 pe-5 w-100 mt-2"
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  {/* Password */}
                  <div className="mt-6">
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute w-6 h-6 text-gray-500 mt-5 ms-3" />
                    <input
                      type="password"
                      name='password'
                      value={formdata.password}
                      required
                      onChange={handleChange}
                      minLength={6}
                      className="border border-white rounded-sm p-2 pl-12 py-3 pe-5 w-100 mt-2"
                      placeholder="Enter your password"
                    />
                  </div>

                  <div className="mt-6">
                    <label htmlFor="role">Role</label>
                  </div>
                  <div className="relative mt-1.5">
                    <List className='absolute text-gray-500 w-6 h-6 m-2 mt-3'/>
                    <select name="role" value={formdata.role} onChange={handleChange} className='border border-white p-2 pl-12 py-3 pe-5 w-100 rounded-sm'>
                      <option value="citizen" className='bg-gray-900'>Citizen - reporting incidents</option>
                      <option value="responder" className='bg-gray-900'>Responder - handling incidents</option>
                    </select>
                  </div>

                  <div className="group">
                    <button
                      type="submit"
                      disabled={loading}
                      className="border border-yellow-700 hover:border-yellow-900 hover:cursor-pointer transition-transform w-full mt-12 p-3 rounded-3xl flex gap-2 ps-40 bg-linear-to-r from-yellow-600 to-yellow-800 font-semibold "
                    >
                      {loading ? "Signinging in..." : "Sign Up"}
                      <ArrowRight className="h-5 w-5 mt-1 group-hover:translate-x-1 transition-transform " />
                    </button>
                  </div>

                  <p className="mt-7 text-center text-sm">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-bold hover:underline transition-transform"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}


export default Register

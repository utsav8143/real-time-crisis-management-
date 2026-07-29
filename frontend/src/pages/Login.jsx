import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <h1 className="">SIGNAL</h1>
      <div className="">
        <div className="">
          <form className="" onSubmit={handleSubmit}>
            <div className="">
              <h2 className="">Login to your account</h2>
              <p className="">Please enter your details to login</p>
            </div>

            <div className="">
              {/* Email */}
              <label className="">Email</label>
              
                <input type="email" value={email} required 
                onChange={(e)=> setEmail(e.target.value)}/>

                <label htmlFor="password">Password</label>
                <input type="password" value={password} required
                onChange={(e) => setPassword(e.target.value)}
                minLength={6} />

                <button type="submit" disabled={loading}>{loading?"Logging in...":"Login"}</button>

                <p className="">Don't have an account? <Link href="/register">Register</Link></p>
            
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

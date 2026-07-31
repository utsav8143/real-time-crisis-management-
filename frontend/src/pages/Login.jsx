import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Mail, Lock, ArrowRight, FileText } from "lucide-react";
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
    <div className="min-h-screen bg-color"><div className="flex  ">
      <div className=" h-3 w-3 bg-red-400 rounded-sm  mt-5 ms-2 flex justify-center items-center animate-glow">
        <div className="h-1.5 w-1.5 bg-red-800 rounded-sm "></div>
      </div>
      <h1 className="font-bold text-2xl m-2 text-white">SIGNAL</h1>
      </div>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-white bg-gray-800 w-2/3 rounded-4xl">
        <div className="flex items-center justify-center">
          <FileText className="mt-10  border border-yellow-700 h-15 w-15 p-3 rounded-xl bg-yellow-600 text-white shadow-[0_10px_20px] shadow-amber-900"/>
        </div>

          <form className="p-10" onSubmit={handleSubmit}>
           
            <div className="m-3">
              <h2 className="text-2xl font-bold text-center">
                Login to your account
              </h2>
              <p className="mt-3 text-center text-sm">
                Please enter your details
              </p>
            </div>

            <div className="flex justify-center">
              <div className="mt-10 ">
                {/* Email */}

                <label className="">Email</label>
                <div className="relative mt-2 ">
                  <Mail className="absolute w-6 h-6 m-3 text-gray-500 " />
                  <input
                    type="email"
                    value={email}
                    required
                    className="border border-white rounded-sm p-2 pl-12 py-3 pe-5 w-100"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mt-9">
                  <label htmlFor="password">Password</label>
                </div>
                <div className="relative">
                  <Lock className="absolute w-6 h-6 text-gray-500 mt-5 ms-3" />
                  <input
                    type="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    className="border border-white rounded-sm p-2 pl-12 py-3 pe-5 w-100 mt-2"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="group">
                  <button
                    type="submit"
                    disabled={loading}
                    className="border border-yellow-700 hover:border-yellow-900 hover:cursor-pointer hover:scale-102 transition-transform w-full mt-12 p-3 rounded-3xl flex gap-2 ps-40 bg-linear-to-r from-yellow-600 to-yellow-800 font-semibold "
                  >
                    {loading ? "Logging in..." : "Login"}
                    <ArrowRight className="h-5 w-5 mt-1 group-hover:translate-x-1 transition-transform " />
                  </button>
                </div>

                <p className="mt-7 text-center text-sm">
                  Don't have an account? <Link to="/register" className="font-bold hover:underline transition-transform">Register</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

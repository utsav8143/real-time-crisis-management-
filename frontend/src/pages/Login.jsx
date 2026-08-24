import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Mail, Lock, ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import Particles from "../animations/Particles.jsx";

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
      if (err.response) {
        setError(err.response.data?.message || "Invalid email or password");
      } else if (err.request) {
        setError("Cannot reach the server. Please try again shortly");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
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
        />{" "}
      </div>

      <div className="min-h-screen bg-color relative z-10 opacity-95 ">
        <div className="flex  ">
          <div className=" h-3 w-3 bg-red-6 00 rounded-sm  mt-5 ms-2 flex justify-center items-center animate-glow">
            <div className="h-1.5 w-1.5 bg-red-800 rounded-sm "></div>
          </div>
          <h1 className="font-bold text-2xl m-2 text-white">ResQ</h1>
        </div>
        <div className="w-full h-screen flex justify-center items-center">
          <div className="text-white bg-gray-800 w-2/3 rounded-4xl">
            <div className="flex items-center justify-center">
              <FileText className="mt-10  border border-yellow-700 h-15 w-15 p-3 rounded-xl bg-yellow-600 text-white shadow-[0_10px_20px] shadow-amber-900" />
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
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
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
                  {/* Error/Success message */}
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg mt-7">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <div className="group">
                    <button
                      type="submit"
                      disabled={loading}
                      className="border border-yellow-700 hover:border-yellow-900 hover:cursor-pointer  transition-transform w-full mt-12 p-3 rounded-3xl flex gap-2 ps-40 bg-linear-to-r from-yellow-600 to-yellow-800 font-semibold "
                    
                    >
                      {loading ? "Logging in..." : "Login"}
                      <ArrowRight className="h-5 w-5 mt-1 group-hover:translate-x-1 transition-transform " />
                    </button>
                  </div>

                  <p className="mt-7 text-center text-sm">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="font-bold hover:underline transition-transform"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

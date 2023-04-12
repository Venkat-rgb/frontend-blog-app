import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Layout } from "../components";
import toast from "react-hot-toast";
import { USER_API_URL } from "../config";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${USER_API_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(`${data.message}`);

      toast.success(`${data.message}`);

      setUser({
        userInfo: data?.user && data.user,
        accessToken: data?.accessToken && data.accessToken,
      });

      setEmail("");
      setPassword("");
    } catch (err) {
      setUser(null);
      toast.error(err.message);
    }
  };

  if (user?.userInfo?.id) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Layout>
      <div className="w-[350px] bg-white border border-gray-300 p-4 space-y-3">
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your Email..."
            className="border border-gray-300 p-2 outline-none w-full"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Enter your Password..."
            className="border border-gray-300 p-2 outline-none w-full"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            type="submit"
            className="w-full bg-[#333] p-2 rounded text-[#f1f1f1]"
          >
            Login
          </button>
          <p className="text-center font-semibold">OR</p>
          <Link
            to="/register"
            className="w-full bg-[#333] p-2 rounded text-[#f1f1f1] text-center"
          >
            Sign Up
          </Link>
        </form>
      </div>
    </Layout>
  );
};

export default Login;

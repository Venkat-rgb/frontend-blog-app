import React, { useContext, useState } from "react";
import { Layout } from "../components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { USER_API_URL } from "../config";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${USER_API_URL}/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await res.json();

      const error =
        typeof data.message === "object"
          ? data?.message?.email || data?.message?.password
          : data.message;

      if (!res.ok) throw new Error(`${error}`);

      toast.success(`${data.message}`);

      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (user?.userInfo?.id) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Layout>
      <div className="w-[350px] bg-white border border-gray-300 p-4 space-y-3">
        <p className="text-2xl font-semibold text-center">Register</p>
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center gap-4"
        >
          <input
            type="text"
            placeholder="Enter your Username..."
            className="border border-gray-300 p-2 outline-none w-full"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
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
            Register
          </button>
          <p className="text-center font-semibold">OR</p>
          <Link
            to="/login"
            className="w-full bg-[#333] p-2 rounded text-[#f1f1f1] text-center"
          >
            Login
          </Link>
        </form>
      </div>
    </Layout>
  );
};

export default Register;

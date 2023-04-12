import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";
import { USER_API_URL } from "../config";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const userInfo = user?.userInfo;

  const logoutHandler = async () => {
    try {
      const res = await fetch(`${USER_API_URL}/logout`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(`${data.message}`);

      toast.success(`${data.message}`);
      setUser(null);
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <header className="flex items-center justify-between py-4 sticky top-0 left-0 bg-gradient-to-r from-sky-100 to-indigo-100 px-2">
      <p className="text-2xl font-bold text-[#333]">Bloggy</p>
      <div className="flex items-center sm:gap-8 gap-4">
        <Link to="/" className="text-neutral-400 font-medium">
          Home
        </Link>

        {!userInfo?.id && (
          <Link to="/login" className="text-neutral-400 font-medium">
            Login
          </Link>
        )}
        {!userInfo?.id && (
          <Link to="/register" className="text-neutral-400 font-medium">
            Register
          </Link>
        )}

        {userInfo?.id && (
          <Link to="/profile" className="text-neutral-400 font-medium">
            Profile
          </Link>
        )}

        {userInfo?.id && (
          <Link to="/create-post" className="text-neutral-400 font-medium">
            Create Post
          </Link>
        )}

        {userInfo?.id && (
          <button
            className="text-neutral-400 font-medium"
            type="button"
            onClick={logoutHandler}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

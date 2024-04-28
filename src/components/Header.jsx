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
    <header className="py-4 sticky top-0 left-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-600 to-neutral-900 px-2">
      <div className="max-w-[1000px] mx-auto flex items-center justify-between font-inter">
        <p className="text-2xl font-bold text-[#f1f1f1] max-[500px]:text-xl">
          <Link to="/">Bloggy</Link>
        </p>
        <div className="flex items-center sm:gap-8 gap-4">
          <Link
            to="/"
            className="text-neutral-200 font-medium max-[500px]:text-sm"
          >
            Home
          </Link>

          {!userInfo?.id && (
            <Link
              to="/login"
              className="text-neutral-200 font-medium max-[500px]:text-sm"
            >
              Login
            </Link>
          )}
          {!userInfo?.id && (
            <Link
              to="/register"
              className="text-neutral-200 font-medium max-[500px]:text-sm"
            >
              Register
            </Link>
          )}

          {userInfo?.id && (
            <Link
              to="/profile"
              className="text-neutral-200 font-medium max-[500px]:text-sm"
            >
              Profile
            </Link>
          )}

          {userInfo?.id && (
            <Link
              to="/create-post"
              className="text-neutral-200 font-medium max-[500px]:text-sm"
            >
              Create Post
            </Link>
          )}

          {userInfo?.id && (
            <button
              className="text-neutral-200 font-medium max-[500px]:text-sm"
              type="button"
              onClick={logoutHandler}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

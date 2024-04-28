import React, { useContext, useEffect } from "react";
import { Header } from "./components";
import {
  CreatePost,
  EditPost,
  Home,
  Login,
  NotFound,
  Profile,
  Register,
} from "./pages";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import { USER_API_URL } from "./config";
import ProtectedRoute from "./components/ProtectedRoute";
import jwtDecode from "jwt-decode";
import FullPost from "./pages/FullPost";

const App = () => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const persistentLogin = async () => {
      try {
        const res = await fetch(`${USER_API_URL}/refresh-token`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(`${data?.message}`);

        setUser({
          userInfo: data?.user && data.user,
          accessToken: data?.accessToken && data.accessToken,
        });
      } catch (err) {
        setUser(null);
        console.error(err.message);
      }
    };

    persistentLogin();

    if (user?.accessToken) {
      const checkTokenExpiry = () => {
        console.log("Token Refreshed!");
        const decodedToken = jwtDecode(user?.accessToken);
        const tokenTime = decodedToken.exp * 1000;
        if (Date.now() > tokenTime) {
          persistentLogin();
        }
      };

      const tokenInterval = setInterval(() => {
        checkTokenExpiry();
      }, 900000);

      return () => clearInterval(tokenInterval);
    }
  }, [user?.accessToken]);

  // max-w-[1000px] mx-auto

  return (
    <main className="h-screen bg-neutral-200/70">
      <Header />
      <div className="max-w-[1000px] mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/post/:postId"
            element={
              <ProtectedRoute>
                <FullPost />
              </ProtectedRoute>
            }
          />
          <Route path="/edit-post/:postId" element={<EditPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </main>
  );
};

export default App;

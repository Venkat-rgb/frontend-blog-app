import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  const {
    user: { userInfo },
  } = useContext(AuthContext);

  return (
    <div className="p-6 font-inter space-y-10">
      <p className="text-center text-2xl font-semibold">Profile</p>

      {userInfo && (
        <div className="flex items-center justify-center gap-4">
          <h1 className="bg-white px-3 py-1 shadow-lg rounded">
            <span className="font-semibold text-neutral-600">Username: </span>
            {userInfo?.username}
          </h1>
          <h1 className="bg-white px-3 py-1 shadow-lg rounded">
            <span className="font-semibold text-neutral-600">Email: </span>
            {userInfo?.email}
          </h1>
        </div>
      )}
      {!userInfo && <h1>Please Login first!</h1>}
    </div>
  );
};

export default Profile;

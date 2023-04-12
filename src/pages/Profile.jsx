import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  const {
    user: { userInfo },
  } = useContext(AuthContext);

  return (
    <div className="p-2">
      {userInfo && (
        <div>
          <h1>Username: {userInfo?.username}</h1>
          <h1>Email: {userInfo?.email}</h1>
        </div>
      )}
      {!userInfo && <h1>Please Login first!</h1>}
    </div>
  );
};

export default Profile;

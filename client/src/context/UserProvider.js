import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader"

const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        setUser(userInfo);
      }
      setLoading(false);
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    // Return a loading indicator or skeleton until user information is determined
    return <Loader/>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

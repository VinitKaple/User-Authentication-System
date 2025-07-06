import { createContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);

  const [userData, setUserData] = useState(false);

const getUserData = async () => {
  try {
    const { data } = await axios.get(backendUrl + "/api/user/data", {
      withCredentials: true,
    });
    if (data.success) {
      setUserData(data.data);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    getUserData,
    setUserData,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};

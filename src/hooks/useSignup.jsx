import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError ] = useState(null);

  const { dispatch } = useAuthContext();

  const signUp = async (email, password) => {
    setError(null);

    const response = await fetch("https://workout-server-ptc4.onrender.com/api/user/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
      
    });
    // console.log(response)

    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
    }
  };

  return {signUp, error}
};

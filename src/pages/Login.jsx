import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const { login, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    setEmail("");
    setpassword("")
  };

  return (
    <div className="min-h-screen bg-gray-200 pt-12">
      <div className="bg-gray-100 w-[30%] h-[70%] shadow-xl rounded p-4 items-start justify-start mx-auto gap-6 flex flex-col">
        <p className="text-2xl">Login</p>
        <form action="" onSubmit={handleSubmit}>
          <div className="flex sm:flex-col flex-wrap justify-between gap-1 my-2">
            <label>Email: </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="border border-black p-1  rounded w-[50%] sm:w-full"
              name="email"
              value={email}
            ></input>
          </div>
          <div className="flex sm:flex-col flex-wrap justify-between gap-1 my-2">
            <label>Password: </label>
            <input
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              className="border border-black p-1  rounded w-[50%] sm:w-full"
              name="password"
              value={password}
            ></input>
          </div>
        </form>
        <button
          onClick={(e) => handleSubmit(e)}
          className=" active:scale-90 active:translate-z-1 hover:cursor-pointer p-1 bg-gray-400 rounded"
        >
          Submit
        </button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Login;

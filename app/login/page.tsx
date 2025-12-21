/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";
import Container from "../component/Container";
import Cookie from "js-cookie";
import { redirect } from "next/navigation";

function login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    const response = {
      token: "dfjsjfowejfejfefefejfenkkjkfhfkjf",
      expire: 7,
    };

    Cookie.set("token", response.token, { expires: response.expire });
    redirect("/add-property");
  };

  return (
    <div className="py-4">
      <Container>
        <div className="border p-4 flex flex-col w-72 mx-auto">
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className="border-gray-300 bg-white px-2 py-1 m-2 border rounded"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="border-gray-300 bg-white px-2 py-1 m-2 border rounded"
          />
          <button
            onClick={handleLogin}
            className="bg-sky-500 text-white px-1 py-1 m-2 rounded font-semibold"
          >
            Enter
          </button>
        </div>
      </Container>
    </div>
  );
}

export default login;

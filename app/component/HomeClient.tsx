"use client";

import { useContext } from "react";
import { Context } from "@/context/MainContext";

export function HomeClient() {
  const { user, isLoggedIn } = useContext(Context);

  return (
    <div>
      <h2>
        Home
        <br />
      </h2>
      {isLoggedIn && user && (
        <h2>
          {user.name} : {user.email} ;
        </h2>
      )}
    </div>
  );
}

export default HomeClient;

"use client";
import { createContext, useState, useEffect } from "react";
import { decode } from "jsonwebtoken";

export let UserToken = createContext(null);

export function UserTokenProvider({ children }) {
  let [isLogin, setIsLogin] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLogin(localStorage.getItem("UserToken"));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("UserToken")) {
      const res = decode(localStorage.getItem("UserToken"));

      setUserName(res.name);
    }
  }, []);
  return (
    <UserToken.Provider value={{ isLogin, setIsLogin, userName }}>
      {children}
    </UserToken.Provider>
  );
}

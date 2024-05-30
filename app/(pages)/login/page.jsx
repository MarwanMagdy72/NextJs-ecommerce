"use client";

import axios from "axios";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import { UserToken } from "@/app/(Context)/UserToken";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setIsLogin } = useContext(UserToken);

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        { email, password }
      );

      if (data.message === "success") {
        localStorage.setItem("UserToken", data.token);
        setIsLogin(data.token);
        router.push("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Fresh Cart - Login</title>
      </Head>
      <div className="container mt-5">
        <div className="row justify-content-center ">
          <div className="col-md-6">
            <div className="card">
              <h1 className="card-header text-center">Login</h1>
              <div className="card-body">
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <button type="submit" className="btn btn-secondary w-100">
                    Login
                  </button>
                </form>
              </div>
              <p className="text-center mt-3">
                Don&apos;t have an account?{" "}
                <Link href="/register">Sign Up</Link>
              </p>
              <p className="text-center">
                <Link href="/forgotPassword">Forgot Your Password?</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Head from "next/head";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleForgotPass = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email }
      );

      if (data.statusMsg === "success") {
        setLoading(false);
        toast.success(data.message);
        router.push("/resetcode");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email) => {
    // Simple email validation function
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Fresh Cart - Forgot Password</title>
      </Head>
      <form className="w-75 mx-auto my-5" onSubmit={handleForgotPass}>
        <h1 className="text-center fw-bold">Forgot Password</h1>

        {error && <p className="alert alert-danger">{error}</p>}

        <label htmlFor="email">Email: </label>
        <input
          type="email"
          className="form-control mb-3"
          id="email"
          name="email"
          onChange={handleEmailChange}
          value={email}
        />
        {!isValidEmail(email) && email !== "" && (
          <p className="alert alert-danger">
            <i className="fa-solid fa-circle-exclamation text-danger me-2"></i>
            Invalid email format
          </p>
        )}

        {loading ? (
          <button className="btn btn-success ms-auto d-block" disabled>
            Loading...
          </button>
        ) : (
          <button
            type="submit"
            disabled={!isValidEmail(email)}
            className="btn btn-success ms-auto d-block"
          >
            Submit
          </button>
        )}
      </form>
    </>
  );
}

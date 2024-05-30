'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Head from 'next/head';

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", { email, newPassword });

      if (data.token) {
        setLoading(false);
        toast.success('Password has been reset successfully');
        router.push('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const isValidEmail = (email) => {
    // Simple email validation function
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPassword = (password) => {
    // Simple password validation: not empty
    return password.trim() !== "";
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Fresh Cart - Reset Password</title>
      </Head>
      <form className="w-75 mx-auto my-5" onSubmit={handleResetPassword}>
        <h1 className='text-center fw-bold'>Reset Password</h1>

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
        <label htmlFor="newPassword">New Password: </label>
        <input
          type="password"
          className="form-control mb-3"
          id="newPassword"
          name="newPassword"
          onChange={handlePasswordChange}
          value={newPassword}
        />
        {!isValidPassword(newPassword) && newPassword !== "" && (
          <p className="alert alert-danger">
            <i className="fa-solid fa-circle-exclamation text-danger me-2"></i>
            Password is required
          </p>
        )}

        {loading ? (
          <button className="btn btn-success ms-auto d-block" disabled>
            Loading...
          </button>
        ) : (
          <button
            type="submit"
            disabled={!isValidEmail(email) || !isValidPassword(newPassword)}
            className="btn btn-success ms-auto d-block"
          >
            Submit
          </button>
        )}
      </form>
    </>
  );
}

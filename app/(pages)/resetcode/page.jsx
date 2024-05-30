"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Head from "next/head";

export default function ResetCode() {
  const [resetCode, setResetCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResetCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode }
      );

      if (data.status === "Success") {
        setLoading(false);
        toast.success(data.status);
        router.push("/resetPassword");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  const handleResetCodeChange = (e) => {
    setResetCode(e.target.value);
  };

  const isValidResetCode = (code) => {
    return code.trim() !== "";
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Fresh Cart - Reset Code</title>
      </Head>
      <form className="w-75 mx-auto my-5" onSubmit={handleResetCode}>
        <h1 className="text-center fw-bold">Reset Code</h1>

        {error && <p className="alert alert-danger">{error}</p>}

        <label htmlFor="resetCode">Reset Code: </label>
        <input
          type="text"
          className="form-control mb-3"
          id="resetCode"
          name="resetCode"
          onChange={handleResetCodeChange}
          value={resetCode}
        />
        {!isValidResetCode(resetCode) && resetCode !== "" && (
          <p className="alert alert-danger">
            <i className="fa-solid fa-circle-exclamation text-danger me-2"></i>
            Reset code is required
          </p>
        )}

        {loading ? (
          <button className="btn btn-success ms-auto d-block" disabled>
            Loading...
          </button>
        ) : (
          <button
            type="submit"
            disabled={!isValidResetCode(resetCode)}
            className="btn btn-success ms-auto d-block"
          >
            Submit
          </button>
        )}
      </form>
    </>
  );
}

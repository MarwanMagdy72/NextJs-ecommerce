"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Head from "next/head";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must have at least 3 characters")
      .max(10, "Name must have maximum 10 characters")
      .required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with a capital letter"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match!")
      .required("Confirm Password is required"),
    phone: Yup.string().matches(
      /^(002)?01[0-25][0-9]{8}/,
      "Phone number is invalid"
    ),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const formattedErrors = validationErrors.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validate();
    if (!isValid) return;

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        formData
      );
      if (data.message === "success") {
        setError("");

        router.push("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title> Register</title>
      </Head>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <h1 className="card-header text-center">Register</h1>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <p className="alert alert-danger">{errors.name}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="alert alert-danger">{errors.email}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <p className="alert alert-danger">{errors.password}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="rePassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="rePassword"
                      name="rePassword"
                      placeholder="Confirm password"
                      value={formData.rePassword}
                      onChange={handleChange}
                    />
                    {errors.rePassword && (
                      <p className="alert alert-danger">{errors.rePassword}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <p className="alert alert-danger">{errors.phone}</p>
                    )}
                  </div>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <button type="submit" className="btn btn-secondary w-100">
                    Register
                  </button>
                </form>
                <p className="mt-3">
                  Already have an account? <a href="/login">Sign In</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

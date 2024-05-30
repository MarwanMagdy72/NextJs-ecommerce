"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { UserToken } from "../(Context)/UserToken";
import {
  faRightFromBracket,
  faCartShopping,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { APIsContext } from "../(Context)/APIsContext";

function TopNavbar() {
  const { isLogin, setIsLogin, userName } = useContext(UserToken);
  const { numOfCartItems } = useContext(APIsContext);
  const router = useRouter();

  function logOut() {
    localStorage.removeItem("UserToken");
    setIsLogin(false);
    toast.success("You have been logged out.");
    router.push("/");
  }

  return (
    <header className="top-nav">
      <nav className="shadow pt-3 bg-light sticky-top">
        <div className="container">
          <div className="nav d-flex align-items-center justify-content-between">
            <div className="logo">
              <Link href={"/"}>
                <h1 className="text-secondary">
                  <FontAwesomeIcon icon={faTruckFast} />
                </h1>
              </Link>
            </div>
            <ul className="nav-links d-flex align-items-center justify-content-center d-grid gap-5">
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              {isLogin && (
                <li>
                  <Link href={"/cart"}>Cart</Link>
                </li>
              )}
              <li>
                <Link href={"/products"}>Products</Link>
              </li>
              <li>
                <Link href={"/wishList"}>WishList</Link>
              </li>
              <li>
                <Link href={"/brands"}>Brands</Link>
              </li>
              {isLogin && (
                <li>
                  <Link href={"/cart"}>
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="bottom-nav-links"
                    />{" "}
                    ({numOfCartItems})
                  </Link>
                </li>
              )}
            </ul>
            {isLogin ? (
              <div className="d-flex align-items-center ">
                <span className="me-4 text-capitalize fw-bold">
                  Welcome {userName}
                </span>
                <button className="btn btn-secondary" onClick={logOut}>
                  Logout <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
              </div>
            ) : (
              <ul className="nav-buttons d-flex align-items-center justify-content-center">
                <li>
                  <Link href="/login" className="btn btn-secondary me-4">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="btn btn-outline-secondary">
                    Register
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default TopNavbar;

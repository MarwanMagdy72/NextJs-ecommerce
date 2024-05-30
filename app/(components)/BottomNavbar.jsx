"use client";

import Link from "next/link";
import React, { useContext } from "react";
import {
  faCartShopping,
  faHouse,
  faLayerGroup,
  faHeart,
  faTruckFast,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { UserToken } from "../(Context)/UserToken";
import { APIsContext } from "../(Context)/APIsContext";

function BottomNavbar() {
  const { isLogin, setIsLogin, userName } = useContext(UserToken);
  const { numOfCartItems } = useContext(APIsContext);
  const router = useRouter();
  function LogOut() {
    localStorage.removeItem("UserToken");
    setIsLogin(null);

    router.push("/");
  }
  return (
    <>
      {isLogin && (
        <div className="px-4 py-5 bg-secondary-transparent rounded-bottom-4 d-flex align-items-center justify-content-between">
          <h2 className="text-capitalize fw-bold text-white">
            {" "}
            Welcome {userName}{" "}
          </h2>
          <Link href={"/cart"} className="text-white fw-bold  fa-2x">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="bottom-nav-links "
            />{" "}
            ({numOfCartItems})
          </Link>
        </div>
      )}

      {!isLogin && (
        <div className=" px-4 pt-5 rounded-bottom-4 d-flex align-items-center justify-content-between .small-header  d-xl-none d-lg-none  d-md-none ">
          <div className="logo">
            <Link href={"/"}>
              <h1 className="text-secondary ">
                <FontAwesomeIcon icon={faTruckFast} />
              </h1>
            </Link>
          </div>

          <ul className="d-flex align-items-center justify-content-end  ">
            <li>
              <Link
                href="/login"
                className="btn btn-secondary me-4"
                type="button"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="btn btn-outline-secondary"
                type="button"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      )}

      <nav className="bottom-nav  fixed-bottom bg-light shadow-lg pt-1  right-0 left-0 bottom-0 pe-4  border ">
        <div className="">
          <ul className="d-flex align-items-center justify-content-between pt-1">
            <li>
              <Link
                href={"/"}
                className="d-flex align-items-center flex-column justify-content-center"
              >
                <FontAwesomeIcon icon={faHouse} className="bottom-nav-links " />
                <span className="bottom-nav-label">Home</span>
              </Link>
            </li>

            {isLogin && (
              <li>
                <Link
                  href={"/cart"}
                  className="d-flex align-items-center flex-column justify-content-center"
                >
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="bottom-nav-links "
                  />
                  <span className="bottom-nav-label">Cart</span>
                </Link>
              </li>
            )}

            <li>
              <Link
                href={"/brands"}
                className="d-flex align-items-center flex-column justify-content-center"
              >
                <FontAwesomeIcon
                  icon={faLayerGroup}
                  className="bottom-nav-links "
                />
                <span className="bottom-nav-label">Brands</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/brands"}
                className="d-flex align-items-center flex-column justify-content-center"
              >
                <FontAwesomeIcon icon={faHeart} className="bottom-nav-links " />
                <span className="bottom-nav-label">WishList</span>
              </Link>
            </li>
            {isLogin && (
              <li>
                <button
                  className="d-flex align-items-center flex-column btn justify-content-center"
                  onClick={LogOut}
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="bottom-nav-links "
                  />
                  <span className="bottom-nav-label">LogOut</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default BottomNavbar;

"use client";
import { APIsContext } from "@/app/(Context)/APIsContext";
import { UserToken } from "@/app/(Context)/UserToken";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import toast from "react-hot-toast";
import Image from "next/image";

export default function WishList() {
  const { getWishList, deleteItemFromWishList, addToCart, setNumOfCartItems } =
    useContext(APIsContext);
  const { isLogin } = useContext(UserToken);
  const [data, setData] = useState(null);

  async function addToCartFunc(id) {
    let res = await addToCart(id);

    if (isLogin) {
      toast.success(res.data.message);
    } else {
      toast.error(res.response.data.message);
    }
    setNumOfCartItems(res?.data.numOfCartItems);
  }

  async function getWishListFun() {
    let res = await getWishList();

    if (res?.data?.status === "success") {
      setData(res?.data);
    }

    if (res?.data.count === 0) {
      console.log("WishList is empty");
    }
  }

  async function deleteItemFromWishListFunc(id) {
    let res = await deleteItemFromWishList(id);
    if (res?.data?.status === "success") {
      getWishListFun();
    }
  }

  useEffect(() => {
    if (isLogin == null) return;
    getWishListFun();
  }, [isLogin, getWishListFun]); // Include getWishListFun in the dependency array

  return (
    <>
      <h1 className="fw-bold m-5">My Wish List</h1>

      {data?.data.map((prod) => (
        <div key={prod._id} className="row align-items-center text-start mx-5">
          <div className="col-md-9">
            <div className="row align-items-center ">
              <div className="d-flex align-items-center  justify-content-evenly text-center  ">
                <div className="col-md-2">
                  <Image
                    src={prod.imageCover}
                    alt="product cover"
                    className="w-100 rounded-4 my-3"
                    width={500}
                    height={250}
                  />
                </div>
                <div className="">
                  <p className="fw-bolder h5 ">{prod.title}</p>
                  <p className="fw-bold fa-2x">Price: {prod.price} EGP</p>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex  align-items-center justify-content-center">
            <button
              className="btn btn-danger cursor-pointer me-3 "
              onClick={() => deleteItemFromWishListFunc(prod._id)}
            >
              <FontAwesomeIcon icon={faTrashCan} className="me-2" />
              Remove
            </button>
            <div>
              <button
                className="btn btn-outline-success"
                onClick={() => addToCartFunc(prod._id)}
              >
                Add to cart
              </button>
            </div>
          </div>

          <hr className="my-5 w-75 mx-auto" />
        </div>
      ))}
    </>
  );
}

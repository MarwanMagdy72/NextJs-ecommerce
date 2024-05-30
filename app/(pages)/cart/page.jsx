"use client";
import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserToken } from "@/app/(Context)/UserToken";
import { APIsContext } from "@/app/(Context)/APIsContext";
import Image from "next/image";

export default function Cart() {
  const {
    getCart,
    deleteItem,
    clearCart,
    updateCart,
    numOfCartItems,
    setNumOfCartItems,
  } = useContext(APIsContext);
  const { isLogin } = useContext(UserToken);
  const [data, setData] = useState(null);
  const router = useRouter();

  // Display Cart Items
  async function getCartFunc() {
    let res = await getCart();
    if (res?.data?.status === "success") {
      setData(res?.data);
      setNumOfCartItems(res?.data.numOfCartItems);
    }
  }

  // Remove Item from Cart
  async function deleteItemFunc(id) {
    let res = await deleteItem(id);
    if (res?.data?.status === "success") {
      getCartFunc();
    }
  }

  // Clear Cart
  async function clearCartFunc() {
    await clearCart();
    getCartFunc();
  }

  // Update Cart
  async function updateCartFunc(id, count) {
    let res = await updateCart(id, count);
    if (res.data.status === "success") {
      getCartFunc();
    }
  }

  // Get cart only for loggedIn users
  useEffect(() => {
    if (isLogin == null) return;
    getCartFunc();
  }, [isLogin]);

  if (numOfCartItems === 0) {
    return (
      <div className="empty-cart my-4 d-flex flex-column align-items-center justify-content-center ">
        <h1 className="text-center fw-bold text-danger">Your Cart Is Empty!</h1>
        <Link href="/products">
          <button className="btn btn-danger fw-bold w-100">Go Fill It</button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1 className="fw-bold my-5">Your Cart Items:</h1>
        {data?.data.products.map((prod) => (
          <div key={prod.product._id} className="container">
            <div className="row align-items-center text-start">
              <div className="col-md-9">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <Image
                      src={prod.product.imageCover}
                      className="w-100 rounded-4 my-3"
                      alt="image product"
                      width={500}
                      height={250}
                    />
                  </div>
                  <div className="col-md-10">
                    <p className="fw-bolder h5">{prod.product.title}</p>
                    <p className="fw-bold">Price: {prod.price} EGP</p>
                    <button
                      className="btn btn-danger cursor-pointer"
                      onClick={() => deleteItemFunc(prod.product._id)}
                    >
                      <i className="fa-solid fa-trash-can"></i> Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-3 mt-3">
                <button
                  className="btn btn-outline-danger fw-bolder"
                  onClick={() =>
                    updateCartFunc(prod.product._id, prod.count - 1)
                  }
                  disabled={prod.count <= 0}
                >
                  -
                </button>
                <span className="mx-2 fw-bold">{prod.count}</span>
                <button
                  className="btn btn-outline-success fw-bolder"
                  onClick={() =>
                    updateCartFunc(prod.product._id, prod.count + 1)
                  }
                >
                  +
                </button>
              </div>
              <hr className="m-4" />
            </div>
          </div>
        ))}

        <button
          className="btn btn-outline-danger d-block mx-auto my-3 fw-bold"
          onClick={clearCartFunc}
        >
          Clear Cart <i className="fa-solid fa-trash-can mx-2"></i>
        </button>

        <Link href="/products">
          <button className="btn my-3 btn-outline-dark w-75 m-auto fw-bold d-block">
            Continue Shopping
          </button>
        </Link>
        <Link href="/checkout">
          <button className="btn my-3 btn-outline-dark w-75 m-auto fw-bold d-block">
            Check out now
          </button>
        </Link>
      </div>
    );
  }
}

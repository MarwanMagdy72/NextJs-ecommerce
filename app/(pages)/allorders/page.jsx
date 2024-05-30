"use client";
import axios from "axios";
import { decode } from "jsonwebtoken";

import React, { useEffect, useState } from "react";

export default function AllOrders() {
  const [userOrders, setUserOrders] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("UserToken")) {
      const res = decode(localStorage.getItem("UserToken"));

      getUserOrders(res.id);
      setUserName(res.name);
    }
  }, []);

  async function getUserOrders(userId) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      setUserOrders(data);
    } catch (error) {
      console.log("error", error);
    }
  }

  if (userOrders === null) {
    return null;
  } else {
    return (
      <div className="m-5">
        <h1 className="text-center fw-bold"> Hello {userName} </h1>
        <div className="row">
          <div className="col-md-12">
            {userOrders.map((order, index) => (
              <div key={order._id} className="table-responsive">
                <div className="d-flex">
                  <h5 className="fw-bold me-5"> order: {index + 1} </h5>
                  <h5> created at: {order.createdAt.substring(0, 10)} </h5>
                </div>

                <table className="table table-striped ">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Price</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartItems.map((item, idx) => (
                      <tr key={item._id}>
                        <td>{idx + 1}</td>
                        <td className="fw-bold w-25">{item.product.title}</td>
                        <td>{item.count}</td>
                        <td>{item.price}</td>
                        <td>{item.count * item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className=" my-4 bg-success text-white py-2 d-flex justify-content-evenly align-items-center">
                  <h4 className="fw-bold">
                    Total: {order.totalOrderPrice} EGP
                  </h4>
                  <h4 className="fw-bold">
                    Payment: {order.paymentMethodType}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

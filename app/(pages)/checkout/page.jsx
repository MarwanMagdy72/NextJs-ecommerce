"use client";
import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { UserToken } from "@/app/(Context)/UserToken";
import { APIsContext } from "@/app/(Context)/APIsContext";

export default function CheckOut() {
  const { getCart, onlinePayment, cartId, setCartId } = useContext(APIsContext);
  const { isLogin } = useContext(UserToken);
  const [data, setData] = useState(null);
  const [formValues, setFormValues] = useState({
    details: "",
    phone: "",
    city: "",
  });
  const router = useRouter();

  async function handleOnlinePayment(values) {
    let response = await onlinePayment(
      cartId,
      "http://localhost:3000",
      formValues
    );
    if (response?.data?.status === "success") {
      window.location.href = response?.data.session.url;
    }
  }

  async function getCartFunc() {
    let res = await getCart();
    if (res?.data?.status === "success") {
      setData(res?.data);
      setCartId(res?.data.data._id);
    }
  }

  useEffect(() => {
    if (isLogin === null) return;
    getCartFunc();
  }, [isLogin]);

  return (
    <div className="m-5">
      <h1 className="text-center fw-bold "> Order Details: </h1>
      <div className="table-responsive ">
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Amount</th>
              <th scope="col">Price</th>
              <th scope="col">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.products.map((prod, index) => (
              <tr key={prod._id}>
                <td>{index + 1}</td>
                <td className="fw-bold w-25 ">{prod.product.title}</td>
                <td className="ps-4">{prod.count}</td>
                <td>{prod.price}</td>
                <td className="ps-4">{prod.price * prod.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h4 className="fw-bold my-4">Total: {data?.data.totalCartPrice} EGP</h4>
      </div>

      <div className="buttons d-flex ">
        <button
          className="btn btn-success m-3 me-1"
          onClick={handleOnlinePayment}
        >
          online payment <i className="ms-1 fa-regular fa-credit-card"></i>
        </button>

        <button
          className="btn btn-success m-3"
          onClick={() => router.push("/cash-payment")}
        >
          cash payment <i className="ms-1 fa-solid fa-money-bill-wave"></i>
        </button>
      </div>
    </div>
  );
}

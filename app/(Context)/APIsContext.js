"use client";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserToken } from "./UserToken";

export let APIsContext = createContext();

export function APIsContextProvider({ children }) {
  let { isLogin } = useContext(UserToken);
  let headers = { token: isLogin };
  let [numOfCartItems, setNumOfCartItems] = useState(0);
  let [cartId, setCartId] = useState(0);

  async function addToCart(productId) {
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      );
      return res;
    } catch (err) {
      return err;
    }
  }

  async function getCart() {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers }
      );
      return res;
    } catch (err) {
      return err;
    }
  }
  async function getProducts() {
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      return res;
    } catch (err) {
      return err;
    }
  }
  async function deleteItem(id) {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { headers }
      );
      return res;
    } catch (err) {
      return err;
    }
  }
  async function clearCart() {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers }
      );
      setNumOfCartItems(0);
      return res;
    } catch (err) {
      return err;
    }
  }
  async function updateCart(id, count) {
    try {
      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers }
      );
      return res;
    } catch (err) {
      return err;
    }
  }

  async function onlinePayment(cartId, url, values) {
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: values },
        { headers }
      );
      return res;
    } catch (err) {
      return err;
    }
  }

  async function addToWishList(productId) {
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      );
      return res;
    } catch (err) {
      return err;
    }
  }

  async function getWishList() {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { headers }
      );
      return res;
    } catch (err) {
      return err;
    }
  }

  async function deleteItemFromWishList(id) {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
          headers,
        }
      );
      return res;
    } catch (err) {
      return err;
    }
  }

  async function getUserOrders(id) {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        {
          headers,
        }
      );
      return res;
    } catch (err) {
      return err;
    }
  }

  return (
    <APIsContext.Provider
      value={{
        addToCart,
        getCart,
        getProducts,
        deleteItem,
        clearCart,
        updateCart,
        numOfCartItems,
        setNumOfCartItems,
        onlinePayment,
        cartId,
        setCartId,
        addToWishList,
        getWishList,
        deleteItemFromWishList,
        getUserOrders,
      }}
    >
      {children}
    </APIsContext.Provider>
  );
}

'use client'

import Image from 'next/image';
import React, { useContext } from 'react';
import axios from "axios";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { APIsContext } from '@/app/(Context)/APIsContext';

async function ProductId({ params }) {
  const productId = params.productId;
  let { addToCart} = useContext(APIsContext);

  async function getProductDetails() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
      return data?.data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  }

  const productDetails = await getProductDetails();

  if (!productDetails) {
    return <div>Error loading product details.</div>;
  }

  async function addToCartFunc(id) {
    let res = await addToCart(id);

  }
  return (
    <>
      <div className="container py-5 px-4">
        <div className="row">
          <div className="col-md-3">
            <Image
              width={650}
              height={550}
              src={productDetails.imageCover}
              className="w-100 rounded-4"
              alt={productDetails.title}
            />
          </div>
          <div className="col-md-8 d-flex align-items-center justify-content-center">
            <div className="details">
              <p className="fw-bold">{productDetails.title}</p>
              <p className="font-sm text-main">{productDetails.description}</p>
              <p>{productDetails.category.name}</p>
              <div className="price/rate d-flex justify-content-between">
                <p>
                  Price: {productDetails.price}{" "}
                  <span className="fw-bold font-sm">EGP</span>
                </p>
                <p>
                  {productDetails.ratingsAverage}{" "}<FontAwesomeIcon icon={faStar}  className='text-warning' />
                  <span>
                    <i className="fa-solid fa-star rating-color"></i>
                  </span>
                </p>
              </div>
              <button
                className="btn btn-secondary w-100 fw-bold my-3 bg-main text-white"
                onClick={() => { addToCartFunc(productDetails._id) }}
              >
                Add To Cart +
              </button>
              <Link href={'/'}>
                <button className="btn w-100 fw-bold btn-outline-success">
                  Add More Items
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductId;

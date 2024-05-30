"use client";
import React from "react";
import Head from "next/head";
import useApi from "@/app/(CustomHooks)/useApi";
import Image from "next/image";

export default function Brands() {
  const { data } = useApi("brands");
  // console.log(data);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Brands</title>
      </Head>

      <div className="brands my-5 container">
        <h1 className="text-center fw-bolder fa-3x">All Brands</h1>
        <div className="row row-cols-md-2 row-cols-1">
          {data?.data?.map((brand) => (
            <div
              key={brand._id}
              className="col-6 col-md-4 col-lg-3 col-xl-2 cursor-pointer brand my-3 rounded-4"
            >
              <div className="d-block shadow rounded-4">
                <Image
                  src={brand.image}
                  className="w-100"
                  alt="brand-image"
                  width={300}
                  height={300}
                />
              </div>
              <h3 className="text-center fw-bold mt-2">{brand.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

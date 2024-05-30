"use client";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { APIsContext } from "../(Context)/APIsContext";
import { UserToken } from "../(Context)/UserToken";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";

function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { isLogin } = useContext(UserToken);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart, setNumOfCartItems, addToWishList, getProducts } =
    useContext(APIsContext);
  const router = useRouter();

  async function addToCartFunc(id) {
    let res = await addToCart(id);

    if (isLogin) {
      toast.success(res?.data?.message);
    } else {
      toast.error(res?.response?.data?.message);
      router.push("/login");
    }
    setNumOfCartItems(res?.data?.numOfCartItems);
  }

  useEffect(() => {
    async function getProductsFunc() {
      try {
        const { data } = await getProducts();
        const res = data?.data;

        // Sort products (custom sort not ascending or descending order)
        const sortedProducts = res.sort(
          (a, b) => b.ratingsAverage - a.ratingsAverage - 1
        );

        setAllProducts(sortedProducts);
        setFilteredProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getProductsFunc();
  }, [getProducts]);

  useEffect(() => {
    setFilteredProducts(
      allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, allProducts]);

  async function addToWishListFunc(id) {
    await addToWishList(id);
  }

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <div className="container my-5">
        <h1 className="text-center mb-4">Latest Products</h1>

        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          {filteredProducts.map((product, idx) => (
            <div key={idx} className="col-6 col-md-4 col-lg-3 col-xl-2 mb-4">
              <div className="product border p-3 rounded-4 position-relative">
                <div className="position-absolute top-0 end-0 m-2 z-2 heart-icon">
                  <FontAwesomeIcon
                    icon={faHeart}
                    onClick={() => addToWishListFunc(product._id)}
                  />
                </div>
                <Link href={`/productdetails/${product?.id}`}>
                  <div className="position-relative">
                    <Image
                      className="w-100 mb-2"
                      src={product?.imageCover}
                      alt={product?.title}
                      width={500}
                      height={200}
                      priority={idx < 4} // Mark the first few images as priority
                    />
                    <hr />
                    <h6 className="text-success">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h6>
                    <div className="product-price fa-sm align-items-center d-flex justify-content-between my-3">
                      <span className="fw-bolder text-dark ">
                        {product.price} EGP
                      </span>
                      <span>
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-warning"
                        />{" "}
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </div>
                </Link>

                <button
                  className="btn btn-secondary w-100"
                  onClick={() => {
                    addToCartFunc(product?._id);
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;

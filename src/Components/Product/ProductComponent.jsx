import "./ProductComponent.css"
import React, { useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Loader from "../Loader/Loader"
import ActionBtn from "../ActionBtn/ActionBtn";
import { useProductData } from "../../js/utilityFn";

const ProductComponent = () => {
  const { product_id } = useParams();
  const [productData, setProductData, isFetchingRef] = useProductData(product_id)
  const [displayImg, setDisplayImg] = useState(productData.images[0])
  const navigate = useNavigate();


  useEffect(() => {
    setDisplayImg(productData.images[0])
  }, [productData.images[0]])

  return (
    <div className="product_data_container">
      {isFetchingRef ? (
        <Loader />
      ) : (
        <>
          <div className="product_images_container">
            <div className="product_image_container">
              <img
                src={displayImg}
                alt={productData.artName}
                className="product_image"
              />
            </div>
            <div className="product_images_secondary_container">
              {productData.images.map((image, idx) => (
                <div
                  className="product_sub_image popup"
                  key={idx}
                  onClick={() => setDisplayImg(image)}
                >
                  <img
                    src={image}
                    alt={productData.artName}
                    className="img_sizing"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="product_details_container">
            <h1 className="main_para_styling product_name">
              {productData.artName}
            </h1>
            <div>
              <p className="sub_para_styling product_price_label">
                Price: {" "}
                <span className="product_price">
                  {productData.artPrice} ₹
                </span>
              </p>
            </div>

            <div className="product_details">
              <p className="product_description">
                <span style={{ fontWeight: 500 }}>
                  Description: {" "}
                </span>
                {productData.artDetails}
              </p>
            </div>
            <div className="product_details">
              <p className="product_description">
                <span style={{ fontWeight: 500 }}>
                  Material Used: {" "}
                </span>
                {productData.materialUsed}
              </p>
            </div>
            <div className="product_details">
              <p className="product_description">
                <span style={{ fontWeight: 500 }}>
                  Dimensions: {" "}
                </span>
                {productData.dimensions}
              </p>
            </div>

            <div className="product_btns">
              <div className="product_buy_btn">
                <ActionBtn text="Buy Now" target={`/buy-now/${product_id}`} />
              </div>
              <div>
                <button
                  className="add_to_cart_btn popup"
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <Link to="/contact" style={{marginTop: "40px"}}>
              Contact Seller
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductComponent
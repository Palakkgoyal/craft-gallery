import "./BuyNow.css"
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { useProductData } from "../../js/utilityFn";
import Address from "./Address";
import OrderSummary from "./OrderSummary";
import { db, auth } from "../../lib/firebase";


const BuyNowComponent = () => {
    const { product_id } = useParams();
    const [productData, setProductData, isFetchingRef] = useProductData(product_id)
    const addressData = useAddress()
    const navigate = useNavigate()

    return (
        <div className="buy_now_main_container">
            <div
                className="buy_now_product_container"
                onClick={() => navigate(`/gallery/${product_id}`)}
            >
                <div className="buy_now_product_img">
                    <img
                        src={productData.images[0]}
                        alt={productData.artName}
                        className="img_sizing"
                    />
                </div>
                <div>
                    <h1 className="buy_now_product_name">
                        {productData.artName}
                    </h1>
                    <p className="big_screen_description">
                        {productData?.artDetails?.substring(0, 135)}
                        <span style={{ fontWeight: "bold" }}>...</span>
                    </p>
                    <p className="small_screen_description">
                        {productData?.artDetails?.substring(0, 55)}
                        <span style={{ fontWeight: "bold" }}>...</span>
                    </p>
                </div>
            </div>
            <OrderSummary price={productData.artPrice} />
            <div>
                {!addressData ? (
                    <div className="old_address address_container">
                        <h3>{addressData.city} ({addressData.state})</h3>
                        <p>
                            {addressData.pincode}
                        </p>
                        <p>
                           {addressData.area}, {" "}
                           {addressData.landmark} 
                        </p>
                        <p>
                            {addressData.mobile_number}, {addressData.full_name}
                        </p>
                    </div>
                ) : (
                    <Address />
                )}
            </div>
        </div>
    )
}

export default BuyNowComponent


function useAddress() {
    // const [addressAvailable, setAddressAvailable] = useState(true)
    const [addressData, setAddressData] = useState(null)

    useEffect(() => {
        const workRef = db.collection("address").doc(auth?.currentUser?.uid);

        const unsubscribe = workRef.onSnapshot((doc) => {
            if (doc.exists) {
                setAddressData(doc.data());
            } else {
                setAddressData(null);
            }
        });

        return unsubscribe
    }, [])

    return addressData
}
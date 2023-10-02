import "./BuyNow.css"
import { useParams, useNavigate } from "react-router-dom"
import { useProductData } from "../../js/utilityFn";
import Address from "./Address";
import OrderSummary from "./OrderSummary"; 
import ActionBtn from "../ActionBtn/ActionBtn"


const BuyNowComponent = () => {
    const { product_id } = useParams();
    const [productData, setProductData, isFetchingRef] = useProductData(product_id)
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
                <Address />
            </div>
        </div>
    )
}

export default BuyNowComponent

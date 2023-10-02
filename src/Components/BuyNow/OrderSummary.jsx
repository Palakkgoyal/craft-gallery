import { useState } from "react"

const OrderSummary = ({ price }) => {
    const [quantity, setQuantity] = useState(1)

    const orderTotal = (price * quantity) + 50

    return (
        <>
            <label className="buy_now_product_quantity" htmlFor="product_quantity">
                <p>
                    Quantity:
                </p>
                <input
                    type="number"
                    name="product_quantity"
                    id="product_quantity"
                    min={1}
                    max={50}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="buy_now_product_quantity_input"
                />
            </label>
            <div className="order_summary_container">
                <div className="order_summary_field">
                    <h4>
                        Subtotal
                    </h4>
                    <p>
                        {price*quantity} ₹
                    </p>
                </div>
                <div className="order_summary_field">
                    <h4>
                        Shipping
                    </h4>
                    <p>
                        50 ₹
                    </p>
                </div>
                <div className="order_summary_field">
                    <h4>
                        Total
                    </h4>
                    <p className="order_total">
                        {orderTotal} ₹
                    </p>
                </div>
            </div>
        </>
    )
}

export default OrderSummary

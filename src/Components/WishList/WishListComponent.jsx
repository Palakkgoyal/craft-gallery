import "./WishListComponent.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../../lib/firebase"

const WishListComponent = () => {
    const products = useFavProducts()
    const navigate = useNavigate()

    return (
        <div className="wishlist_main_container">
            <div className="wishlist_sub_container">
                {products.map((item, idx) => {
                    const { images, artDetails, artName, artPrice, id } = item
                    return (
                        <div
                            className="fav_item_container"
                            key={id}
                            onClick={() => navigate(`/gallery/${id}`)}
                        >
                            <div className="fav_img_container">
                                <img src={images[0]} alt={artName} className="img_sizing" />
                            </div>
                            <div>
                                <h2 className="fav_name">
                                    {artName}
                                </h2>
                                <p>
                                    {artDetails.substring(0, 100)}
                                    <span style={{ fontWeight: "bolder" }}>...</span>
                                </p>
                                <p>
                                    {artPrice}₹
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default WishListComponent

function useFavProducts() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const localFavArr = localStorage.getItem("favArr")
        const favUidArr = localFavArr ? JSON.parse(localFavArr) : [];

        const fetchProducts = async () => {
            const productPromises = favUidArr.map(async (id) => {
                const docRef = db.collection('work').doc(id);
                const docSnapshot = await docRef.get();

                if (docSnapshot.exists) {
                    return { id: id, ...docSnapshot.data() }
                } else {
                    return null; // Document doesn't exist
                }
            });

            const products = await Promise.all(productPromises);
            setProducts(products.filter((product) => product !== null));
        };

        fetchProducts();
    }, [])

    return products

}

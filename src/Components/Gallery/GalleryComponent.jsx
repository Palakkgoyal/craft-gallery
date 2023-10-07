import React, { useState, useEffect, useRef } from "react"
import "./GalleryComponent.css"
import { db } from "../../lib/firebase"
import isOwner from "../../js/Owner"
import AddWork from "./AddWork"
import Loader from "../Loader/Loader"
import { useNavigate } from "react-router-dom"
import { handleAddToFav, handleRemoveFav } from "../../js/utilityFn"
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

const GETPOSTCOUNT = 10;

const GalleryComponent = () => {
    const [addWork, setAddWork] = useState(false)
    const [workDocuments, setWorkDocuments, isFetching] = useWorkData();
    const [favArr, setFavArr] = useState([])
    const navigate = useNavigate();


    useEffect(() => {
        const localFavArr = localStorage.getItem("favArr");
        const tempArr = localFavArr ? JSON.parse(localFavArr) : [];
        setFavArr(tempArr)
    }, [])

    return (
        <div className="gallery_container">
            {isOwner() && (
                <button
                    className="add_work_btn"
                    onClick={() => setAddWork(prev => !prev)}
                >
                    {addWork ? "Close it" : "Add New Work"}
                </button>
            )}
            {addWork && <AddWork />}
            <div>
                <h2 className="gallery_heading">
                    Work
                </h2>
            </div>
            {!isFetching ? (
                <div className="display_img_container gallery_display_product_container">
                    {workDocuments.map(doc => (
                        <div className="gallery_product_container">
                            <div className="gallery_image_container display_img_box" key={doc.id}>
                                <img
                                    src={doc.images[0]}
                                    alt={doc.name}
                                    className="display_img gallery_image"
                                    onClick={() => navigate(doc.id)}
                                />
                                {favArr.includes(doc.id) ? (
                                    <BsSuitHeartFill
                                        onClick={() => handleRemoveFav(doc.id, favArr, setFavArr)}
                                        className="display_img_set_fav_btn popup"
                                    />
                                ) : (
                                    <BsSuitHeart
                                        onClick={() => handleAddToFav(doc.id, favArr, setFavArr)}
                                        className="display_img_set_fav_btn popup"
                                    />
                                )}
                            </div>
                            <div className="gallery_product_data">
                                <h2 className="fav_name">
                                    {doc.artName}
                                </h2>
                                <p>
                                    {doc.artDetails.substring(0, 100)}
                                    <span style={{ fontWeight: "bolder" }}>...</span>
                                </p>
                                <p className="product_price">
                                    {doc.artPrice}₹
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default GalleryComponent



function useWorkData() {
    const [workDocuments, setWorkDocuments] = useState([]);
    const [loadMorePosts, setLoadMorePosts] = useState(false);
    const isFetchingRef = useRef(true)

    useEffect(() => {
        // Define a reference to your Firestore collection
        const workCollectionRef = db.collection('work');
        // Fetch documents from the collection
        const unsubscribe = workCollectionRef.onSnapshot((snapshot) => {
            const data = [];
            snapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            setWorkDocuments(data);
        })
        isFetchingRef.current = false;
        return () => { unsubscribe() };
    }, []);

    // useEffect(() => {
    //     const handleMouseScroll = (event) => {
    //       if (
    //         window.innerHeight + event.target.documentElement.scrollTop + 1 >=
    //         event.target.documentElement.scrollHeight
    //       ) {
    //         setLoadMorePosts(true);
    //       }
    //     };
    //     window.addEventListener("scroll", handleMouseScroll);
    //     const unsubscribe = db
    //       .collection("work")
    //       .orderBy("desc")
    //       .limit(PAGESIZE)
    //       .onSnapshot((snapshot) => {
    //         setLoadingPosts(false);
    //         setWorkDocuments(
    //           snapshot.docs.map((doc) => ({
    //             id: doc.id,
    //             ...doc.data(),
    //           })),
    //         );
    //       });
    
    //     return () => {
    //       window.removeEventListener("scroll", handleMouseScroll);
    //       unsubscribe();
    //     };
    //   }, []);

    return [workDocuments, setWorkDocuments, isFetchingRef.current]
}


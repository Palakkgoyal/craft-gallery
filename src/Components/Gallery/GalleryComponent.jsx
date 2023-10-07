import React, { useState, useEffect, useRef } from "react"
import "./GalleryComponent.css"
import { db } from "../../lib/firebase"
import isOwner from "../../js/Owner"
import AddWork from "./AddWork"
import Loader from "../Loader/Loader"
import { useNavigate } from "react-router-dom"
import { handleAddToFav, handleRemoveFav } from "../../js/utilityFn"
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

const GETPOSTCOUNT = 5;

const GalleryComponent = () => {
    const [addWork, setAddWork] = useState(false)
    const [workDocuments, setWorkDocuments] = useWorkData();
    const [favArr, setFavArr] = useState([])
    const navigate = useNavigate();

    let reversedWorkDocs = [...workDocuments]
    reversedWorkDocs = reversedWorkDocs.reverse()


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
            <div className="display_img_container gallery_display_product_container">
                {reversedWorkDocs.map(doc => (
                    <div className="gallery_product_container" key={doc.id}>
                        <div className="gallery_image_container display_img_box">
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
        </div>
    )
}

export default GalleryComponent



function useWorkData() {
    const [workDocuments, setWorkDocuments] = useState([]);
    const [loadMorePosts, setLoadMorePosts] = useState(false);
    const [isLastPostRecieved, setIsLastPostRecieved] = useState(false);
    const handleMouseScroll = (event) => {
        if (
            window.innerHeight + event.target.documentElement.scrollTop + 1 >=
            event.target.documentElement.scrollHeight && !isLastPostRecieved
        ) {
            setLoadMorePosts(true);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleMouseScroll);
        const unsubscribe = db
            .collection("work")
            .orderBy("timestamp")
            .limitToLast(GETPOSTCOUNT)
            .onSnapshot((snapshot) => {
                setLoadMorePosts(false);
                setWorkDocuments(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    })),
                );
            });

        return () => {
            window.removeEventListener("scroll", handleMouseScroll);
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        let unsubscribed = false;

        if (loadMorePosts && workDocuments.length > 0) {
            const lastPostCreatedAt = workDocuments[0].timestamp;
            db.collection("work")
                .orderBy("timestamp")
                .endBefore(lastPostCreatedAt)
                .limitToLast(GETPOSTCOUNT)
                .onSnapshot((snapshot) => {
                    if (!unsubscribed) {
                        setWorkDocuments((workDocuments) => {
                            return [
                                ...snapshot.docs.map((doc) => ({
                                    id: doc.id,
                                    ...doc.data(),
                                })),
                                ...workDocuments,
                            ];
                        });

                        if (snapshot.empty) {
                          setIsLastPostRecieved(true);
                        }
                    }
                });
        }

        return () => {
            setLoadMorePosts(false);
            unsubscribed = true;
        };
    }, [loadMorePosts]);


    return [workDocuments, setWorkDocuments]
}


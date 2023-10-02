import React, { useState, useEffect, useRef } from "react"
import "./GalleryComponent.css"
import { db } from "../../lib/firebase"
import isOwner from "../../js/Owner"
import AddWork from "./AddWork"
import Loader from "../Loader/Loader"
import { useNavigate } from "react-router-dom"

import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";


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

    function handleAddToFav(id) {
        setFavArr(prev => [...prev, id])
        localStorage.setItem("favArr", JSON.stringify(favArr))
    }

    function handleRemoveFav(id) {
        const idx = favArr.indexOf(id);
        if (idx === -1) return;

        const tempArr = [...favArr];
        tempArr.splice(idx, 1);
        setFavArr(tempArr)
        localStorage.setItem("favArr", JSON.stringify(tempArr))
    }

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
                <div className="display_img_container">
                    {workDocuments.map(doc => (
                        <div className="gallery_image_container display_img_box" key={doc.id}>
                            <img
                                src={doc.images[0]}
                                alt={doc.name}
                                className="display_img gallery_image"
                                onClick={() => navigate(doc.id)}
                            />
                            {favArr.includes(doc.id) ? (
                                <BsSuitHeartFill
                                    onClick={() => handleRemoveFav(doc.id)}
                                    className="display_img_set_fav_btn popup"
                                />
                            ) : (
                                <BsSuitHeart
                                    onClick={() => handleAddToFav(doc.id)}
                                    className="display_img_set_fav_btn popup"
                                />
                            )}
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

    return [workDocuments, setWorkDocuments, isFetchingRef.current]
}
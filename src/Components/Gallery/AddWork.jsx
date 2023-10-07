import React, { useState, useRef, useEffect } from "react"
import handleChange, { validateImg, uploadImage } from "../../js/utilityFn"
import { db } from "../../lib/firebase"
import ActionBtn from "../ActionBtn/ActionBtn"
import Loader from "../Loader/Loader"
import firebase from "firebase/compat/app";
import { toast } from 'react-toastify';

const AddWork = () => {
    const imgUrlRef = useRef(null)
    const [uploading, setUploading] = useState(false)
    const [imageUpload, setImageUpload] = useState([])
    const [isValidImage, setIsValidimage] = useState(true)
    const [artData, setArtData] = useState(initArtData)
    const { artName, artPrice, artDetails, dimensions, stripeProductId, category } = artData;

    function checkImg(e) {
        const images = e.target.files;

        if (images.length > 4) {
            toast.error("Please select 4 or less images!", {
                position: toast.POSITION.TOP_RIGHT
            })
            return;
        }
        for (const img of images) {
            if (validateImg(img)) {
                setImageUpload(prev => [...prev, img]);
                continue;
            }

            setIsValidimage(false);
            setImageUpload([]);
            return;
        }
    }

    async function uploadWorkImg() {
        if (imageUpload.length < 1 || !isValidImage) {
            setUploading(false);
            return;
        }

        let imgUrlArr = [];
        for (const img of imageUpload) {
            const imgUrl = await uploadImage(img)
            imgUrlArr.push(imgUrl)
        }

        if (imgUrlArr) {
            imgUrlRef.current = imgUrlArr;
            await uploadWork();
        } else {
            setUploading(false);
        }
    }

    async function uploadWork() {
        const workCollection = db.collection('work');

        // Data to be added to the document
        const workData = { 
            ...artData, 
            images: imgUrlRef.current,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }

        // Add the document with an automatically generated ID
        workCollection.add(workData)
            .then((docRef) => {
                setArtData(initArtData)
                setImageUpload([]);
                imgUrlRef.current = null;
                toast.success("Successfully work uploaded!", {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            })
            .finally(() => setUploading(false))

    }

    return (
        <div className="add_art_container">
            <form action="" className="add_art_sub_container">
                <div className="add_art_img_container">
                    <input
                        type="file"
                        onChange={checkImg}
                        id="add_art_file"
                        name="add_art_file"
                        style={{ display: "none" }}
                        required
                        disabled={uploading}
                        multiple
                    />

                    <label htmlFor="add_art_file" className="">
                        <p className="add_art_img_label">+</p>
                    </label>
                    <div className="add_art_images_container display_img_container">
                        {imageUpload.length >= 1 && (
                            imageUpload.map((img, idx) => (
                                <div className="display_img_box" key={idx}>
                                    <img
                                        src={URL.createObjectURL(img)}
                                        className="display_img gallery_image"
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="add_art_text_input_container">
                    <div className="add_art_input_container">
                        <label htmlFor="artName" className="sub_para_styling add_art_input_label">
                            Name of Art
                        </label>
                        <input
                            type="text"
                            id="artName"
                            name="artName"
                            value={artName}
                            onChange={(e) => handleChange(e, setArtData)}
                            className="form_field add_art_input"
                            required
                            maxLength={120}
                            disabled={uploading}
                        />
                    </div>
                    <div className="add_art_input_container">
                        <label htmlFor="artPrice" className="sub_para_styling add_art_input_label">
                            Price
                        </label>
                        <input
                            type="number"
                            id="artPrice"
                            name="artPrice"
                            value={artPrice}
                            onChange={(e) => handleChange(e, setArtData)}
                            className="form_field add_art_input"
                            required
                            min={0}
                            disabled={uploading}
                        />
                    </div>
                    <div className="add_art_input_container">
                        <label htmlFor="artDetails" className="sub_para_styling add_art_input_label">
                            Description
                        </label>
                        <textarea
                            name="artDetails"
                            id="artDetails"
                            value={artDetails}
                            cols="30"
                            rows="6"
                            onChange={(e) => handleChange(e, setArtData)}
                            className="form_field add_art_input"
                            maxLength={2000}
                            required
                            disabled={uploading}
                        />
                    </div>
                    <div className="add_art_input_container">
                        <label htmlFor="artDetails" className="sub_para_styling add_art_input_label">
                            Dimensions
                        </label>
                        <input
                            type="text"
                            id="dimensions"
                            name="dimensions"
                            value={dimensions}
                            onChange={(e) => handleChange(e, setArtData)}
                            className="form_field add_art_input"
                            maxLength={100}
                            required
                            disabled={uploading}
                        />
                    </div>
                    <div className="add_art_input_container">
                        <label
                            htmlFor="stripeProductId"
                            className="sub_para_styling add_art_input_label"
                        >
                            Stripe Product Id
                        </label>
                        <input
                            type="text"
                            id="stripeProductId"
                            name="stripeProductId"
                            value={stripeProductId}
                            onChange={(e) => handleChange(e, setArtData)}
                            className="form_field add_art_input"
                            maxLength={200}
                            minLength={5}
                            required
                            disabled={uploading}
                        />
                    </div>
                    <div className="add_art_input_container">
                        <label
                            htmlFor="category"
                            className="sub_para_styling add_art_input_label"
                        >
                            Category
                        </label>
                        <select
                            name="category"
                            id="category"
                            value={category}
                            className="sub_para_styling add_art_input_label add_art_select_category"
                            onChange={(e) => handleChange(e, setArtData)}
                        >
                            <option value="">-- Choose --</option>
                            {resinItems.map((item) => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <ActionBtn
                        text="Add Now"
                        onClick={async () => {
                            setUploading(true)
                            await uploadWorkImg()
                        }}
                        disabled={uploading}
                    />
                </div>
                {uploading && <Loader />}
            </form>
        </div>
    )
}

export default AddWork


const initArtData = {
    artName: "",
    artPrice: 0,
    artDetails: "",
    materialUsed: "",
    dimensions: "",
    stripeProductId: "",
    category: "",
}

const resinItems = [
    "Resin frames",
    "Resin jewellery",
    "Resin Keychain",
    "Resin Name stand",
    "Resin Name plate",
    "Resin Clock",
    "Resin bookmark",
    "Resin coaster",
    "Resin tray",
    "Resin Hair accessories",
    "Resin phone case",
    "Resin Tilak thali",
    "Resin Rakhi's",
    "Aesthetic Phone Case",
    "Vintage glass frame",
    "Gift hamper",
    "Embroidery hoop",
    "Wedding hoop",
    "Photo hoop",
    "Acrylic plaque",
    "String Art"
  ];
  
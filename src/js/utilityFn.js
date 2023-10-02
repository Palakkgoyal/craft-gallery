import { toast } from 'react-toastify'; // For validateImg() function
import { useState, useRef, useEffect } from 'react'; // For useProductData() function

// ----------------- For uploadImage() function ----------------- 
import { storage, db } from "../lib/firebase"
import { v4 } from "uuid"
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage"

export default function handleChange(event, setFormData) {
  setFormData(prevFormData => {
    return {
      ...prevFormData,
      [event.target.name]: event.target.value
    }
  })
}

function validateImg(img) {
  if (!img?.name?.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
    toast.error("Please select valid image!", {
      position: toast.POSITION.TOP_RIGHT
    })
    return false;
  }

  return true;
}

async function uploadImage(img) {
  const imageRef = ref(storage, `images/${img.name + v4()}`);

  try {
    const snapshot = await uploadBytes(imageRef, img);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (err) {
    console.error(`err: ${err}`);
    return err;
  }
}

function useProductData(uid) {
  const [productData, setProductData] = useState({
    images: [],
  })
  const isFetchingRef = useRef(true);

  useEffect(() => {
    const workRef = db.collection("work").doc(uid);

    const unsubscribe = workRef.onSnapshot((doc) => {
      if (doc.exists) {
        setProductData(doc.data());
      } else {
        setProductData(null);
      }

      isFetchingRef.current = false;
    });

    return unsubscribe
  }, [uid])

  return [productData, setProductData, isFetchingRef.current]
}

function handleAddToFav(id,favArr, setFavArr) {
  const tempArr = [...favArr, id]
  setFavArr(tempArr)
  localStorage.setItem("favArr", JSON.stringify(tempArr))
}

function handleRemoveFav(id, favArr, setFavArr) {
  const idx = favArr.indexOf(id);
  if (idx === -1) return;

  const tempArr = [...favArr];
  tempArr.splice(idx, 1);
  setFavArr(tempArr)
  localStorage.setItem("favArr", JSON.stringify(tempArr))
}

export { validateImg, uploadImage, useProductData, handleAddToFav, handleRemoveFav }
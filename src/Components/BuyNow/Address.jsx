import React from 'react'
import { useState } from 'react'
import { auth, db } from '../../lib/firebase'
import handleChange from "../../js/utilityFn"
import ActionBtn from '../ActionBtn/ActionBtn'
// import firebase from 'firebase/app';
import 'firebase/firestore';
import { toast } from 'react-toastify';

const Address = () => {
    const [addressData, setAddressData] = useState({
        a_full_name: "",
        a_mobile_number: "",
        a_flat_no: "",
        a_area: "",
        a_landmark: "",
        a_pincode: "",
        a_city: "",
        a_state: "",
    })

    const data = {
        full_name: addressData.a_full_name,
        mobile_number: addressData.a_mobile_number,
        flat_no: addressData.a_flat_no,
        area: addressData.a_area,
        landmark: addressData.a_landmark,
        pincode: addressData.a_pincode,
        city: addressData.a_city,
        state: addressData.a_state,
    }

    async function addAddress() {
        // const addressCollection = db.collection("address");
        // await addressCollection.doc(auth.currentUser.uid).set({})
    //     const usersCollection = db.collection('users');
    //     const userId = auth?.currentUser?.uid;
    //     usersCollection
    //         .doc(userId)
    //         .update({
    //             address: firebase.firestore.FieldValue.arrayUnion(data),
    //         })
    //         .then(() => {
    //             // const ordersCollection = db.collection("order");
    //             // await addressCollection.doc(auth.currentUser.uid).set({

    //             // })
    //             toast.success("Added address successfully", {
    //                 position: toast.POSITION.TOP_RIGHT
    //             })
    //         })
    // .catch((err) => {
    //     toast.error("Error while ordering", {
    //         position: toast.POSITION.TOP_RIGHT
    //     })
    // })
    }

return (
    <form action="" className="address_form_container">
        <div className="address_container">
            <div className="address_header">
                <h2>Address</h2>
            </div>

            <div className="address_field_container">
                <label htmlFor="a_full_name">
                    Full name (First and Last name)
                </label>
                <input
                    type="text"
                    maxLength={100}
                    minLength={3}
                    id="a_full_name"
                    name="a_full_name"
                    required
                    value={addressData.a_full_name}
                    onChange={(e) => handleChange(e, setAddressData)}
                />
            </div>
            <div className="address_field_container">
                <label htmlFor="a_mobile_number">
                    Mobile Number
                </label>
                <input
                    type="tel"
                    id="a_mobile_number"
                    name="a_mobile_number"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    minLength={10}
                    required
                    value={addressData.a_mobile_number}
                    onChange={(e) => handleChange(e, setAddressData)}
                />
            </div>
            <div className="address_field_container">
                <label htmlFor="a_flat_no">
                    Flat, House no., Building, Company, Apartment
                </label>
                <input
                    type="text"
                    maxLength={200}
                    minLength={1}
                    id="a_flat_no."
                    name="a_flat_no"
                    required
                    value={addressData.a_flat_no}
                    onChange={(e) => handleChange(e, setAddressData)}
                />
            </div>
            <div className="address_field_container">
                <label htmlFor="a_area">
                    Area, Street, Sector, Village
                </label>
                <input
                    type="text"
                    maxLength={200}
                    minLength={1}
                    id="a_area"
                    name="a_area"
                    required
                    value={addressData.a_area}
                    onChange={(e) => handleChange(e, setAddressData)}
                />
            </div>
            <div className="address_field_container">
                <label htmlFor="a_landmark">
                    Landmark
                </label>
                <input
                    type="text"
                    maxLength={150}
                    minLength={1}
                    id="a_landmark"
                    name="a_landmark"
                    value={addressData.a_landmark}
                    onChange={(e) => handleChange(e, setAddressData)}
                />
            </div>
            <div className="address_field_container">
                <label htmlFor="a_pincode">
                    Pincode
                </label>
                <input
                    type="tel"
                    id="a_pincode"
                    name="a_pincode"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    minLength={6}
                    required
                    value={addressData.a_pincode}
                    onChange={(e) => handleChange(e, setAddressData)}
                />
            </div>
            <div className="address_field_container">
                <label htmlFor="a_city">
                    Town/City
                </label>
                <input
                    type="text"
                    maxLength={150}
                    minLength={2}
                    id="a_city"
                    name="a_city"
                    value={addressData.a_city}
                    onChange={(e) => handleChange(e, setAddressData)}
                />
            </div>
            <div className="address_field_container">
                <label htmlFor="a_state">
                    State
                </label>
                <input
                    type="text"
                    maxLength={150}
                    minLength={2}
                    id="a_state"
                    name="a_state"
                    value={addressData.a_state}
                    onChange={(e) => handleChange(e, setAddressData)}
                />
            </div>
        </div>
        <ActionBtn text="Continue to Payment" type="submit" onClick={addAddress} />
    </form>
)
}

export default Address

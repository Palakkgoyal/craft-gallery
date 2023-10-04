import "./ProfileComponent.css"
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { auth, db } from "../../lib/firebase"
import ActionBtn from "../ActionBtn/ActionBtn"

const ProfileComponent = () => {
    const navigate = useNavigate()

    const { displayName, email, photoURL } = auth?.currentUser

    function handleLogOut() {
        auth.signOut()
            .then(function () {
                console.log("Sign-out successful")
                navigate("/")
            })
            .catch(function (error) {
                console.error(error, err)
            });
    }

    return (
        <div className="profile_container">
            <div className="user_details_container">
                <div className="profile_image_container">
                    <img
                        src={photoURL}
                        alt={displayName}
                        className="img_sizing"
                    />
                </div>
                <div className="user_text_details_container">
                    <h2 className="user_name">
                        {displayName}
                    </h2>
                    <p className="user_email">
                        {email}
                    </p>
                    <div>
                        <ActionBtn text="Logout" onClick={handleLogOut} />
                    </div>
                </div>
            </div>

            <div>
                <button
                    className="wishlist_btn popup"
                    onClick={() => navigate("/wishlist")}
                >
                    See Your Wishlist
                </button>
            </div>
            <div className="orders_main_container">
                <div>
                    <h2 className="profile_heading">
                        Your Orders
                    </h2>
                </div>
                <div className="orders_list">
                    <p className="nothing_in_order_note">
                        You haven't ordered anything yet...
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProfileComponent


// function useFetchData() {
//     const [data, setData] = useState({})

//     useEffect(() => {
//         const unsubscribe = db.collection("users")
//             .doc(auth?.currentUser?.uid)
//             .onSnapshot((doc) => {
//                 console.log("fetching")
//                 setData(doc.data());
//             });

//         return () => {
//             unsubscribe(); // Unsubscribe from the Firebase listener.
//         };
//     }, [])

//     return [data, setData];
// }

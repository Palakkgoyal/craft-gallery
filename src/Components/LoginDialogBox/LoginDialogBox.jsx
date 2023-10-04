import "./LoginDialogBox.css"
import GoogleButton from 'react-google-button'
import { ImCross } from "react-icons/im";
import { auth, db, googleProvider, fbProvider, twitterProvider } from "../../lib/firebase";

import { FaFacebookF } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const LoginDialogBox = ({ handleShowForm }) => {

  return (
    <div className="login_dialog_box_container">
      <h2>
        SignUp/LogIn
      </h2>
      <ImCross onClick={handleShowForm} className="auth_close_icon" />
      <div className="auth_google_btn_container fb_btn_container">
        <button
        className="sign_in_btn"
          onClick={() => {
            signInWithProvider(fbProvider)
            handleShowForm()
          }}
        >
          <FaFacebookF className="auth_icon" />
          <span>
            Continue With Facebook
          </span>
        </button>
      </div>
      <div className="auth_google_btn_container">
        <GoogleButton
          onClick={() => {
            signInWithProvider(googleProvider)
            handleShowForm()
          }}
        />
      </div>
    </div>
  )
}

export default LoginDialogBox


function signInWithProvider(provider) {

  auth
    .signInWithPopup(provider)
    .then(async (val) => {
      const userRef = db.collection("users").where("uid", "==", val?.user?.uid);
      const docSnap = await userRef.get();
      if (docSnap.docs.length < 1) {
        const userDoc = db.collection("users");
        await userDoc.doc(auth.currentUser.uid).set({
          uid: val.user.uid,
          name: val.user.displayName,
          photoURL: val.user.photoURL,
          address: "",
          contactNumber: null,
        });
      }
    })
    .catch((error) => {
      if (error.code === "auth/account-exists-with-different-credential") {
        console.error("Account exists with a different credential")
      } else {
        console.error("Error", error.message)
      }
    });
}
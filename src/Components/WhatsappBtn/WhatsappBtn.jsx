import "./WhatsappBtn.css"
import { FaWhatsappSquare } from "react-icons/fa";

const WhatsappBtn = () => {
    return (
        <div className="whatsapp_btn_contianer">
            <a href="https://wa.me/+918989517165">
                <FaWhatsappSquare className="whatsapp_icon popup" />
            </a>
        </div>
    )
}

export default WhatsappBtn

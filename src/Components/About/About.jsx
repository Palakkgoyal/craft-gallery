import "./About.css"
import ActionBtn from '../ActionBtn/ActionBtn'
import { ownerImg } from '../../assets'
import FAQ from "../FAQ/FAQ"
import { useState } from "react"

const AboutComponent = () => {
    const [isReadMore, setIsReadMore] = useState(false)

    return (
        <div>
            <div className="about_container">
                <img src={ownerImg} alt="Mahi Desarla" className="about_img" />
                <div className="about_text_container">
                    <h3 className="main_para_styling about_main_text">
                        Hello, I am Mahi Desarla,
                        <br />
                        An Entrepreneur and
                        Vice Captain of The Art and Craft Club at
                        Banasthali Vidyapith
                    </h3>
                    <p className="sub_para_styling about_para">
                        {aboutText}
                    </p>
                    <p className="about_para">
                        <br />
                    </p>
                    <p className="about_para_small sub_para_styling">
                        {isReadMore? aboutText : aboutText.substring(0, 351)}
                        {" "}
                        {!isReadMore && (
                            <span style={{ fontWeight: 500 }}>...</span>
                        )}
                        <button
                            className="read_more_btn"
                            onClick={() => setIsReadMore(prev => !prev)}
                        >
                            read {isReadMore? "less" : "more"}
                        </button>
                    </p>
                    <div style={{ paddingTop: "16px" }}>
                        <ActionBtn text="Get In Touch" target="/contact" />
                    </div>
                </div>
            </div>
            <FAQ />
        </div>
    )
}

export default AboutComponent


const aboutText = `Starting with a childhood dream, I've turned
                    my passion into a powerful force. With faith,
                    hard work, and a calm spirit, I've seen my
                    creative endeavors flourish. The joy I find
                    in my work is unmatched, driving me tirelessly
                    forward. Choosing to follow my heart in
                    pursuing my craft has been a game-changer.
                    In just one year, my dreams have started to
                    come true, thanks to @banasthali_vidyapith.
                    I'm proud to be Vice Captain at the Art and
                    Craft Club, a dream fulfilled. This role
                    carries responsibility and a chance to
                    share my skills and creativity. As I
                    prepare for my first workshop, this moment
                    is filled with meaning. It's just the
                    beginning of an extraordinary journey.`
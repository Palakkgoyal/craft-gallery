import React from 'react'
import { tm1, tm2, tm3, tm4, tm5, tm6, tm7, tm8, tm9 } from '../../assets'

const Testimonial = () => {
    const testimonialArr = [tm1, tm2, tm3, tm4, tm5, tm6, tm7, tm8, tm9]
    return (
        <div className="slider_main_container">
            <div className="slider__main__container">
                <h2 className="testimonial_heading">
                    Testimonials
                </h2>
                <div className="slider_container">
                    <div className="slider">
                        {testimonialArr.map((test, idx) => {
                            return (
                                <div className="card glass" key={idx}>
                                    <img src={test} alt="testimonial" className='img_sizing' />
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Testimonial

import React from 'react'
import './ThirdPart.css'
import image from './Default_i_want_a_minimal_logo_for_a_site_can_make_product_imag_0.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
export default function ThirdPart() {
  return (
    <div  className='presentContainer'>
        <div  className='presentBox'>

        <div  className='presentImageBox'><img className='presentImg' src={image } alt="" /></div>
        <div className='presentData'>
            <h3 className='presentTitle'>طرح خود را به راحتی به طیف وسیعی از <span className='productTag'>محصولات</span> اضافه کنید </h3>
            <p className='presentDescription'>با ابزار طراحی رایگان ما، می توانید به راحتی طرح های دلخواه خود را به تی شرت، لیوان، قاب گوشی و صدها محصول دیگر اضافه کنید.</p>
            <p  className='presentLink'><Link className='presentLink' to={'/aksshop'}>همه محصول</Link><FontAwesomeIcon icon={faArrowRight} /></p>
        </div>
        </div>
    </div>
  )
}

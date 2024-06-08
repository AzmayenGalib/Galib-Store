import React from 'react'
/* import ReactStars from "react-rating-stars-component"; */
import { Rating } from "@material-ui/lab";
import "./ReviewCard.css"

const ReviewCard = ({review}) => {

    console.log(review);
  const options = {
   /*  size: "large", */
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className='reviewCard'>
         <img src="" alt="user" /> 
        <p>{review.name}</p>
        <Rating {...options} />
        <span className='.reviewCardComment'>{review.comment}</span>


    </div>
  )
}

export default ReviewCard
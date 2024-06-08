import "./Product.css";
import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Rating } from "@material-ui/lab";

const Product = ({ product }) => {
  const options = {
    size: "small",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

   console.log(product.images[0].url)
  return (
    <>
    <Link className="productCard" to={`/product/${product._id}`}>
       
        
         <img src={product.images[0].url} alt={product.name} />  
         {/* tag er atribute amra avabe dynamic value dita pari */}
         {/* react a img incert korar zono age image k import korte
     hoy */}
         
         
         <p >{product.name}</p>
        
         <div>
           <Rating  {...options} />
           <span className="productCardSpan item">
             ({product.numOfReviews} Reviews)
           </span>
         </div>
         
         <span >{product.price}&nbsp;BDT</span>
        
       </Link>
   
      
    </>
  );
};

export default Product;

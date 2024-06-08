import React, { useState } from "react";
import "./Search.css"
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [keyword, setKeyword] =useState("")
    const navigate = useNavigate()
    
    const searchSubmitHandler = (e)=>{
        e.preventDefault()
        /*e.preventDefaul() ata dile submit houar por page reload 
        hobena  */

        if(keyword.trim()){
            navigate(`/products/${keyword}`)
            /*  navigate() er kaz holo
            eta call hole er modda zai route dibo sai route ta
            visit hobe */

            /* akhane target value k state a rakhar karon holo
            amra navigate er modda e.target.value k access korte
            parina but state k access korte pari */
        }
        else{
            navigate(`/products`)
        }
    }
  return (
    <>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a product"
          onChange={(e) => setKeyword(e.target.value)}
          /*  e.target.value ata diye amra input e value
          k access korte pari*/
          /* input er value change hole onchange event trigger hoy */
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;

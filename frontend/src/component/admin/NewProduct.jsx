import React, { Fragment, useEffect,useState } from "react";
import { Button } from "@material-ui/core";
import "./NewProduct.css";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { useCreateProductMutation } from "../../Api/productApi";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";

const NewProduct = () => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);


  const alert = useAlert();
  const [createProduct, res] = useCreateProductMutation();
  const {
    isLoading: isLoadingU,
    isSuccess: isSuccessU,
    data: dataU,
    error: errorU,
    isError: isErrorU
  } = res;

 
    if (isErrorU) {
       return alert.error("An error has occured") 
    }
    if (isSuccessU) {
       alert.success("Item Added Successfully");  
   } 
     if (isLoadingU) {
      return <div><Loader/></div>;
    }  


 

  

  

  const categories = [
    "Perfume",
    "Book",
    "Electronics",
    "Dress",
    "Men's Accessories",
    "Games",
    
  ];

  const myForm = new FormData();
  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    createProduct(myForm);
  };
  const createProductImagesChange = (e) => {
    const filesA = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    /*  console.log(typeof filesA); */
    filesA.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });

    /*const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        /*  setImagesPreview((old) => [...old, reader.result]);
      setImages((old) => [...old, reader.result]); */

    /*    myForm.append("images", reader.result);
        console.log(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files);  */
  };
  return (
    <div className="Pcontain ">
        <div className="sideB">
            {" "}
            <SideBar />
          </div>
      <div className="newProductContainer">
        <form
          className="createProductForm"
          encType="multipart/form-data"
          onSubmit={createProductSubmitHandler}
        >
          <h1>Create Product</h1>
          <div>
            <SpellcheckIcon />
            <input
              type="text"
              placeholder="Product Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <AttachMoneyIcon />
            <input
              type="number"
              placeholder="Price"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <DescriptionIcon />

            <textarea
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols="30"
              rows="1"
            ></textarea>
          </div>
          <div>
            <AccountTreeIcon />
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="">Choose Category</option>
              {categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>
          <div>
            <StorageIcon />
            <input
              type="number"
              placeholder="Stock"
              required
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div id="createProductFormFile">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={createProductImagesChange}
              multiple
            />
          </div>
          <div id="createProductFormImage">
            {imagesPreview.map((image, index) => (
              <img key={index} src={image} alt="Product Preview" />
            ))}
          </div>
          <Button
            id="createProductBtn"
            type="submit"
            /*  disabled={loading ? true : false} */
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;

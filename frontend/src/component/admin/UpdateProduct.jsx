import React, { useEffect,useState } from "react";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../Api/productApi";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";

const UpdateProduct = () => {
  const alert = useAlert();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [updateProduct, res] = useUpdateProductMutation();
  const {
    isLoading: isLoadingU,
    isSuccess: isSuccessU,
    data: dataU,
    error: errorU,
    isError: isErrorU,
  } = res;
  
  const { isLoading, isError, isSuccess, data, error } =
    useGetProductByIdQuery(id);


   /*  
      if (isErrorU) {
        return alert.error("An error has occured");
      }
  
      if (isError) {
        return alert.error("An error has occured");
      } */
      if (isSuccessU) {
        alert.success("Update product Successfully");
      }
      if (isLoadingU || isLoading) {
        return (
          <div>
            <Loader />
          </div>
        );
      }
 
  

  const pName = data && data.product.name;
  const pPrice = data && data.product.price;
  const pDescription = data && data.product.description;
  const pCategory = data && data.product.category;
  const pStock = data && data.product.stock;
  const pImage = data && data.product.images;

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    if (name === "") {
      myForm.set("name", pName);
    } else {
      myForm.set("name", name);
    }

    if (price === 0) {
      myForm.set("price", pPrice);
    } else {
      myForm.set("price", price);
    }

    if (description === "") {
      myForm.set("description", pDescription);
    } else {
      myForm.set("description", description);
    }

    if (category === "") {
      myForm.set("category", pCategory);
    } else {
      myForm.set("category", category);
    }

    if (Stock === 0) {
      myForm.set("stock", pStock);
    } else {
      myForm.set("stock", Stock);
    }
    images.forEach((image) => {
      myForm.append("images", image);
    });

    updateProduct({ id, myForm });
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
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
          onSubmit={updateProductSubmitHandler}
        >
          <h1>Create Product</h1>
          <div>
            <SpellcheckIcon />
            <input
              type="text"
              placeholder="Product Name"
              /*  required */
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <AttachMoneyIcon />
            <input
              type="number"
              placeholder="Price"
              /*  required */
              onChange={(e) => setPrice(e.target.value)}
              value={price}
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
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
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
              /*  required */
              onChange={(e) => setStock(e.target.value)}
              value={Stock}
            />
          </div>
          <div id="createProductFormFile">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={updateProductImagesChange}
              multiple
            />
          </div>
          <div id="createProductFormImage">
            {oldImages &&
              oldImages.map((image, index) => (
                <img key={index} src={image.url} alt="Old Product Preview" />
              ))}
          </div>

          <div id="createProductFormImage">
            {imagesPreview.map((image, index) => (
              <img key={index} src={image} alt="Product Preview" />
            ))}
          </div>
          <Button
            id="createProductBtn"
            type="submit"
            /* disabled={loading ? true : false} */
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;

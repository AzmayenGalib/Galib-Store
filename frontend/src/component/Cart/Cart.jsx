import React from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import CartItemCard from "./CartItemCard";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const Cart = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cart);
  

  const increaseQuantity = (id, quantity, stock, name, price, image) => {
    const newQty = quantity + 1;

    if (stock <= quantity) {
      return;
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        product: id,
        name: name,
        price: price,
        image: image,
        
        quantity: newQty,
      },
    });
  };

  const decreaseQuantity = (id, quantity, stock, name, price, image) => {
    const newQty = quantity - 1;
    console.log(newQty);
    if (1 >= quantity) {
      return;
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        product: id,
        name: name,
        price: price,
        image: image,
        
        quantity: newQty,
      },
    });
  };

  const deleteCartItems = (id) => {
    dispatch({
      type: "REMOVE_CART_ITEM",
      payload: id,
    });
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };
  return (
    <>
      {true ? (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  {/* map func use korle obossoi unique key dite hobe */}
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock,
                          item.name,
                          item.price,
                          item.image
                        )
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock,
                          item.name,
                          item.price,
                          item.image
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}
            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>
                   {`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`} 
                </p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button  onClick={checkoutHandler} >Check Out</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Cart;

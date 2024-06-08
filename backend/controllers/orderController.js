const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  
  console.log( req.user._id);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    texPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    texPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  

  res.status(201).json({
    success: true,
    order,
  });
});

// get single order

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  /* akhane populate method er kaz holo findById(req.params.id)
    zai doc k return kore sai doc er user property er value niya 
    sai value diya user collection a search korbe,user collection er
     zai doc er sathe oi value match hobe sai doc er name ar email 
     property er value kau order er user property er modda store korbe  */

  if (!order) {
    return next(new ErrorHander("order not found", 404));
  }

  res.status(201).json({
    success: true,
    order,
  });
});

// get logged in user order

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  /* akhane populate method er kaz holo findById(req.params.id)
    zai doc k return kore sai doc er user property er value niya 
    sai value diya user collection a search korbe,user collection er zai doc er sathe oi value match hobe sai doc er name ar email property er value kau order er modda store korbe  */

  res.status(201).json({
    success: true,
    orders,
  });
});

// get all orders ---admin

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  /* find method zodi aksatha onk gula doc return kore tokhon 
    se muloto akta array of obj k return kore.sa akta matro array return kore zar modda sob gula doc thake */

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(201).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update order status ---admin

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body.status);
  const order = await Order.findById(req.params.id);
  /* console.log(req.body.status); */
  if (!order) {
    return next(new ErrorHander("order not found", 404));
  }
  
  if (order.orderStatus === "delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  /* order status ta delivered korar age amaderk age stock ta 
    update korte hobe orthat zai product zoto gula delivery dibo
    stock a oi product er poriman toto gula komay dita hobe
    tai niche amra akta oder er modda zai zai product ase
    sai sob product er stock ta update koresi*/

    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }

  order.orderStatus = req.body.status;
  /* akhane amra order er status k delivered kore dilam */

  if (req.body.status === "delivered") {
    order.deliveredAt = Date.now();
  }

  
  await order.save({ validateBeforeSave: false });
  
  res.status(201).json({
    success: true,
  });
});

/* ai func er kaz holo stock a kotogula product ase saita
 update kora */
async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}

// delete an orders---admin

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("order not found", 404));
  }

  await order.remove();

  res.status(201).json({
    success: true,
  });
});

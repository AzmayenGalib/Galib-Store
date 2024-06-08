const { findByIdAndUpdate } = require("../models/productModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const { query } = require("express");
const cloudinary = require("cloudinary");


// creating creat req handaler
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  /* model obj creat na korau amra database a data creat korte pari 
   model class er crate method er kaz holo req body er modda zai
   data ase satak database a create kora and sai data k return kora
   ba product a sai data k store kora .model class er ai method 
   gula akya obj k return kore zar vaalue holo db er data
   and ai obj abar kisu method k inharit kore zmn remove method*/
  /*  console.log(req.user); */
  req.body.user = req.user.id;
  /* akhane req body obj er vitor user namer property banalam
   and za creat req korese tar id k amar assign korlam */
  /* akhane req body er modda user namer property diya dilam
   zahatu schema te user k required true korsi tai user namer
   property obossoi dita hobe ar ata korar
   fola client thaka req body er modda user patahte hobe na borong
   server ai user property ta req body er satha add hoye zabe
   zahatu req.user.id er modda client er cookie er id ase
   sai id ta req.body.user er value hisabe assign hobe
   fola zai user data creat korbe tar id ta data er user 
   property ta store  hoye zabe
    */
     /* console.log(req.body.images); */ 
 
  /*    let images = [];
     console.log(typeof req.body.images)
     if (typeof req.body.images === "string") {
       images.push(req.body.images);
     } else {
       images = req.body.images;
     } */
 
    /* akhane zodi akta image ase taile seta just string hisabe ashbe
    ar zodi onek gula image ashe tahole seta array of string akare
    ashbe.tai akta ashle  just push korbo ar onek gula ashle pura array
    k asssing kore dibo */
   const imagesLinks = [];
 
   for (let i = 0; i < req.body.images.length; i++) {
    

     const result = await cloudinary.v2.uploader.upload(req.body.images[i], {
       folder: "products",
      /*  upload_preset:'ml_default' */
     });
     imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
     
    
   
   
   req.body.images = imagesLinks;


  //  create product -- admin
  const product = await Product.create(req.body);
  //sending response
  res.status(201).json({
    success: true,
    product,
  });
});

// defining cb middleware
// get all product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 10;
  /* console.log(req.body) */
  /* ai method ta collection zoto gulo data ase tar sonkha k 
  return kore */
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  let query = {};
  if (req.query.keyword) {
    query.name = {
      $regex: req.query.keyword,
      $options: "i",
    };
  }

  if (req.query.price) {
    query.price = {
      $gte: req.query.price.gte,
      $lte: req.query.price.lte,
    };
  }

  if (req.query.category) {
    query.category = req.query.category
    
  }

  if (req.query.ratings) {
    query.ratings = req.query.ratings
    
  }
       
      
    
  

  const filteredProductCount = await Product.countDocuments(query);

  /* zodi a method er kono propery er value b method
    er upor depend kore tokhon b er satha a method k chain kore
    a method k call korte hoy
    zamon class.b().a() and akhane b k obossoi tar class
    k return korte hobe*/

  /* avabe chain korar fola ApiFseature class ,search method
    ar filter method ai 3tai porzay krome aker por ak call hobe
    but sees er  mathod orthat filter method zaita return korba
    saitai sudhu  apiFseature a store hobe */

  //akhane muloto class diya  method k call kora hoisa

  /* zodi kono class er akadhik fuctionality k amra customize
 korta chai tale protita functionality k customize korar zono
 alada allada class banate hoto but ai technic use korar 
 fola matro akta class diyai amra akadhik functionality
 k customize korta pari*/

  /*  akhane req.query holo akta obj ami client thaka zotogolo
 params key pathabo sob key value soho property hisabe ai obj
 er modda thake .key er nam zaita oi key er property er 
 nam o saitai hoy .avabe amra client thaka server a data pathhate
 pari*/

  let products = await apiFeature.query;
  /*    let filteredProductsCount = products.length;
   apiFeature.pagination(resultPerPage);
   products =  apiFeature.query;  */

  /*  products = await apiFeature.query; */
  /* akhane const products = await Product.find() likhar kotha
  but apiFeature.query likhsi karon era same kaz kore but
   apiFeature.query akta extra kaz korte pare seta holo 
   searching.zodi kono key na pathai tale eta Product.find() er 
   moto kaz korbe ae zodi key pathai tale eta searching 
   er kaz korbe.er fola subidha holo amra akta handaller
   diyai duita kaz korte passi akta holo searching arekta holo
   getallproduct. */

  /* ai technic use kore amra kono akta class k inharit na korai
   tar kono akta method ba propperty k onno kono class a add korte
   pari and sudhui add na sai mathod k customize korau add korta pari zmn amra Product class er find method k customize kora
   ApiFeature class a add korasi  */

  /*   model class er find method er kaz holo oi model class er 
    collection a zoto gula data ba obj ase sai sob obj k
    contain kore + aro onek method zukto akta obj k ai
     find method return kore orthat er kaz holo a 
    colloection er sob dtat k return korbe */
  res.status(200).json({
    success: true,
    products,

    resultPerPage,
    filteredProductCount,
  });
});
/*  we can chain method like this bcause every method of 
    req obj returns req obj */

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
   /*  success: true, */
    products,
  });
});


//update product -- admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  
   /* console.log(req.params.id)
  console.log(req.body) 
  console.log(req.body.images) */
  
  let product = await Product.findById(req.params.id);

  /*  akhane findby id method er kaz holo er argument a collection 
     er zai data ba obj er id k dibo ata sai dta ba obj k 
     return korbe.db ta data creat er somoy data er zai Unic 
     id ta automaticaly creat hoy sai id er value akhane dita hobe.
     ar zehaatu amra data er id er value k id route peram er zaygay
     likha client thaka req pathabo tai data er id er value ta id rout peram
     a store hobe.ar id rout peram er value k (req.params.id)
     avabe access korte hoy
     */

  if (!product) {
    return next(new ErrorHander("product not found", 404));
    /* akhane return use korar karon holo return exe hole 
            er porer line gula ar kaz kobena */
    /* next er modda err obj pass korle req res ta 
        error handalling midleware er kase chole zabe ar next er
        modda err obj er class ta call korle sai class ta err
        obj return korbe fole next er modda err obj ta pass hobe
        ar zahatu Errorhander classs ta Error class k inharit
        kore tai ai class diyau amra err obj k return korte pari.
        tobe ai kaz ta Error class diyau kora zeto but notun class
        create korar fole amra notun akta functionality err obj a
        add korte paresi seta holo statusCode.tai notun class 
        bananor karon holo err obj k nizer moto kore customize kora */
  }



  if (req.body.images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
   
    const imagesLinks = [];

    for (let i = 0; i < req.body.images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(req.body.images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  /* akhane findByIdAndUpdate mathod er kaz holo er 1st argument a zai 
    id dibo sai id er obj ar 2nd argument a zai obj ba data dibo
    ai duitak marge kore return korbe mane zzai property gula dibo sagulai
    sudhu update hobe baki gula update hobena  */
  res.status(200).json({
    sucess: true,
    product,
  });
});

//delete product --admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }

  await product.remove();
  /* ai remove method er kaz holo product er modda zai obj ta Store 
    kora ase 
    satak k db thaka delete kora */
  res.status(200).json({
    sucess: true,
    message: "product has been deleted successflly!",
  });
});

//get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }

  res.status(200).json({
    sucess: true,
    product,
  });
});

//Create new review and update old review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  
  
  const { rating, comment, productId } = req.body;

 

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  
  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  /* find er vitor er cb ta muloto for each loo er moto kaz korbe
  ar true ba falsee return korbe.and cb zaita return korbe
  find o oitai return korbe.avabe amra find diya for each er 
  kaz korte pari.rev er modda reviews arrray er element fulo
  ffor each er moto ak ak kore access hobe */

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    /* push method er kaz holo doc er kono property er modda
    notun notun element k apend kora.reviews holoakta array 
    tai push akhane notun notun obj apend korbe */
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  /* avabe foreach er modda cb use kora zay cb zaita return kore 
  foreach o saita return kore  tobe saizonno foreach
  method use korte hobe.upore amra array eer for each mathod 
  use korsi*/

  product.ratings = avg / product.reviews.length;
  await product.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    sucess: true,
    product,

  });
});

//get all reviews of a single product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }

  res.status(200).json({
    sucess: true,
    reviews: product.reviews,
  });
});

//delete reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  /* zodi doc er kono property k array of obj banai tale
  oi array er modda zai obj gula create korbo sai obj gulaar zonnau id create hobe,rev._id diya sai id k bujhay.akhane ami 
  client thaka zai id ta pathabo sai id er rev obj bade baki sob rev obj reviews we modda store hobe*/

  /* zahatu amra review delete korbo tai ratings ta updte korte hobe */
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    sucess: true,
    reviews: product.reviews,
  });
});

exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  // Filtering
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  let query = Product.find(JSON.parse(queryStr));
});

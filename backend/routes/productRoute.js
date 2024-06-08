const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts
} = require("../controllers/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

// creating router obj

const router = express.Router();
// creating product route
router.route("/products").get(getAllProducts);
/* avabe amra akadhik middleware dita pari zeta age dibo seta age 
call hobe */
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);


router.route("/admin/product/:id")
                  .put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
                  .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
                  

 router.route("/product/:id").get(getProductDetails)    
 
 router.route("/review").put(isAuthenticatedUser, createProductReview)

 router.route("/reviews")
    .get( getProductReviews)
    .delete(isAuthenticatedUser,deleteReview)

/* akhane id ta holo ai /product/:id route er route peramiter
amra zokhon client thaka req pathabo tokhon url er id er zaygay
orthat /product/ er pore amra za khushi likha req pathate 
parbo.id er zaygay zaita likha req pathabo saitai hobe 
id route peram er value .db ta data creat korle automatic
tar akta unic id creat hoy amra req korar somoy id route 
peramer zaygay db ta creat houa oi unic id er value ta likha 
req pathabo */

// here we have chained router methods

module.exports = router;

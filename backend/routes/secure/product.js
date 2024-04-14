const {
  addNewProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
  getProductByMongoId,
} = require("../../controllers/product");

// addCatalogue
const router = require("express").Router();

router.post("/produit", addNewProduct);
router.get("/produits", getAllProducts);
router.get("/produit/:_id", getProductByMongoId);
router.get("/produit-by-id/:_id", getProductById);
router.delete("/produit/:id", deleteProductById);
router.put("/produit/:id", updateProductById);

module.exports = router;

const {
    addNewProduct,
    getAllProducts,
    getProductById,
    deleteProductById,
    updateProductById
  } = require("../../controllers/product");
  
  // addCatalogue
  const router = require("express").Router();
  
  router.post("/produit", addNewProduct);
    router.get("/produits", getAllProducts);
    router.get("/produit/:id", getProductById);
    router.delete("/produit/:id", deleteProductById);
    router.put("/produit/:id", updateProductById);
  
  module.exports = router;
  
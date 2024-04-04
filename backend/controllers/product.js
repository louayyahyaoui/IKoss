const Product = require("../models/Product");

/* -------------------------------------------------------------------------------- */
/* -------------------|| Méthode ajouter un nouveau OF || ------------------------- */
/* -------------------------------------------------------------------------------- */
exports.addNewProduct = async (req, res) => {
  try {
    // on crée un nouveau produit
    const newProduct = new Product(req.body);
    // on sauvegarde le nouveau produit
    await newProduct.save();
    // on retourne le nouveau OF comme réponse avec status 200
    res.status(200).json({
      status: true,
      message: "Le produit a été ajouté avec succès",
      res: newProduct,
    });
  } catch (error) {
    // on retourne le message d'erreur avec status 400
    console.log(error);
    res
      .status(400)
      .json({ status: false, message: "Erreur : " + error.message });
  }
};

/* -------------------------------------------------------------------------------- */
/* -------------------|| Méthode récupérer tous les produits || ------------------- */
/* -------------------------------------------------------------------------------- */
exports.getAllProducts = async (req, res) => {
  try {
    // on récupère tous les produits
    const products = await Product.find({});
    // on retourne les produits comme réponse avec status 200
    res.status(200).json({ status: true, res: products });
  } catch (error) {
    // on retourne le message d'erreur avec status 400
    res
      .status(400)
      .json({ status: false, message: "Erreur : " + error.message });
  }
};

/* -------------------------------------------------------------------------------- */
/* -------------------|| Méthode récupérer un produit par ID || ------------------- */
/* -------------------------------------------------------------------------------- */
exports.getProductById = async (req, res) => {
  try {
    // on récupère l'ID du produit
    const productId = req.params.id;
    // on récupère le produit par ID
    const product = await Product.findById(productId);
    // on retourne le produit comme réponse avec status 200
    res.status(200).json({ status: true, res: product });
  } catch (error) {
    // on retourne le message d'erreur avec status 400
    res
      .status(400)
      .json({ status: false, message: "Erreur : Produit avec cette identifiant n'existe pas"});
  }
};

/* -------------------------------------------------------------------------------- */
/* -------------------|| Méthode modifier un produit par ID || --------------------- */
/* -------------------------------------------------------------------------------- */
exports.updateProductById = async (req, res) => {
  try {
    // on récupère l'ID du produit
    const productId = req.params.id;
    // on met à jour le produit par ID
    await Product.findByIdAndUpdate(productId, req.body);
    // on retourne le message de succès avec status 200
    res.status(200).json({ status: true, message: "Le produit a été modifié avec succès" });
  } catch (error) {
    // on retourne le message d'erreur avec status 400
    res
      .status(400)
      .json({ status: false, message: "Erreur : Produit avec cette identifiant n'existe pas" });
  }
};

/* -------------------------------------------------------------------------------- */
/* -------------------|| Méthode supprimer un produit par ID || ------------------- */
/* -------------------------------------------------------------------------------- */
exports.deleteProductById = async (req, res) => {
  try {
    // on récupère l'ID du produit
    const productId = req.params.id;
    // on supprime le produit par ID
    await Product.findByIdAndDelete(productId);
    // on retourne le message de succès avec status 200
    res.status(200).json({ status: true, message: "Le produit a été supprimé avec succès" });
  } catch (error) {
    // on retourne le message d'erreur avec status 400
    res
      .status(400)
      .json({ status: false, message: "Erreur : Produit avec cette identifiant n'existe pas" });
  }
};

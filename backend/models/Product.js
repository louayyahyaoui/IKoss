const { Schema, model } = require("mongoose");
const { default: mongoose } = require("mongoose");
const productSchema = new Schema(

  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    description : {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);

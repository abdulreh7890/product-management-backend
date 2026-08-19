import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true
    },

    description: {
      type: String
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0.01, "Price must be greater than 0"]
    },

    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      min: [0, "Stock cannot be negative"]
    },

    image: {
      type: String,
      required: [true, "Product image path is required"]
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: [true, "Product category is required"]
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("products", productSchema);
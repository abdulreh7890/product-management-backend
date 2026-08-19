import products from "../Models/productModel.js";
import categories from "../Models/categoryModel.js";


export async function createProduct(req, res) {
  try {
    const product = await products.create({
      ...req.body,
      image: req.file.filename
    });

    return res.status(201).json({
      message: "Product Added Successfully",
      data: product
    });

  } catch (error) {

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message
      });
    }

    return res.status(500).json({
      message: "Error Creating Product"
    });
  }
}


export async function getProducts(req, res) {
  try {
    const product = await products
      .find()
      .populate("category");

    return res.status(200).json({
      message: "Products Found",
      data: product
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error Loading Products"
    });
  }
}


export async function getProduct(req, res) {
  try {
    const product = await products
      .findById(req.params.id)
      .populate("category");

    if (!product) {
      return res.status(404).json({
        message: "No Product Found"
      });
    }

    return res.status(200).json({
      message: "Product Found",
      data: product
    });

  } catch (error) {

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid Product ID"
      });
    }

    return res.status(500).json({
      message: "Error Loading Product"
    });
  }
}


export async function deleteProduct(req, res) {
  try {
    const product = await products.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "No Product Found"
      });
    }

    return res.status(200).json({
      message: "Product Deleted Successfully",
      data: product
    });

  } catch (error) {

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid Product ID"
      });
    }

    return res.status(500).json({
      message: "Error Deleting Product"
    });
  }
}


export async function updateProduct(req, res) {
  try {
    const product = await products.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "No Product Found"
      });
    }

    return res.status(200).json({
      message: "Product Updated Successfully",
      data: product
    });

  } catch (error) {

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid Product ID"
      });
    }

    return res.status(500).json({
      message: "Error Updating Product"
    });
  }
}


export async function getProductsByCategory(req, res) {
  try {
    const { name } = req.params;

    const category = await categories.findOne({
      name: {
        $regex: `^${name}$`,
        $options: "i"
      }
    });

    if (!category) {
      return res.status(404).json({
        message: "Category Not Found"
      });
    }

    const product = await products
      .find({ category: category._id })
      .populate("category", "name");

    return res.status(200).json({
      message: "Products Found",
      count: product.length,
      data: product
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error Loading Products"
    });
  }
}
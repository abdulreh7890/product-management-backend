import categories from "../Models/categoryModel.js";


export async function getCategories(req, res) {
  try {
    const allCategories = await categories.find();

    if (allCategories.length === 0) {
      return res.status(404).json({
        message: "No Categories Found"
      });
    }

    return res.status(200).json({
      message: "Categories Found",
      data: allCategories
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error Loading Categories"
    });
  }
}


export async function createCategory(req, res) {
  try {
    const category = await categories.create(req.body);

    return res.status(201).json({
      message: "Category Added Successfully",
      data: category
    });

  } catch (error) {

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Category name already exists"
      });
    }

    return res.status(500).json({
      message: "Error Creating Category"
    });
  }
}


export async function getCategory(req, res) {
  try {
    const category = await categories.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "No Category Found"
      });
    }

    return res.status(200).json({
      message: "Category Found",
      data: category
    });

  } catch (error) {

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid Category ID"
      });
    }

    return res.status(500).json({
      message: "Error Loading Category"
    });
  }
}


export async function deleteCategory(req, res) {
  try {
    const category = await categories.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "No Category Found"
      });
    }

    return res.status(200).json({
      message: "Category Deleted Successfully",
      data: category
    });

  } catch (error) {

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid Category ID"
      });
    }

    return res.status(500).json({
      message: "Error Deleting Category"
    });
  }
}


export async function updateCategory(req, res) {
  try {
    const category = await categories.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!category) {
      return res.status(404).json({
        message: "No Category Found"
      });
    }

    return res.status(200).json({
      message: "Category Updated Successfully",
      data: category
    });

  } catch (error) {

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid Category ID"
      });
    }

    return res.status(500).json({
      message: "Error Updating Category"
    });
  }
}
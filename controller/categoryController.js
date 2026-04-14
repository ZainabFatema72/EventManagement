// controller/categoryController.js
const Category = require("../model/categoryModel");

// ✅ Create a new category (Admin only)
exports.createCategory = async (req, res) => {
  try {
    const category = new Category({ name: req.body.name });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: "Failed to create category" });
  }
};

// ✅ Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort("name");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// ✅ Delete category (Admin)
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};

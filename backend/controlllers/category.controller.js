const Category = require("./../models/category.model");

const createCategory = async (req, res, next) => {
  if (!req.body) return res.status(400).send({ error: "Invalid Category" });
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(200).send({
      message: "دسته‌بندی با موفقیت ثبت شد",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const categoriesList = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).send({
      data: categories,
      message: "عملیات با موفقیت انجام شد",
      success: true,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Failed to fetch categories",
      success: false,
    });
  }
};

const categoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id);
    if (!category)
      return res.status(400).send({
        message: "دسته‌بندی وجود ندارد",
        success: false,
      });
    return res.status(200).send({
      data: category,
      message: "اطلاعات با موفقیت دریافت شد",
      success: true,
    });
  } catch (error) {
    return res.status(400).send({
      message: "دسته‌بندی یافت نشد",
      success: false,
    });
  }
};

module.exports = { createCategory, categoriesList, categoryById };

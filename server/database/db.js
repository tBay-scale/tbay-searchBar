const mongoose = require("mongoose");
// const host = "mongo";
const host = "localhost";
mongoose.connect(`mongodb://${host}:27017/products`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log(`we're connected!`);
});

const categorySchema = new mongoose.Schema({
  id: Number,
  product_name: String,
  category: Number
});

const productSchema = new mongoose.Schema({
  category_id: Number,
  catgeory_name: String
});

const Category = mongoose.model("Categeory", categorySchema, "category");
const Products = mongoose.model("Product", productSchema, "product");

const getProduct = async id => {
  try {
    const products = await Products.findOne({ _id: id });
    return products;
  } catch (error) {
    return error;
  }
};

const getOptions = async currentSearchInput => {
  const searchterm = currentSearchInput.search;
  const categoryId = currentSearchInput.category_id;
  if (categoryId === 0) {
    const products = await Products.find({
      product_name: { $regex: `^${searchterm}`, $options: "im" }
    })
      .select("-_id")
      .limit(3)
      .catch(error => {
        return `error of , ${error}`;
      });
    return products;
  } else {
    const products = await Products.find({
      category: categoryId,
      product_name: { $regex: `${searchterm}`, $options: "im" }
    })
      .select("-_id")
      .limit(3)
      .catch(error => {
        return `error of , ${error}`;
      });
    return products;
  }
};

const getCategories = async () => {
  const categories = await Category.find().select("-_id");
  return categories;
};

module.exports = {
  getOptions,
  getCategories,
  getProduct
};

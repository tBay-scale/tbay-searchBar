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
  category_id: Number,
  catgeory_name: String
});

const Category = mongoose.model("Categeory", categorySchema, "category");

const getProduct = async id => {
  try {
    const queryString = `SELECT * From product WHERE id = ${id};`;
    const products = await client.query(queryString);
    return products.rows[0];
  } catch (error) {
    return error;
  }
};

const getOptions = async currentSearchInput => {
  const queryString =
    currentSearchInput.category_id === 0
      ? `SELECT * FROM product WHERE product_name ~* '^${currentSearchInput.search}.*' LIMIT 3;`
      : `SELECT * FROM product WHERE category = ${currentSearchInput.category_id} AND product_name ~* '^${currentSearchInput.search}.*' LIMIT 3;`;
  const products = await client.query(queryString);
  return products.rows;
};

const getCategories = async () => {
  const queryString = "SELECT * FROM category;";
  const categories = await client.query(queryString);
  return categories.rows;
};

const getTheCategories = async () => {
  const categories = await Category.find();
  console.log(categories);
  return categories;
};

console.log(getTheCategories());

module.exports = {
  getOptions,
  getCategories,
  getProduct
};

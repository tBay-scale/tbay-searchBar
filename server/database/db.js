const { Pool, Client } = require("pg");
const faker = require("faker");

const pool = new Pool({
  user: "meteor",
  host: "localhost",
  database: "sdc_teabay",
  port: 5432
});

const client = new Client({
  user: "meteor",
  host: "localhost",
  database: "sdc_teabay",
  port: 5432
});

const fakeDataGenerator = () => {
  const productName = faker.commerce.productName();
  const categoryId = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
  return [productName, categoryId];
};

client.connect();
client.query("SELECT NOW()", (err, res) => {
  console.log(err, res.rows);
  // client.end();
});

const insertProduct = async () => {
  const [productName, categoryId] = fakeDataGenerator();
  const query = {
    text: "INSERT INTO product(product_name, category) VALUES($1, $2)",
    values: [productName, categoryId]
  };
  await client
    .query(query)
    .catch(e => console.error(`----------------${e.stack}-------------------`));
};

// const loopInsert = async () => {
//   let count = 0;
//   while (count < 250000) {
//     await insertProduct();
//     count += 1;
//   }
//   console.log("fin");
// };

// for (let i = 0; i < 9; i++) {
//   loopInsert();
//   loopInsert();
//   loopInsert();
//   loopInsert();
// }

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

module.exports = {
  getOptions,
  getCategories,
  getProduct
};

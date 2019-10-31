const express = require("express");
const path = require("path");
const app = express();
const port = 3042;
const cors = require("cors");
const connection = require("./database/db");
const SEARCH_BAR_DIST_DIR = path.join(__dirname, "../searchbar-dist");
const SEARCH_BAR_HTML_FILE = path.join(SEARCH_BAR_DIST_DIR, "index.html");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(SEARCH_BAR_DIST_DIR));

const withTimeout = (milsecs, promise) => {
  const timeout = new Promise((resolve, reject) =>
    setTimeout(() => reject(`Timed out after ${milsecs} ms!`), milsecs)
  );
  return Promise.race([promise, timeout]);
};

app.get("/add", async (req, res) => {
  try {
    const product = await connection.getProduct(req.query.id);
    res.send(product);
  } catch (error) {
    res.send(error);
  }
});

app.post("/autocomplete", async (req, res) => {
  const noResultFound = [
    {
      id: 0,
      product_name: " No Results",
      category: "0"
    }
  ];
  try {
    const products = await withTimeout(2000, connection.getOptions(req.body));
    // const products = await connection.getOptions(req.body);
    res.send(products);
  } catch (error) {
    res.send(noResultFound);
  }
});

app.get("/categories", async (req, res) => {
  try {
    const categories = await connection.getCategories();
    res.send(categories);
  } catch (error) {
    res.send(error);
  }
});

app.get("/", (req, res) => {
  res.send(SEARCH_BAR_HTML_FILE);
});

app.listen(port, function() {
  console.log("App listening on port: " + port);
});

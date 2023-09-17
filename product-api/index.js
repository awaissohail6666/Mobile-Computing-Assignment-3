const express = require("express"); // Import express
const mongoose = require("mongoose"); // Import mongoose
const bodyParser = require("body-parser"); // Import body-parser
const app = express(); // Create express app
const port = process.env.PORT || 3000; // Using this port becaues it was having some issues with 27017 port

// Connect to MongoDB
mongoose.connect("mongodb://localhost/product-api", {
  // setting name of database as product-api
  useNewUrlParser: true, // getting rid of deprecation warnings
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:")); // error message if connection fails
db.once("open", () => {
  console.log("Connected to MongoDB"); // success message if connection succeeds
});

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importing product routes and use them
const productRoutes = require("./routes/product");

// Use product routes for all requests to /products
app.use("/products", productRoutes);

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

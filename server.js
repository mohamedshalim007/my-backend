

const app = require("./src/app");
 

const PORT = process.env.PORT || 3000;

/* START SERVER */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log("MySQL Connected Successfully");
});
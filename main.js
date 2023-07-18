const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    app.get("/api", (req, res) => {
      res.json(data[0]);
    });
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({ health_check: "passed" });
});

app.listen(port, () => {
  console.log(`\n Listening at http://localhost:${port}`);
});

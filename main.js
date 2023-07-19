const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    app.get("/api/v1", (req, res) => {
      const constructorArr = [];
      let priceRange = "";
      const monthArr = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];
      for (let i = 0; i < data.length; i++) {
        const month = data[i].dateOfSale.split("-")[1];
        switch (true) {
          case data[i].price == 0 || data[i].price <= 100:
            priceRange = "0-100";
            break;
          case data[i].price == 101 || data[i].price <= 200:
            priceRange = "101-200";
            break;
          case data[i].price == 201 || data[i].price <= 300:
            priceRange = "201-300";
            break;
          case data[i].price == 301 || data[i].price <= 400:
            priceRange = "301-400";
            break;
          case data[i].price == 401 || data[i].price <= 500:
            priceRange = "401-500";
            break;
          case data[i].price == 501 || data[i].price <= 600:
            priceRange = "501-600";
            break;
          case data[i].price == 601 || data[i].price <= 700:
            priceRange = "601-700";
            break;
          case data[i].price == 701 || data[i].price <= 800:
            priceRange = "701-800";
            break;
          case data[i].price == 801 || data[i].price <= 900:
            priceRange = "801-900";
            break;
          case data[i].price >= 901:
            priceRange = "901-above";
            break;

          default:
            priceRange = null;
        }

        const constructor = {
          id: data[i].id,
          price: data[i].price,
          pRange: priceRange,
          category: data[i].category,
          sold: data[i].sold,
          month: monthArr[month - 1],
        };
        constructorArr.push(constructor);
      }
      res.json(constructorArr);
    });

    fetch("http://localhost:3000/api/v1", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        app.get("/api/v1/:month", (req, res) => {
          const month = req.params.month.toUpperCase();
          const monthArr = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].month == month) {
              monthArr.push(data[i]);
            }
          }

          res.json(monthArr);
        });
        app.get("/api/v1/:month/statistics", (req, res) => {
          const month = req.params.month.toUpperCase();
          const constructor = {
            month: month,
            totalSales: 0,
            noOfSoldItems: 0,
            noOfNotSoldItems: 0,
          };

          for (let i = 0; i < data.length; i++) {
            if (data[i].month == month) {
              constructor.totalSales += data[i].price;
              if (data[i].sold == true) {
                constructor.noOfSoldItems++;
              } else {
                constructor.noOfNotSoldItems++;
              }
            }
          }

          res.json(constructor);
        });
        app.get("/api/v1/:month/bar_chart/:pRange", (req, res) => {
          const month = req.params.month.toUpperCase();
          const pRange = req.params.pRange;

          const constructor = {
            month: month,
            pRange: pRange,
            noOfItemsInRange: 0,
          };

          for (let i = 0; i < data.length; i++) {
            if (data[i].month == month && data[i].pRange == pRange) {
              constructor.noOfItemsInRange++;
            }
          }

          res.json(constructor);
        });
        app.get("/api/v1/:month/pie_chart/:category", (req, res) => {
          const month = req.params.month.toUpperCase();
          const category = req.params.category;

          const categoryArr = [
            "men clothing",
            "jewelery",
            "electronics",
            "women clothing",
          ];

          const constructor = {
            month: month,
            category: category,
            noOfItemsInCategory: 0,
          };

          for (let i = 0; i < data.length; i++) {
            if (
              data[i].month == month &&
              (data[i].category == "men clothing" ||
                data[i].category == "jewelery" ||
                data[i].category == "electronics" ||
                data[i].category == "women clothing")
            ) {
              constructor.noOfItemsInCategory++;
            }
          }

          res.json(constructor);
        });
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({
    health_check: "passed",
    api_endpoints: [
      "/api/v1",
      "/api/v1/:month",
      "/api/v1/:month/statistics",
      "/api/v1/:month/bar_chart/:pRange",
      "/api/v1/:month/pie_chart/:category",
    ],
  });
});

app.listen(port, () => {
  console.log(`\n Listening at http://localhost:${port}`);
});

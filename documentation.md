Here is the API documentation.

## API End-points:

1. `/api/v1` - GET

> This is the optimized structure of the API. It is the root of the API.

2. `/api/v1/:month` - GET

> This will take the month as the params and it will filter the data according to the month.
> Here is the month that used should be used:

```javascript
[
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
```

3. `/api/v1/:month/statistics` - GET

> This will take the month as the params and it will filter the data according to the month and it will return the statistics of the month.
> Here is the object it will return:

```javascript
const constructor = {
  month: month,
  totalSales: 0,
  noOfSoldItems: 0,
  noOfNotSoldItems: 0,
};
```

4. `/api/v1/:month/bar_chart/:pRange` - GET

> This will take the month adn the range as the params and it will filter the data according to the month and it will return the bar chart data of the month.
> Here is the object it will return:

```javascript
const constructor = {
  month: month,
  pRange: pRange,
  noOfItemsInRange: 0,
};
```

> Here is the pRange that should be used:

```javascript
[
  "0-100",
  "101-200",
  "201-300",
  "301-400",
  "401-500",
  "501-600",
  "601-700",
  "701-800",
  "801-900",
  "901-above",
];
```

5. `/api/v1/:month/pie_chart/:category` - GET

> This will take the month and the category as the params and it will filter the data according to the month and it will return the pie chart data of the month.
> Here is the object it will return:

```javascript
const constructor = {
  month: month,
  category: category,
  noOfItemsInCategory: 0,
};
```

> Here is the category that should be used:

```javascript
["men clothing", "jewelery", "electronics", "women clothing"];
```

_Note: This documentation is parallel and stable from v0.0.1 to v0.0.4_

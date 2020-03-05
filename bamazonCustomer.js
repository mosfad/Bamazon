//require and config dotenv package
require("dotenv").config();
var keys = require("./keys.js");
var mysql = require("mysql");
var inquirer = require("inquirer");
var fs = require("fs");
var cTable = require("console.table");

var connection = mysql.createConnection({
  host: keys.mysqlAuth.host,

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: keys.mysqlAuth.user,

  // Your password
  password: keys.mysqlAuth.password,
  database: "bamazon"
});

connection.connect(function(error) {
  var inventory = [];
  if (error) throw error;
  connection.query("SELECT * FROM products", function(error, results) {
    if (error) throw error;
    console.log(
      "=======================================================================================" +
        "\n" +
        "                          ITEMS FOR SALE AT BAMAZON" +
        "\n" +
        "=======================================================================================" +
        "\n"
    );
    for (var i = 0; i < results.length; i++) {
      //console.log("Product ID: " + results[i].item_unique + " |Product name: " + results[i].product_name + " |Department name: " + results[i].department_name + " |Price: " + "$" +  results[i].price + " |Stock quantity: " + results[i].stock_quantity);
      //console.log("| Product ID: " + results[i].item_unique + " | Product name: " + results[i].product_name  + " | Price: " + "$" +  results[i].price + " |");
      inventory.push(results[i]);
      //console.log(inventory);
    }
    var prettyTable = cTable.getTable(inventory);
    console.log(prettyTable);
    getCustomerOrder(results);
  });
  //connection.end();
});

function getCustomerOrder(results) {
  //prompts user to post, bid, or exit app
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: "input",
        name: "id",
        message:
          "Using the inventory above, what is the id of the item you want to purchase?",
        validate: function(value) {
          if (isNaN(value)) {
            return false;
          }
          return true;
        }
      },
      {
        type: "input",
        name: "quantity",
        message: "How many of this item would you like to purchase?",
        validate: function(value) {
          if (isNaN(value)) {
            return false;
          }
          return true;
        }
      }
    ])
    .then(function(answers) {
      // Use user feedback to process orders!!
      var orderId = parseInt(answers.id);
      var orderQty = parseInt(answers.quantity);
      //Fulfill order if order quantity is not greater than stock quantity.
      if (orderQty > results[orderId - 1].stock_quantity) {
        //cancel order if order qty doesn't exceeds stock qty
        cancelOrder();
      } else {
        //otherwise fulfill order
        fulfillOrder(results, orderQty, orderId);
      }
    });
}

//Updates database and shows customer total cost of order
function fulfillOrder(results, qtyOrdered, idOfPurchase) {
  var indexOfOrder = idOfPurchase - 1;
  var currentStockQty = results[indexOfOrder].stock_quantity;
  var qtyRemaining = currentStockQty - qtyOrdered;
  console.log("-------------------------------------------");
  console.log(
    "Item ordered: " +
      results[indexOfOrder].product_name +
      "\nQuantity ordered: " +
      qtyOrdered
  );
  console.log("Fulfilling order...");
  //Update database to show remaining quantity.
  var customerOrder = [
    { stock_quantity: qtyRemaining },
    { item_unique: idOfPurchase }
  ];
  connection.query("UPDATE products SET ? WHERE ?", customerOrder, function(
    error,
    rows
  ) {
    if (error) throw error;
    //console.log(rows);
  });
  connection.query("SELECT * FROM products", function(error, res) {
    if (error) throw error;
    //Show customer total cost of order
    console.log("-----------------------------------------");
    console.log(
      "Total cost of order: $" + qtyOrdered * res[indexOfOrder].price
    );
    console.log("-----------------------------------------");
  });
  connection.end();
}

//Cancels customer's order and displays insufficient qty when inventory qty is less than order qty.
function cancelOrder() {
  console.log("Insufficient quantity in stock! Order will be canceled.");
  connection.end();
  return;
}

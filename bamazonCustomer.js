//require and config dotenv package
require("dotenv").config();
var keys = require("./keys.js");
var mysql = require("mysql");
var inquirer = require("inquirer");
var fs = require("fs");


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
    if (error) throw error;
    //console.log("connected as id " + connection.threadId);
    console.log("Connected!");
    connection.query("SELECT * FROM products", function(error, results) {
        if (error) throw error;
        //console.log(results);
        console.log("Here are the availabe items for sale in Bamazon");
        console.log("-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------")
        for (var i = 0; i < results.length; i++) {
            //console.log("Product ID: " + results[i].item_unique + " |Product name: " + results[i].product_name + " |Department name: " + results[i].department_name + " |Price: " + "$" +  results[i].price + " |Stock quantity: " + results[i].stock_quantity);
            console.log("| Product ID: " + results[i].item_unique + " | Product name: " + results[i].product_name  + " | Price: " + "$" +  results[i].price + " |");

        }
        getCustomerOrder(results);
    })
    connection.end();
});



function getCustomerOrder(results) {
    //prompts user to post, bid, or exit app
   inquirer.prompt([
    /* Pass your questions in here */
    {
        type: "input",
        name: "id",
        message: "Using the inventory above, what is the id of the item you want to purchase?",
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
    // Use user feedback for... whatever!!
        var orderId = parseInt(answers.id);
        var indexOfOrder = orderId - 1;
        var orderQty = parseInt(answers.quantity);
        //console.log("Order quantity is: " + orderQty);
        //console.log("Order quantity is an " + typeof(orderQty));
        //console.log("Inventory quantity is: " + results[orderId].stock_quantity);
       if (orderQty <= results[indexOfOrder].stock_quantity) {
          //If order qty is availabe, then complete the order.
          completeOrder();
       }
       else {
          //else cancel order 
          cancelOrder();
       }
    })
}


//Updates database and shows customer total cost of order
function completeOrder() {
    console.log("Item ordered is available, so your order will be completed shortly!")
}

//Cancels customer's order and displays insufficient qty when inventory qty is less than order qty.
function cancelOrder() {
    console.log("Insufficient quantity! Unvortunately, your order will be cancelled.")
}
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
  if (error) throw error;
  getManagerAction();
  //connection.end();
});

function getManagerAction() {
  //prompts manager to choose a course of action
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: "list",
        name: "managerChoice",
        message: "Please choose an action from the menu below.",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      }
    ])
    .then(function(answers) {
      // Use user feedback to process orders!
      //Perform action matching manager's choice.
      if (answers.managerChoice === "View Products for Sale") {
        viewAllInventory();
      } else if (answers.managerChoice === "View Low Inventory") {
        viewLowInventory();
      } else if (answers.managerChoice === "Add to Inventory") {
        addToInventory();
      } else if (answers.managerChoice === "Add New Product") {
        addNewProduct();
      }
      return;
    });
}

//Displays every item for sale, including id, name, price, and quantity
function viewAllInventory() {
  //object holding inventory
  var inventory = [];
  connection.query("SELECT * FROM products", function(error, results) {
    if (error) throw error;
    console.log(
      "\n" +
        "=======================================================================================" +
        "\n" +
        "                       ALL AVAILABLE ITEMS FOR SALE AT BAMAZON" +
        "\n" +
        "=======================================================================================" +
        "\n"
    );
    //populate inventory with store items.
    for (var item of results) {
      inventory.push(item);
    }
    var prettyTable = cTable.getTable(inventory);
    console.log(prettyTable);
  });
  connection.end();
}

//Displays items with an inventory count less than 5.
function viewLowInventory() {
  //
  var targetColumns = [
    "item_unique",
    "product_name",
    "price",
    "stock_quantity"
  ];
  var qtyLow = 5;
  var inventory = [];
  connection.query(
    "SELECT ?? FROM ?? WHERE stock_quantity < ?",
    [targetColumns, "products", qtyLow],
    function(error, results) {
      if (error) throw error;
      console.log(
        "\n" +
          "=======================================================================================" +
          "\n" +
          "                       ALL ITEMS WITH LOW INVENTORY AT BAMAZON" +
          "\n" +
          "=======================================================================================" +
          "\n"
      );
      //populate inventory with store items.
      for (var item of results) {
        inventory.push(item);
      }
      var prettyTable = cTable.getTable(inventory);
      console.log(prettyTable);
    }
  );
  connection.end();
}

//Displays a prompt, that will allow the manager to add more of any item currently in the store.
function addToInventory(results) {
  //prompts manager to choose item to update its stock quantity.
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: "input",
        name: "itemId",
        message: "What is the id of the product you want to add more of?"
      },
      {
        type: "input",
        name: "addQty",
        message: "How many of this product do you want to add to stock?"
      }
    ])
    .then(function(answers) {
      // Use manager's feedback to update inventory!
      //Parse manager's answers.
      var idOfItem = parseInt(answers.itemId);
      //Get access to inventory data
      connection.query("SELECT * FROM products", function(error, results) {
        if (error) throw error;
        //Get the sum of current stock qty by adding current stock quantity.
        var qtySum =
          parseInt(answers.addQty) + results[idOfItem - 1].stock_quantity;
        //Update stock quantity after increase.
        var managerUpdate = [
          { stock_quantity: qtySum },
          { item_unique: idOfItem }
        ];
        connection.query(
          "UPDATE products SET ? WHERE ?",
          managerUpdate,
          function(error, rows) {
            if (error) throw error;
          }
        );
        connection.end();
      });
    });
}

//Allows the manager to add a new item to the store.
function addNewProduct() {
  //prompts manager for details of new item to add to the store.
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: "input",
        name: "itemName",
        message: "What is the product name?"
      },
      {
        type: "input",
        name: "deptName",
        message: "Which department will stock the product?"
      },
      {
        type: "input",
        name: "price",
        message: "What is the selling price for the product?"
      },
      {
        type: "input",
        name: "stockQty",
        message: "How many of the product do you want in stock?"
      }
    ])
    .then(function(answers) {
      // Use manager's inputs to add new item.
      //Add new item to the store(database).
      var newItem = {
        product_name: answers.itemName,
        department_name: answers.deptName,
        price: answers.price,
        stock_quantity: parseInt(answers.stockQty)
      };
      connection.query("INSERT INTO products SET ?", newItem, function(
        error,
        rows
      ) {
        if (error) throw error;
      });
      connection.end();
    });
}

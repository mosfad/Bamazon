require("dotenv").config();
var keys = require("./keys.js");
var mysql = require("mysql");
var inquirer = require("inquirer");
var CTable = require("console.table");

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
  getSupervisorAction();
  //connection.end();
});

function getSupervisorAction() {
  //prompts manager to choose a course of action
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: "list",
        name: "supervisorChoice",
        message: "Please choose an action from the menu below.",
        choices: ["View Product Sales By Department", "Create New Department"]
      }
    ])
    .then(function(answers) {
      // Use user feedback to process orders!
      //Perform action matching manager's choice.
      if (answers.supervisorChoice === "View Product Sales By Department") {
        viewProductSales();
      } else if (answers.supervisorChoice === "Create New Department") {
        createDepartment();
      }
      return;
    });
}

function viewProductSales() {}

function createDepartment() {
  //prompts supervisor for an action..
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the department name?"
      },
      {
        type: "input",
        name: "overheadCosts",
        message: "What is the overhead cost for this department?"
      }
    ])
    .then(function(answers) {
      // Use manager's inputs to add new item.
      //Add new item to the store(database).
      var newDeparment = {
        product_name: answers.departmentName,
        department_name: answers.overheadCosts
      };
      connection.query("INSERT INTO deparments SET ?", newDeparment, function(
        error,
        rows
      ) {
        if (error) throw error;
      });
      connection.end();
    });
}

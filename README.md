# Bamazon

Bamazon is an Amazon-like storefront that will accepts customer orders and allows the store manager to maintain inventory.

## Overview

Bamazon is a Node.js app which uses MySQL database to maintain an inventory of products. The customer view helps the customer purchase products online, while the manager view helps the manager to track and update inventory. The customer and manager views are synchronized to provide up to date information.
_A supervisor view, which will be added in a future release, tracks the performance of various departments within the store._

### Technologies used

- Node.js
- MySQL
- Inquirer.js(Command line interactive package)

## Customer View

### ![Demo](https://raw.githubusercontent.com/mosfad/Bamazon/master/customerView.gif)

### Instructions

_*Please execute the MySQL code inside schema.sql in a MySQL IDE or command line. This action will create bamazon database and products table*_

1. In the terminal, run `node bamazonCustomer.js` to start the app.
2. The app will display all available products in the store with their pricing and stock amounts.
3. The app will prompt user to enter id of product and the quantity to purchase; please use inventory lists to enter valid numbers.
4. The app will either complete the order or cancel the order.

## Manager View

### ![Demo](https://raw.githubusercontent.com/mosfad/Bamazon/master/managerView.gif)

## Instructions

1. In the terminal, run `node bamazonManager.js` to start the app.
2. The app will display a list of options which allow the user to view inventory or update existing inventory.
3. The low inventory option displays items with stock quantitites less than 5.
4. The add inventory option allows user to increase the stock quantity; please enter a positive number.
5. The add product option allows user to add a new item to the inventory.

## Supervisor View

### ![Demo](https://raw.githubusercontent.com/mosfad/Bamazon/master/supervisorView.gif)

## Instructions

1. In the terminal, run `node bamazonSupervisor.js` to start the app.
2. The app will display a list of options which allow the user to view product sales by department or add a new department.
3. The product sales option displays the over head costs and total profits for each department.
   `total profit for a department = sum of product sales - over head costs`
4. The add a new department option allows user to enter the department name and over head costs. Please enter a positive
   number for the over head costs.

## Contact us about Bamazon

maafadina@gmail.com

## Contributors

Dupe Fadina

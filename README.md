# Bamazon

Bamazon is an Amazon-like storefront that will accepts customer orders and allows the store manager to maintain inventory.

## Overview

Bamazon is a Node.js app which uses MySQL database to maintain an inventory of products. The customer view helps the customer purchase products online, while the manager view helps the manager to track and update inventory. The customer and manager views are synchronized to provide up to date information.
**_A supervisor view, which will be added in a future release, tracks the performance of various departments within the store._**

### Technologies used

- Node.js
- MySQL
- Inquirer API

## Instructions for customer view

**_Please execute the MySQL code inside schema.sql in a MySQL IDE or command line. This action will create bamazon database and products table_**

1. In the terminal, run bamazonCustomer.js to start the app.
2. The app will display all available products in the store with their pricing and stock amounts.
3. The app will prompt user to enter id of product and the quantity to purchase; please use inventory lists to enter valid numbers.
4. The app will either complete the order or cancel the order.

## Instructions for manager view

1. In the terminal, run bamazonManager.js to start the app.
2. The app will display a list of options which allow the user to view inventory or update existing inventory.
3. The low inventory option displays items with stock quantitites less than 5.
4. The add inventory option allows user to increase the stock quantity; please enter a positive number.
5. The add product option allows user to add a new item to the inventory.

## App Running in the terminal

### [Customer View](https://drive.google.com/open?id=1lom06f7x_c9AUOpmoaQ-2B_JvV5Bro2X)

### [Manager View](https://drive.google.com/open?id=1s8yyceo1TrtuSF4C3QQrgNyNkEvDnxTG)

- Notes

  - _Please note that the program see the videos below to see how the customer and manager views run_.

## Contact us about Bamazon

maafadina@gmail.com

## Contributors

Dupe Fadina

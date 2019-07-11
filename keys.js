console.log('this is loaded');

//Export keys used in bamazon, add them to .env file and require them.
exports.mysqlAuth = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
}
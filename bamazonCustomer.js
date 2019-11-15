var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: `localhost`,
    port: 8889,
    user: `root`,
    password: `root`,
    database: `bamazonDB`

});

var cereals = [];

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected as id" + connection.threadId);
})

function displayCereal() {
    var query = `SELECT * FROM products`
    connection.query(query, function(err, res){
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + "\nProduct: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: " + res[i].price + "\nIn-Stock Quantity: " + res[i].stock_quantity + "\n\n");
            cereals.push(res[i]);
        }
        inquirer.prompt([
            {
                name: "id",
                message: "Please enter the ID of the item that you would lke to purchase: "
            },
            {
                name: "quantity",
                message: "How many would you like to purchase?"

            }
        ]).then(function(answers){
            var id = answers.id;
            var query2 = `SELECT * FROM products WHERE id'"${id}"`
            connection.query(query2, function(err,data){
                if (err) throw err;

                var quantity = answers.quantity;
                var currQuantity = data[0].stock_quantity;
                var newQuantity = currQuantity - answers.quantity;
                var cost = data[0].price * quantity;
                var name = data[0].product_name;

                if (newQuantity < 0) {
                    console.log("We do not have enough stock to fulfill your order, please lower your amount or chose another product!")
                    displayCereal();
                } else {
                    updateCereal(id, newQuantity, cost, name, quantity);
                }
            })
        })
    })
}

displayCereal();

function updateCereal(id, newQuantity, cost, name, quantity) {

    connection.query(`UPDATE products SET stock_quantity = stock_quantity - ${newQuantity} WHERE id = ${id}`, function(err, result){   
    })
    console.log(`Success! You have purchased ${quantity} ${name} for ${cost}`)
}

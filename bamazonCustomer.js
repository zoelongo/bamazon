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
            console.log("Product ID: " + res[i].id + "\nProduct: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: " + res[i].price + "\nIn-Stock Quantity" + res[i].stock_quantity + "\n\n");
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
///////

// function validateInput(){

//     var integer = Number.isInteger(parseFloat(value));
//     var sign = Math.sign(value);

//     if (integer && (sign === 1)){

//         return true;

//     } else {

//         return `Please enter a valid whole integer.`

//     }
// }

// function promptPurchase(){

//     inquirer.prompt([

//         {
//             type: `input`,
//             name: `item_id`,
//             message: `Please enter the id of what you would like to purchase.`,
//             validate: validateInput,
//             filter: Number
//         },
//         {
//             type: `input`,
//             name: `stock_quantity`,
//             message: `How many would you like?`,
//             validate: validateInput,
//             filter: Number
//         }

//     ]).then(function(input){

//         var item = input.item_id;
//         var quantity = input.quantity;

//         var querySql = `SELECT * FROM products WHERE ?`;

//         connection.query(querySql, {item_id: item}, function(err, data){

//             if (err) throw err;

//             if (data.length === 0){

//                 console.log("Please enter a valid ID.");

//             } else {

//                 var productData = data[0];

//                 if (quantity <= productData.stock_quantity){

//                     var newQuerySql = `UPDATE products SET stock_quantity = ` + (productData.stock_quantity - quantity) + ` WHERE item_id = ` + item;

//                     connection.query(newQuerySql, function(err, data){

//                         if (err) throw err;

//                         console.log(`Success! Your order was placed. Your total is $ ` + productData.price * quantity);
//                         console.log(`\n-----------------------------------------\n`);

//                         connection.end();

//                     }) 
                    
//                 } else {
                        
//                     console.log(`Our apologies, there is not enough product in stock for your order to be placed!`);
//                     console.log(`\n-----------------------------------------\n`);
//                     console.log(`Feel free to modify your order and try again.`);

//                     displayInventory();

//                  }
                
//             }

//         })

//     })
   
// }

// function displayInventory(){

//     var queryStr = `SELECT * FROM products`;

//     connection.query(queryStr, function(err, data){

//         if (err) throw err;

//         console.log(`Here are our current cereals!`);
    

//         var cerealOutput = ``;

//         for (var i = 0; i < data.length; i++){

//             cerealOutput = ``;
//             cerealOutput += `Cereal ID: ` + data[i].item_id;
//             cerealOutput += `Cereal Name: ` + data[i].product_name;
//             cerealOutput += `Price: ` + data[i].price;

//             console.log(cerealOutput);

//         }

//         console.log(`\n-----------------------------------------\n`);

//         promptPurchase();

//     })
// }

// function runBamazon() {

//     displayInventory();

// }

// runBamazon();


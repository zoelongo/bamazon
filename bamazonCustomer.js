var inquirer = require(inquirer);
var mysql = require(mysql);

var connection = mysql.createConnection({
    host: `localhost`,
    port: 8889,
    user: `root`,
    password: `root`,
    database: `bamazonDB`

});

function promptPurchase(){

    inquirer.prompt([

        {
            type: `input`,
            name: `item_id`,
            message: `Please enter the id of what you would like to purchase.`,
            choices: [`cereal1`, `cereal2`, `cereal3`, `cereal4`, `cereal5`, `cereal6`, `cereal7`, `cereal8`]
        },
        {
            type: `input`,
            name: `stock_quantity`,
            message: `How many would you like?`,
            filter: Number
        }

    ]).then(function(input){

        var item = input.item_id;
        var quantity = input.quantity;

        var querySql = `SELECT * FROM products WHERE ?`;

        connection.query(querySql, {item_id: item}, function(err, data){

            if (err) throw err;

            if (data.length === 0){

                console.log("Please enter a valid ID.");

            } else {

                var productData = data[0];

                if (quantity <= productData.stock_quantity){

                    var newQuerySql = `UPDATE products SET stock_quantity = ` + (productData.stock_quantity - quantity) + ` WHERE item_id = ` + item;

                    connection.query(newQuerySql, function(err, data){

                        if (err) throw err;

                        console.log(`Success! Your order was placed. Your total is $ ` + productData.price * quantity);
                        console.log(`\n-----------------------------------------\n`);

                        connection.end();

                    }) 
                    
                } else {
                        
                    console.log(`Our apologies, there is not enough product in stock for your order to be placed!`);
                    console.log(`\n-----------------------------------------\n`);
                    console.log(`Feel free to modify your order and try again.`);

                    displayInventory();

                 }
                
            }

        })

    })
   
}

function displayInventory(){

    var queryStr = `SELECT * FROM products`;

    connection.query(queryStr, function(err, data){

        if (err) throw err;

        console.log(`Here are our current cereals!`);

        var cerealOutput = ``;

        for (var i = 0; i < data.length; i++){

            cerealOutput = ``;
            cerealOutput += `Cereal ID: ` + data[i].item_id;
            cerealOutput += `Cereal Name: ` + data[i].product_name;
            cerealOutput += `Price: ` + data[i].price;

            console.log(cerealOutput);

        }

        console.log(`\n-----------------------------------------\n`);

        promptPurchase();

    })
}

function runBamazon() {

    displayInventory();

}

runBamazon();
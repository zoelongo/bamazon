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

                if (quantity <= productData.quantity){

                    var newQuerySql = `UPDATE products `
                }



                
            }


        })

    })

    
}

let express = require("express")
let Router = express.Router()
let UserController = require("../controller/userController")
let ProductController = require("../controller/productController")

Router.post("/createuser",UserController.userCreate)
Router.post("/login",UserController.userLogin)
Router.post("/createproduct",ProductController.productCreate)
Router.get("/getproduct",ProductController.getproduct)
Router.put("/updateproduct/:productid",ProductController.Updateproduct)
Router.delete("/deleteproduct/:productid",ProductController.DeleteProduct)

module.exports = Router
let ProductModel = require("../model/productModel")
let userModel = require("../model/userModel")
let mongoose = require("mongoose")
const { listenerCount } = require("../model/productModel")

let productCreate = async function (req, res) {
    try {
        let data = req.body
        let { title, description, price } = data
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, msg: "please enetr some data in body" })
        }
        if (!title) {
            return res.status(400).send({ status: false, msg: "please enetr title " })

        }
        if (!description) {
            return res.status(400).send({ status: false, msg: "please enetr description" })

        }
        if (!price) {
            return res.status(400).send({ status: false, msg: "please enetr price " })

        }

        let prooductdata = await ProductModel.create(data)
        res.status(201).send({ status: true, data: prooductdata, msg: "product detail create successfully" })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error })
    }

}

let getproduct = async function (req, res) {
    try {
        let query = req.query
        if (!query) {
            let allproduct = await ProductModel.find({ isDeleted: false, query: query })
            if (allproduct.length === 0) {
                return res.status(404).send({ status: false, msg: "no any product found" })
            }
            return res.status(200).send({ status: true, msg: "product fetch sucessfully", allproduct })
        }

        if (query.userid) {
            let id = query.userid
            let isvalidid = mongoose.Schema.Types.ObjectId
            if (!isvalidid) return res.status(400).send({ status: false, msg: "The userId provided is invalid!" })
            let user = await userModel.findById({ _id: id })
            if (!user) { return res.status(404).send({ status: false, msg: "No product of such user" }) }

        }
        if (query.title) {
            const title = query.title
            const product = await ProductModel.find({ title: title })
            if (product.length == 0) { return res.status(404).send({ status: false, msg: "No product related to this title" }) }

        }
        let getallproduct = await ProductModel.find(query)
        if (getallproduct.length === 0) {
            return res.status(404).send({ status: false, msg: "no product found" })
        }
        return res.status(200).send({ status: true, message: "product list", data: getallproduct })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error })

    }
}

let Updateproduct = async function (req, res) {
    try {
        let data = req.body
        let { title, description, price } = data


        let productid = req.params.productid
        const UpdateProduct = await ProductModel.findOneAndUpdate({ _id: productid }, { $set: { title: data.title, description: data.description, price: data.price } }, { new: true })
        res.status(200).send({ status: true, data: "updat product", UpdateProduct })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

let DeleteProduct=async function(req,res){
    try{
    let productid=req.params.productid

    const Deletedproduct=await ProductModel.findOneAndUpdate({_id:productid,isDeleted:false},{$set:{isDeleted:true}})
    return res.status(200).send({status:true,msg:"product delete sucessfully",Deletedproduct})
}
catch(err){
    res.status(500).send({status:false,error:err.message})
}
}





module.exports.productCreate = productCreate
module.exports.getproduct = getproduct
module.exports.Updateproduct = Updateproduct
module.exports.DeleteProduct = DeleteProduct


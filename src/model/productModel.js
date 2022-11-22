let mongoose =  require("mongoose")
let objectid = mongoose.Schema.Types.ObjectId


let productSchema = new mongoose.Schema(
    {
        title: {type:String, required:"title is required", trim:true, unique: true},
        userid:{type:objectid,ref:"user",},
        description: {type:String, required:"description is required", trim:true},
        price: {type:Number,required:"price is required"},
         isDeleted: {type:Boolean, default: false},
      },{timestamps:true}

)

module.exports = mongoose.model("product",productSchema)
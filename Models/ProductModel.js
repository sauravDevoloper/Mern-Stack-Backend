const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:[{
            type:String,
            enum:['veg','non-veg']
        }]

    },
    Image:{
        type:String
    },
    bestSeller:{
        type:String,
        
    },
    description:{
        type:String,
        
    },
    firm:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"firm"
    }]

})


const ProductModel = mongoose.model("product",productSchema)

module.exports = ProductModel
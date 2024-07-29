const mongoose = require("mongoose")


const firmSchema = mongoose.Schema({
    firmName:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    category:{
        type:[{
            type:String,
            enum:['veg','non-veg']
        }]
    },
    region:{
        type:[{
            type:String,
            enum:['South-indian','North-indian','bakery','chineese']
        }]
    },
    offer:{
        type:String
    },
    Image:{
        type:String
    },

    vendor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vendor"
    }],
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }]

})


const FirmModel = mongoose.model("firm",firmSchema)

module.exports = FirmModel
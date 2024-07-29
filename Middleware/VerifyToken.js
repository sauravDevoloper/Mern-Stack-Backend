const VendorModel = require("../Models/VendorModel")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")



dotenv.config()


const secretKey = process.env.SECRETKEY


const VerifyToken = async(req,res,next)=>{

    const token = req.headers.token

    if(!token){
        return res.status(401).send({message:"Token is required"})
    }

    try {

        const decoded = jwt.verify(token,secretKey)
        const vendor = await VendorModel.findById(decoded.vendorId)

        if(!vendor){
            return res.status(404).send({message:"vendor not found"})
        }

        req.vendorId = vendor._id

        next()
        

    } catch (error) {
        return res.status(500).send({message:"internal error occured"})
    }
}

module.exports = VerifyToken
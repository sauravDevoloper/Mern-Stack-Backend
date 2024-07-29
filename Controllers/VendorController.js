

const VendorModel = require("../Models/VendorModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const secretKey = process.env.SECRETKEY


const vendorRegister = async(req,res)=>{

    const {username,email, password} = req.body

    try {

        const vendorEmail = await VendorModel.findOne({email})
        if(vendorEmail){
            return res.status(400).send({message:"Email already exists"})
        }
    
        const hashedPassword = await bcrypt.hash(password,10)
    
        const newVendor = new VendorModel({
            username,
            email,
            password:hashedPassword
        })
    
        await newVendor.save()
    
        res.status(201).send({message:"vendor registered successfully"})
        
    } catch (error) {

        res.status(500).send({message:"internal errror occured"})
        
    }


   
}



const vendorLogin = async(req,res)=>{
    const {email,password} = req.body
   try {

    const vendor = await VendorModel.findOne({email})
    if(!vendor||!(await bcrypt.compare(password,vendor.password))){
        return res.status(404).send({message:"vendor not found"})
    }

    const token = jwt.sign({vendorId: vendor._id}, secretKey,{expiresIn:"1hr"})

    return res.status(200).send({message:"login success",token})
    
   } catch (error) {

    res.status(500).send({message:"internal error occured"})
    
   }
}


//get all vendors


const getAllVendors = async(req,res)=>{
    try {

        
    const vendors = await VendorModel.find().populate('firm')
    if(!vendors){
        return res.status(404).send({message:"vendor not found"})
    }

    return res.status(200).send({vendors})
        
    } catch (error) {

        res.status(500).send({message:"internal error occured"})
        
    }

}

//get single vendor by Id


const getSingleVendor = async(req,res)=>{

    const vendorId = req.params.id
    try {
            
       

        const vendor = await VendorModel.findById(vendorId)
        if(!vendor){
            return res.status(404).send({message:"vendor not found"})
        }

        return res.status(200).send({vendor})

    }
    catch(error){

        res.status(500).send({message:"internal error occured"})
        
    }
    



     
}











module.exports = {vendorRegister, vendorLogin,getAllVendors,getSingleVendor}
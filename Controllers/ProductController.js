const ProductModel = require("../Models/ProductModel")
const FirmModel = require('../Models/FirmModel')
const multer = require("multer")
const path = require("path");
const { message } = require("prompt");


// Set storage engine for Multer
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({storage:storage})

  


  const addProduct = async(req,res)=>{
   

   

    try {
        const {productName, price, category,  bestseller, description} = req.body
        const Image = req.file?req.file.filename:undefined
    
        const FirmId = req.params.id;

        const firm = await FirmModel.findById(FirmId)
    if(!firm){
        return res.status(404).send({message:"firm not found"})
    }

    const product = new ProductModel({
        productName, price, category, Image, bestseller, description, firm:firm._id
    })


    const savedProduct = await product.save()

    firm.products.push(savedProduct)

    await firm.save()

    res.json(savedProduct)

    return res.status(200).send({message:"product added successfull"})
    
        
    } catch (error) {
        console.log(error)

        res.status(500).send({message:"internal error occured"})
        
    }


  }


  //get all products by firmId

  const getAllProducts = async(req,res)=>{
    try {
        const firmId = req.params.id

        

        const firm = await FirmModel.findById(firmId)
        const restaruntName = firm.firmName

        if(!firm){
            return res.status(404).send({message:"firm not found"})
        }

        const products = await ProductModel.find({firm:firmId})
        return res.status(200).send({restaruntName,products})





    } catch (error) {

        console.log(error)

        res.status(500).send({message:"internal error occured"})
        
    }


  }


  //delete productbyId

  const deleteProductById = async(req,res)=>{
  try {
    const productId = req.params.id;

    const deletedProduct = await ProductModel.findByIdAndDelete(productId)
    if(!deletedProduct){
        return res.status(404).json({message:"no product deleted"})
    }

    res.status(200).send({message:"product deleted successfully"})
    
  } catch (error) {


    console.log(error)


    res.status(500).send({message:"internal error occured"})
    
  }


  }


  module.exports = {addProduct:[upload.single('Image'),addProduct],getAllProducts,deleteProductById}
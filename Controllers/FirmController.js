
const FirmModel = require("../Models/FirmModel")
const VendorModel = require("../Models/VendorModel")
const multer = require("multer")
const path = require("path");



// Set storage engine for Multer
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({storage:storage})


  const addFirm = async(req,res)=>{
   try {

    const {firmName,area, category,region,offer} = req.body

    const Image = req.file?req.file.filename:undefined

    const vendor = await VendorModel.findOne(req.vendorId)

    const newFirm = new FirmModel({
        firmName,
        area, 
        category,
        region,
        offer,
        Image,
        vendor:vendor._id
    })

    const savedFirm = await newFirm.save()
    vendor.firm.push(savedFirm)
    await vendor.save()
   

    
    return res.status(200).send({message:"firm added successfully"})
    
   } catch (error) {
    console.log(error)
    return res.status(500).send({message:"intrnal error occured"})
    
    
   }
  }

  //delete firm by id

  const deleteFirmById = async(req,res)=>{
    try {
      const FirmId = req.params.id;
  
      const deletedFirm = await FirmModel.findByIdAndDelete(FirmId)
      if(!deletedFirm){
         
          return res.status(404).json({message:"no firm deleted"})
          
      }
  
      res.status(200).send({message:"firm deleted successfully"})
      
    } catch (error) {
  
  
      console.log(error)
  
  
      res.status(500).send({message:"internal error occured"})
      
    }
  
  
    }
  
  

  module.exports = {addFirm:[upload.single('image'),addFirm],deleteFirmById}
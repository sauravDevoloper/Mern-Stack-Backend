const express = require("express");
const FirmController = require("../Controllers/FirmController");
const VerifyToken = require('../Middleware/VerifyToken');



const router = express.Router()

router.post("/addfirm",VerifyToken,FirmController.addFirm);
router.get('uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent("Content-Type", "image/jpeg")
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
})
router.delete('/deleteFirm/:id',FirmController.deleteFirmById)

module.exports = router;
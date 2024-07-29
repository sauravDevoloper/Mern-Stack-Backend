const ProductController  = require("../Controllers/ProductController")
const express = require("express")

const router = express.Router()

router.post("/:id",ProductController.addProduct)
router.get('/:id',ProductController.getAllProducts)
router.get('uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent("Content-Type", "image/jpeg")
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
})
router.delete("/deleteProduct/:id",ProductController.deleteProductById)
module.exports = router
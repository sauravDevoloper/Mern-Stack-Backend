const vendorController = require("../Controllers/VendorController")
const express = require("express")


const router = express.Router();

router.post("/register",vendorController.vendorRegister)
router.post("/login",vendorController.vendorLogin)
router.get("/allvendors",vendorController.getAllVendors)
router.get("/single/:id",vendorController.getSingleVendor)


module.exports = router
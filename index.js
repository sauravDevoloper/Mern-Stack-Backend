const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")
const vendorRoute = require("./Routes/VendorRoute")
const FirmRoute = require("./Routes/FirmRoute")
const ProductRoute = require("./Routes/ProductRoute")
const path = require("path")



const app = express();

app.use(cors())

const port = 4000;

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('database connected Successfully')
})
.catch((err)=>{
    console.log(err)
})

app.use(express.json())
app.use("/vendor",vendorRoute)
app.use("/firm",FirmRoute)
app.use("/product",ProductRoute)
app.use("/uploads",express.static('uploads'))


app.listen(port,()=>{
    console.log('server connected successfully')
})

app.use("/", (req,res)=>{
    res.status(200).send("<h1>MULTI VENDOR MERN STACK APPLICATION</h1>")
})
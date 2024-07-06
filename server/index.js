const express=require("express");
const app=express();

// creating a dotenv for hiding the content and restrict the access 
const dotenv=require("dotenv");
dotenv.config();
const cors = require("cors");

const userRoute=require('./routes/user');
const authRoute=require('./routes/auth');
const productRoute=require('./routes/product');
const orderRoute=require('./routes/order');
const cartRoute=require('./routes/cart');
const stripe=require('./routes/stripe');

// connecting the database to the application through mongodb

const mongoose=require("mongoose");
// mongodb+srv://saiphanindrachalla:phani123@cluster0.duwux36.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Db connection succesful"))
.catch((err)=>{
    console.log(err);
});


// creating end points

// app.get("/api/test",()=>{
//     console.log("test is succesful");
// });

// we have created the routers

app.use(express.json());
app.use(cors());
app.use("/api/users",userRoute);
// lh:5000/api/users/usertest
app.use("/api/products",productRoute);
app.use("/api/orders",orderRoute);
app.use("/api/cart", cartRoute);

app.use("/api/checkout", stripe);

app.use("/api/auth",authRoute);
app.listen(process.env.PORT||5000,()=>{
    console.log("Backend server is running");
});
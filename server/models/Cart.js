const mongoose=require("mongoose");


const CartSchema=new mongoose.Schema(
    {
        title:{type:String,required:true,unique:true},
        products:[
            {
                productId:{
                    type:String,
                },
                quantity:{
                    type:Number,
                    default:1,
                },
            },
        ],
    },
    {timestamp:true}
);
module.exports=mongoose.model("Cart",CartSchema);
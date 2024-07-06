    const mongoose=require("mongoose");


    const Orderschema=new mongoose.Schema(
        {
            userId: { type: String },
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
            amount:{type:Number,required:true},
            address:{type:String,required:true},
            status:{type:String,default:"pending"}
        },
        {timestamp:true}
    );
    module.exports=mongoose.model("Order",Orderschema);



const mongoose=require("mongoose");


const ProductSchema=new mongoose.Schema(
    {
        title:{type:String,required:true,unique:true},
        description:{type:String,required:true},
        img:{type:String,required:true},
        categories:{type:Array},
        size:{type:Array},
        color:{type:Array},
        price:{type:Number,required:true},
        instock:{type:Boolean,default:true},
    },
    {timestamp:true}
);
module.exports=mongoose.model("Product",ProductSchema);
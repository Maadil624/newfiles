import mongoose from "mongoose";

const FileUploadModel=new mongoose.Schema({
    index:{
        type:String
    },
    name:{
        type:String,
        required:[true,"file name is required.."]
    },
    data:{
        type:Array
    }
})

export default mongoose.model('files',FileUploadModel)
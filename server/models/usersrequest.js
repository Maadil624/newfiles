import mongoose from "mongoose";
// import validator from 'validator'
const usersRequest = new mongoose.Schema({
    action: {
        type: String
        // required:true
    },
    fileid: {
        type: String
        // validate:validator.isEmail
    },
    filename: {
        type: String
        // required:true
    },
    index:{
        type:String
    },
    olddata:{
        type:Object
    },
    data: {
        type: Object
    },
    email:{
        String
    }
})
export default mongoose.model('usersrequest', usersRequest)
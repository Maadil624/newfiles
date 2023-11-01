import mongoose from "mongoose";
// import validator from 'validator'
const userModel = new mongoose.Schema({
    name: {
        type: String,
        // required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // validate:validator.isEmail
    },
    password: {
        type: String,
        required: true,
        // validate:validator.isStrongPassword
    },
    mobile: {
        type: String,
        // required:true
    },
    role:{
        type:String,
        default:"user"
    }
})
/* export using the syntax 
& users is schema name in mnDB
 and model type is designed above name
*/
export default mongoose.model('users', userModel)
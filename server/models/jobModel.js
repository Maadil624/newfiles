import mongoose from "mongoose";
// import validator from 'validator'
const jobModel = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Company name is required....."]
    },
    position: {
        type: String,
        required: [true, "position is required....."]
    },
    location: {
        type: String,
        required: [true, "location is required....."],
        default: 'Hyderabad'
    }
}, { timestamps: true })
/* export using the syntax 
& jobs is schema name in mnDB
 and model type is designed above name
*/
export default mongoose.model('jobs', jobModel)
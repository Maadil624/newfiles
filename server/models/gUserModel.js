import mongoose from "mongoose"
const gUserModel=new mongoose.Schema({
        email: {
          type: String,
          required: [true,"email is required"]
        },
        name: {
          type: String,
          required:[true,"name is required"]
        }
      });

export default mongoose.model('guser',gUserModel)
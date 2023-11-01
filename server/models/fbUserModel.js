import mongoose from "mongoose"
const fbUserModel=new mongoose.Schema({
        id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required:true,
        }
      });

export default mongoose.model('fbuser',fbUserModel)
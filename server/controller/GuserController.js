import gUserModel from "../models/gUserModel.js";
import jwt from 'jsonwebtoken'
const GuserController = async (req, res) => {
    try{
        const { email, name } = req.body;
        console.log('at guser controller',email,name)
        const newuser = {
        name: name,
        email: email
    }
    const extuser = await gUserModel.findOne({ email })
    const token = jwt.sign({ email }, "hello", { expiresIn: "10m" })
    if (!extuser) {
        const user = await gUserModel.create(newuser)
        console.log(user)
    }
    // const createduser = await gUserModel.findOne({})
    res.status(200).send({
        sucess: true,
        message: "login sucessful..",
        token,
        email
    })
}catch(err){
    console.log('error at google controller',err)
}
}

export default GuserController;
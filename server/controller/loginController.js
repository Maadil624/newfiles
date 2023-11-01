import userModels from "../models/userModels.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import usersNotifications from "../models/usersNotifications.js"

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        // email="shbc",password="xszx"
        console.log(email, password)
        if (!email && !password) {
            return res.status(400).send({
                sucess: false,
                message: "provide the login details"
            })
        }
        const condition1 = { email: email };
        const condition2 = { role: 'Admin' };
        // Use $and to combine conditions
        const query = { $and: [condition1, condition2] };
        // getting email to validate the password
        let pass = await userModels.findOne({ email })

        // let admin = await userModels.findOne(query)
        // let admin=admins.filter(data=>{
        //     return data.email==email
        // })
        // console.log('admin', admin[0])
        // console.log('admin', admin)
        console.log("password line", pass)
        // console.log(admin)
        if (pass == null || !pass) {
            return res.status(400).send({
                sucess: false,
                message: "email or password is wrong"
            })
        } else {
            let role = pass.role
            // password validation using bcrypt compare
            let validpass = await bcrypt.compare(password, pass.password)
            console.log(validpass)

            //Agaring fetching data 
            const user = await pass && validpass
            console.log(user)
            // const signt=id=>{
            //     return jwt.sign({id},"hello",{expiresIn:"1m"})
            // }
            if (!user) {
                return res.status(400).send({
                    sucess: false,
                    message: "email or password is wrong.."
                })
            }
            if (user) {
                const token = jwt.sign({ id: pass._id, username: role }, "hello", { expiresIn: "60m" })
                if (role == 'Admin') {
                    return res.status(200).send({
                        sucess: true,
                        message: "Admin login sucessfull..",
                        role,
                        pass,
                        token
                    })
                }
                else {
                    if (user && role == 'user') {
                        return res.status(200).send({
                            sucess: true,
                            message: "login sucessfull..",
                            role,
                            pass,
                            token
                        })
                    }
                }
            }
        }
        // const token=signt(user.email)
    }
    catch (err) {
        console.log("error at login controller...", err)
    }
}

export const status = async (req, res, next) => {
    let alive = true
    try {
        if (alive) {
            console.log('server is live')
            next()
        } else {
            return res.status(200).send({
                sucess: true,
                message: "Server is Offline",
                error
            })
        }
    }
    catch (error) {
        console.log('Error at server status check middleware', error)
    }

}

export const verifyUser = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(400).json({
            status: "false",
            message: "no token provided"
        })
    }
    try {
        const decoded = jwt.verify(token, 'hello')
        next()
    } catch (err) {
        return res.status(200).json({
            status: "false",
            message: err.message
        })
    }
}

export const allUsers = async (req, res) => {
    try {
        const { data } = req.query
        console.log(req.query)
        const users = await userModels.find()
        // validate here also with backend database 
        // take input from admin end to check the existence of details in db
        // then send the details to frontend if true
        let admin = users.filter((data, id) => {
            if (data.role == "Admin") {
                return data
            }
        })
        // console.log(admin[0].role==data)
        if (admin[0].role == data) {
            return res.status(200).json({
                sucess: true,
                message: 'All users details',
                data: { users }
            })
        }
        else {
            return res.status(200).json({
                success: false,
                message: "only Admins can access",
            })
        }

    } catch (err) {
        return res.status(200).json({
            status: "false",
            message: err.message
        })
    }

}

export const createNotification = async (req, res) => {
    try {
        const { data } = req.body
        console.log('165', data)
        const existdata = await usersNotifications.find({ _id: data._id })
        console.log('existing data=', existdata)
        let newNotification = {
            Notification: data
        }
        if (existdata.length > 0) {
            return
        }
        if (!existdata.length > 0) {
            const users = await usersNotifications.create(newNotification)
            console.log('created data=', users)
        }
    }
    catch (error) {
        console.log('Error at Notifications', error)
    }
}

export const allNotifications = async (req, res) => {
    try {
        let allNotifications = await usersNotifications.find()
        if (allNotifications) {
            return res.status(200).send({
                success: true,
                message: "All notifications",
                allNotifications
            })
        }
    }
    catch (error) {
        console.log("Error At Allnotifications", error)
    }
}

export const deleteNotifications = async (req, res) => {
    try {
        const { id } = req.params
        let deleteNotification = await usersNotifications.deleteOne({ _id: id })
        if (deleteNotification) {
            return res.status(200).send({
                success: true,
                message: "deleted notifications",
                deleteNotification
            })
        }
    }
    catch (error) {
        console.log("Error At delete notifications", error)
    }
}
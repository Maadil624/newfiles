import jobModel from "../models/jobModel.js"
import jwt from "jsonwebtoken"
import { io } from "../server.js"
// import { Socket } from "socket.io"
export const jobController = async (req, res) => {
    try {
        const { company, position } = req.body
        if (!company || !position) {
            res.status(400).send({
                sucess: false,
                message: "please provide job and company createjob"
            })
        }
        const extjob = await jobModel.findOne({ company: company, position: position })
        if (extjob) {
            return res.status(200).send({
                sucess: true,
                message: "job already exists"
            })
        }
        const newjob = {
            company,
            position
        }
        if (!extjob) {
            const job = await jobModel.create(newjob)
        }
        io.on("connection", async (socket) => {
            console.log("user connected....")
            socket.emit("created_job", (data) => {
                console.log(data)
            })
        })
        res.status(200).json({
            sucess: true,
            message: "job created sucessfully......"
        })
    }
    catch (err) {
        console.log(err)
    }
}
// middlw to verify the user login using jwt
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
// alljobs middleware
export const allJobs = async (req, res) => {
    const job = await jobModel.find();
    res.status(200).json({
        sucess: true,
        job,
        totalJobs: job.length
    })
}
// middleware to update the jobs
export const updatejob = async (req, res) => {
    try {
        const { id } = req.params
        const { position, location } = req.body
        if (!location || !position) {
            console.log("provide the job n position name")
        }
        const job = await jobModel.findOne({ _id: id })
        if (!job) {
            console.log("job is not there.....")
        }
        const updatejob = await jobModel.findOneAndUpdate({ _id: id }, {
            location,
            position
        })
        res.status(200).json({
            sucess: true,
            updatejob
        })

    }
    catch (err) {
        console.log(err)
    }
}
// middleware to delete the jobs
export const deletejob = async (req, res) => {
    try {
        let { id } = req.params
        // id='64b3b4f0a3aa2a2778d36113'
        console.log("id at delete", id)
        const job = await jobModel.findOne({ _id: id })
        if (!job) {
            console.log("job not found...")
        }
        io.on("connection", async (socket) => {
            console.log("user connected....")
            let dltd = await job.deleteOne({ _id: id })
            await socket.on("delete_job", (data) => {
                console.log(data)
                {
                    dltd &&
                    socket.emit("data_after_deletion", {
                        job: job._id
                    })
                }
            })
        })

        res.status(200).json({
            sucess: true,
            msg: "job deleted....",
            job
        })
    }
    catch (err) {
        console.log(err)
    }
}
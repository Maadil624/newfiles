import express from 'express'
import { allJobs, deletejob, jobController, updatejob, verifyUser } from '../controller/jobController.js'
// initilize express withb pre defined method rooouter for routing
const jobRoute = express.Router()

// importing testing from router folder
// logic part is implemented in testing part
// route.get('/',(req,res)=>{res.json("api..z..");})

// job creation and getting all jobs
jobRoute.post('/createjob', verifyUser,jobController)
jobRoute.get('/alljob',allJobs)

// job updates and delete the jobs

// update job
// put is to update all data patch to one r two
jobRoute.patch('/updatejob/:id', updatejob)
// delete job
jobRoute.delete('/deletejob/:id', deletejob)

export default jobRoute
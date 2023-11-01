import mongoose from "mongoose";
// import validator from 'validator'
const usersNotifications = new mongoose.Schema({
    Notification: {
        type: Object
        // required:true
    }
})
export default mongoose.model('usersnotifications', usersNotifications)
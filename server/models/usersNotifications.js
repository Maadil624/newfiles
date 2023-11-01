import mongoose from "mongoose";
// import validator from 'validator'
const usersNotifications = new mongoose.Schema({
    Notification: {
        type: Object
    }
})
/* export using the syntax 
& users is schema name in mnDB
 and model type is designed above name
*/
export default mongoose.model('usersNotification', usersNotifications)
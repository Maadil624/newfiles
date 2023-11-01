import express from 'express'
import userController from '../controller/userController.js'
import { allNotifications, allUsers, createNotification, deleteNotifications, loginController, status, verifyUser } from '../controller/loginController.js'
import multer from 'multer';
import { fileUpload, filefetch, deleteuser, deletedata, deletefile, updatefiledata, userrequest, adminrequest, admindelreq } from '../controller/FileUploadController.js'
import GuserController from '../controller/GuserController.js'
import passport from 'passport';
import { data } from '../views/graphImp.js'
import { authurl, callbackurl, linkedinrresponce, lnklogout } from '../controller/LinkdenController.js';
// initilize express with pre defined method router for routing
const route = express.Router()
// console.log(data.renderer.run())
// File Upload Routes
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
// filefilter to get required file
const fileFilter = (req, file, cb) => {
  // let response = new Response();
  // console.log(file)
  if (
    file.mimetype === "application/vnd.ms-excel" ||
    file.mimetype === "application/msexcel" ||
    file.mimetype === "application/x-ms-excell" ||
    file.mimetype === "application/x-excel" ||
    file.mimetype === "application/xls" ||
    file.mimetype === "application/csv" ||
    file.mimetype === "text/csv" ||
    file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype === "application/x-msexcel" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/doc" ||
    file.mimetype === "application/msword" ||
    file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    try {
      cb(new Error("Not an Csv! Please upload an CSV File.", 400), false);
    } catch (err) {
      console.log("hiiiii")
    }
  }
};
// 'uploads/' is the destination folder for uploaded files
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1000 * 1024,//1024 is 1kb
    files: 3
  },
  fileFilter: fileFilter
});

// server online status check
// route.get('/check',status)

// Attach the upload middleware to the route that handles the file upload
route.route('/fileupload').post(verifyUser, upload.any('file'), fileUpload)
route.get('/fileusers', verifyUser, filefetch)
route.get('/adminrequest', verifyUser, adminrequest)
route.delete('/adminreqdel/:id', admindelreq)
route.post('/getdeletedata', deletedata)
route.delete('/deletefileuser/:id', deleteuser)
route.delete('/deletefile/:id', deletefile)
route.put('/updatefiledata/:id', updatefiledata)
// ALL Notification handling Routes
route.get('/allNotifications', allNotifications)
route.post('/createnotification', createNotification)
route.delete('/deletenotification/:id', deleteNotifications)

// user Routes
route.post('/register', userController)
route.post('/login', status, loginController)
route.route('/allusers').get(verifyUser, allUsers)
route.route('/usersrequest').post(userrequest)

// Social Media Login Routes
// facebook and google auth routes
route.get('/facebook', passport.authenticate('facebook'));
route.get('/facebook/callback', passport.authenticate('facebook',
  {
    //   failureRedirect: `http://localhost:5000/profile`
    //   ,
    successRedirect: 'http://localhost:3000/alljob'
  }
), function (req, res) {
  console.log(req.user)
  let user = req.user
  res.status(200).send({
    success: true,
    message: "login sucessfull",
    user
  }).then(() => {
    redirect('http://localhost:3000/alljob')
  })
  // res.redirect('http://localhost:3000/alljob')
  //   console.log(res)
});


route.get('/', function (req, res) {
  res.render('index.ejs', { data });
  // load the index.ejs file
});
// linkdden routes
// List of scopes separated by spaces

route.get('/auth/linkedin', authurl);
route.get('/auth/linkedin/callback', callbackurl);
route.get('/linkedin', linkedinrresponce)
route.get('/logout', lnklogout)

// google auth routes
route.route('/glogin').post(GuserController)


export default route
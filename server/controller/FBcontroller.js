import passport from 'passport';
import { Strategy } from 'passport-facebook';
import fbUserModel from '../models/fbUserModel.js';
import jwt from 'jsonwebtoken'
Strategy.Strategy;
passport.use(new Strategy({
  clientID: "971734947214831",
  clientSecret: "1eb52a0f16e522641c0fa33ff349aaac",
  callbackURL: '/facebook/callback'
},
function(accessToken, refreshToken, profile, cb) {
  // save the profile on the Databaseclg
  jwt.sign({id:profile.id},"hello",{expiresIn:'10m'})
  // console.log("At fb controller",profile.id)
  let id=profile.id
  const newuser={
    id:profile.id,
    name:profile.displayName
  }
  // console.log(profile)
  const extuser=fbUserModel.findOne({id})
  if(!extuser){
    const user =fbUserModel.create(newuser)
      console.log(user)
  }
  
  if(extuser){
    // const user =fbUserModel.create(newuser)
      console.log("user Exists with id",id)
  }
  // data(extuser);
  // Save the accessToken and refreshToken if you need to call facebook apis later on
  return cb(null, profile);
}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
// export const data=(req,res)=>{
//   res.json({
//     success:true,
//     message:"Fb login sucessfull"
//   })
// }

export default passport;

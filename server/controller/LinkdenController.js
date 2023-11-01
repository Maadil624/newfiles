import axios from 'axios'
import jwt from 'jsonwebtoken';
import querystring from 'querystring'

let data = {}
let tkn
const clientId = "86vhffcj7ahnn3";
const cid = 'Z31FbQ3ZmtEDH43b';
const redirectUri = "http://localhost:5000/auth/linkedin/callback";
// const redirectUri = "Z31FbQ3ZmtEDH43b";
const scope = ['openid', 'profile', 'email'];
let accessTkn

export const authurl = async (req, res) => {
  const authorizationUrl = `https://www.linkedin.com/oauth/v2/authorization` +
    `?response_type=code` +
    `&client_id=${clientId}` +
    `&redirect_uri=${redirectUri}` +
    `&scope=${scope}` +
    "&prompt=consent";
  // console.log(req.user)
  res.redirect(authorizationUrl);
}

export const callbackurl = async (req, res) => {
  console.log('at 28', req.session)
  // console.log('at 119',req)
  const authorizationCode = req.query.code;
  const tokenUrl = "https://www.linkedin.com/oauth/v2/accessToken";
  const tokenData = {
    grant_type: 'authorization_code',
    code: req.query.code,
    client_id: "86vhffcj7ahnn3",
    client_secret: "Z31FbQ3ZmtEDH43b",
    redirect_uri: "http://localhost:5000/auth/linkedin/callback"
  };

  try {
    const tokenResponse = await axios.post(tokenUrl, querystring.stringify(tokenData), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      // httpAgent: new http.Agent({ _sessionCache: null })
      // httpAgent: new http.Agent({ keepAlive: false })
    });
    // tokenResponse.headers.expires = null
    // tokenResponse.data.expires_in=1;
    const accessToken = tokenResponse.data.access_token;
    tkn = accessToken
    accessTkn = accessToken
    const expiresIn = tokenResponse.data.expires_in;
    // console.log('139', tokenResponse)
    // Use the access token as needed
    const profileResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(response => {
      console.log('Request successful');
      // console.log('Response:', response.data);
      data = JSON.parse(JSON.stringify(response.data))
    }).catch(error => {
      console.error('Error:', error);
    });
    console.log('data=', data)
    const queryParams = new URLSearchParams(data).toString();
    const token = jwt.sign({ name:data.email}, "hello", { expiresIn: "60m" })
    // Perform the redirect with query parameters
    return res.redirect("http://localhost:3000/fileupload?data="+queryParams+"&token="+token);
    // return res.redirect("http://localhost:3000/fileupload");
    // res.redirect('http://localhost:3000/linkedin?data='+queryParams)
    // res.redirect('http://localhost:3000/linkedin')
    // if(profileResponse){
    res.status(200).send({
      success:true,
      message:"login sucessful",
      profileResponse
    })
    // }
    // await axios.get('/logout',(req,res)=>{
    //   console.log('at 161',res)
    // })
    // res.send("Authentication successful! Access token: " + accessToken);
  } catch (error) {
    console.error("Error getting access token:", error.message);
    // console.error("Error getting access token:", error);
    res.status(200).send({ error })
  }
}

export const linkedinrresponce = async (req, res) => {
  console.log('query=', req.query)
  res.status(200).send({
    success: true,
    message: "Linked in login successfully!",
    data
  })
}

function clearTokens() {
  accessTkn = null;
  // idToken = null;
}
export const lnklogout = async (req, res) => {
  // req.session.destroy()
  //   req.session.destroy((err)=>{
  //   if (err){
  //     throw err;
  //   } else{
  //     console.log('logout sucessful')
  //   }
  // });
  clearTokens()
  console.log(req.session)
  if (req.session.destroy()) {
    res.redirect('http://localhost:3000/login')
  }
}


// // // Generate a code verifier and a code challenge
// const code_verifier = Randomstring.generate(128);

// // // // Generate a secret key
// const secret_key = Randomstring.generate(32);

// // // // Use crypto.createHmac instead of crypto.createHash
// const hmac = crypto.createHmac("sha256", secret_key);
// const base64Digest = hmac.update(code_verifier).digest("base64");
// const code_challenge = base64url.fromBase64(base64Digest);

// // // Construct the authorization URL with the code challenge
// export const authurl = async (req, res) => {
//   const authorizationUrl =
//     `https://www.linkedin.com/oauth/v2/authorization` +
//     `?response_type=code` +
//     `&client_id=${clientId}` +
//     `&redirect_uri=${redirectUri}` +
//     `&scope=${scope}` +
//     `&prompt=consent` +
//     `&max_age=10` +
//     `&code_challenge=${code_challenge}` +
//     `&code_challenge_method=S256`;
//   res.redirect(authorizationUrl);
// }

// // // Exchange the authorization code for an access token with the code verifier
// export const callbackurl = async (req, res) => {
//   const { code } = req.query;
//   console.log(req.query)
//   const tokenUrl = "https://www.linkedin.com/oauth/v2/accessToken";
//   const body = {
//     grant_type: "authorization_code",
//     code: code,
//     client_id: clientId,
//     client_secret: cid,
//     redirect_uri: redirectUri,
//     code_verifier: req.query.id_token, // Send the code verifier here
//   };

//   // const accessToken = tokenResponse.data.access_token;

//   const tokenResponse = await axios.post(tokenUrl, querystring.stringify(body), {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   })
//     .then((response) => {
//       // Handle the response here
//       console.log("Access token response:", response.data);
//     })
//     .catch((error) => {
//       // Handle the error here
//       console.error("Access token error:", error.response.data);
//     });
// }






// export const lnklogout=async(req, res) => {
//   // Invalidate LinkedIn session by making a request to the logout endpoint
//   const logoutUrl = 'https://www.linkedin.com/oauth/v2/logout';
//   console.log(accessTkn)
//   axios.get(logoutUrl,{
//     headers: {
//       Authorization: `Bearer ${accessTkn}`,
//       "Content-Type": "application/x-www-form-urlencoded"
//     }
//   })
//     .then(() => {
//       // Now, perform the logout for your application
//       // req.logout();
//       res.redirect('/login');
//     })
//     .catch((error) => {
//       // Handle errors
//       console.error(error);
//       res.redirect('/');
//     });
// }

// export const lnklogout=async(req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       throw err;
//     } else {
//       console.log('logout sucessful')
//       res.clearCookie('connect.sid')
//       res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
//       res.setHeader('Pragma', 'no-cache');
//       res.setHeader('Expires', '0');
//       res.redirect('http://localhost:3000/login')
//     }
//   });
// }
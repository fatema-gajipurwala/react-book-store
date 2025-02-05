const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const  User = require('../models/userModel');
const fetch = require('node-fetch');  

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

exports.googlelogin =  (req,res) => {
    const {idToken} = req.body;
    client.verifyIdToken({idToken,audience:process.env.GOOGLE_CLIENT}).then(response => {
        const {email_verified,name,email} = response.payload;
        if(email_verified){
            User.findOne({email}).exec((err,user) => {
                if(err){
                    return res.status(400).json({
                        error:"Something went wrong"
                    })
                }else{
                    if(user){
                        const token = jwt.sign({_id:user._id},process.env.JWT_SIGNIN_KEY,{expiresIn:'7d'});
                        const {_id,name,email} = user;
                        res.json({
                            token,
                            user:{_id,name,email}
                        });
                    }else{
                        let password = email + process.env.JWT_SIGNIN_KEY;
                        user = new User({name,email,password});
                        user.save((err,data) => {
                            if(err){
                                return res.status(400).json({
                                    error:"Something went wrong"
                                })
                            }
                            const token = jwt.sign({_id:data._id},process.env.JWT_SIGNIN_KEY,{expiresIn:'7d'});
                            const {_id,name,email} = data;
                            res.json({
                                token,
                                user:{_id,name,email}
                            })
                        })
                    }
                }

            })
        }
       // console.log(response.payload);
    })
}

exports.facebooklogin = (req, res) => {
    console.log('FACEBOOK LOGIN REQ BODY', req.body);
    const { userID, accessToken } = req.body;
  
    const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
  
    return (
      fetch(url, {
        method: 'GET'
      })
        .then(response => response.json())
        // .then(response => console.log(response))
        .then(response => {
          const { email, name } = response;
          User.findOne({ email }).exec((err, user) => {
            if (user) {
              const token = jwt.sign({ _id: user._id }, process.env.JWT_SIGNIN_KEY, {
                expiresIn: '7d'
              });
              const { _id, email, name, role } = user;
              return res.json({
                token,
                user: { _id, email, name, role }
              });
            } else {
              let password = email + process.env.JWT_SIGNIN_KEY;
              user = new User({ name, email, password });
              user.save((err, data) => {
                if (err) {
                  console.log('ERROR FACEBOOK LOGIN ON USER SAVE', err);
                  return res.status(400).json({
                    error: 'User signup failed with facebook'
                  });
                }
                const token = jwt.sign(
                  { _id: data._id },
                  process.env.JWT_SIGNIN_KEY,
                  { expiresIn: '7d' }
                );
                const { _id, email, name, role } = data;
                return res.json({
                  token,
                  user: { _id, email, name, role }
                });
              });
            }
          });
        })
        .catch(error => {
          res.json({
            error: 'Facebook login failed. Try later'
          });
        })
    );
  };



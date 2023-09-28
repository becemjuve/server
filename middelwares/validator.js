// require body
const {body, validationResult} = require('express-validator');

const registerRules=()=>[
    body("firstName","Name is required").notEmpty(),
    body("lastName", "lastName is required").notEmpty(),
    body("email","email is required").isEmail(),
    body("password","password must contain at least 6 caratcters").isLength({
         min: 2 ,
         max : 20
         })
  ];  


  const loginRules=()=>[
    body("email","email is required").isEmail(),
    body("password","password must contain at least 6 caratcters").isLength({
         min: 2 ,
         max : 20 
        })
  ];

  const validator=(req,res,next)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const errorObject = {};
  
      errors.array().forEach(error => {
        errorObject[error.msg.split(' ')[0]] = error.msg;
      });
  
      return res.status(400).json({ errors: errorObject });
    }
    next()
  }
  module.exports={registerRules , loginRules , validator}
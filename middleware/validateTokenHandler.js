const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req,res, next)=>{
      let token;
      const authHeader = req.headers.Authorization || req.headers.authorization;
      
      if(authHeader && authHeader.startsWith("Bearer"))
      {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode)=>{
              if(err)
              {
                console.log(err);
                res.status(401);
                throw new Error("User is not authorized");
              }

              console.log(decode);
              req.user = decode.user;
             next();
        });
        
       if(!token)
       {
           res.status(401);
           throw new Error("The token is invalid or has expired");
       }
      }
});

module.exports = validateToken;

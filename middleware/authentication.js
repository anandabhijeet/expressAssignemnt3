const JWT = require("jsonwebtoken");

const isAuthorized = (req, res, next)=>{
    if(!req.headers['authorization']) return next( res.send("unautorized"));
    const autHeader = req.headers['authorization'];
    const bearerToken = autHeader.split(' ');
    const token = bearerToken[1];
   
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload)=>{
        if(error) {
            return next(res.send("Unauthorized"))
        }
        req.payload = payload
        next()
    })
}

module.exports={
    isAuthorized
}
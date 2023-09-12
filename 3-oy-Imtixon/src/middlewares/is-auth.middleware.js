const { verifyToken } = require("../utils/jwt");

const isAuth =async (req,res,next)=>{
    try {
        const token = req.headers.authorization;

        if(!token){
            return res.status(403).json({message:"Invalit token"});
        };
        verifyToken(token,(err,data)=>{
            if(err){
                return res.status(403).json({message:"Invalit token"});
            };
            req.verify = data;
            next();
        })
    } catch (error) {
        res.status(401).json({message:"Server Error"});
    }
};

module.exports = isAuth
const { knex } = require("../database")

const isTeacher = async(req,res,next)=>{
    try {
        const teacher = await knex("users").select("*").where({id:req.verify.id});

        if(teacher.isadmin==false){
            return res.status(402).json({message:"only teacher"});
        };
        next();
    } catch (error) {
        res.status(401).json({message:"error server"});
    };
};

module.exports = isTeacher;
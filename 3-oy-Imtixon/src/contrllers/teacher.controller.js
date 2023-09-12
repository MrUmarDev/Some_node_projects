const {extname} = require("path");
const{v4} = require("uuid")
const Joi = require("joi");
const { knex } = require("../database");

const createImtixon = async(req,res)=>{
    try {
        const{file} = req.files;
        const{guruh,timeoff}= req.body;
        
        const{error} = Joi.object({
            guruh:Joi.number().required(),
            timeoff:Joi.string().required(),
        }).validate({guruh,timeoff});
        if(error){
            return res.status(403).json({message:error.message});
        };
        const filename = file.name;
        const create_at = Date.now();
        file.mv(process.cwd()+`/uploads/`+filename);
        const newI  = await knex("imtixon").insert({filename,create_at,guruh,timeoff}).returning("*")
        res.status(201).json({message:"secces",data:newI});
    } catch (error) {
        res.status(403).json({message:error.message});
    }
};

const createBall=async(req,res)=>{
    try {
    const{name,surename,ball} = req.body;
    
    const{error} = Joi.object({
        name:Joi.string().required(),
        surename:Joi.string().required(),
        ball:Joi.number().required(),
    }).validate({
        name:name?.trim(),
        surename:surename?.trim(),
        ball,
    });
    if(error){
        return res.status(403).json({message:error.message});
    }
    console.log(typeof ball);
    const user = await knex("users").select("*").where({name:name,surname:surename}).first();
    const crea = await knex("users").update({ball:user.ball + Number(ball)}).where({name:name,surname:surename}).returning("*");
    
    res.status(201).json({message:crea});
    } catch (error) {
        res.status(403).json({message:error.message});
    }
};

const viwFiles = async(req,res)=>{
    try {
        const {guruh} = req.body
        
        const users = await knex("users").select("*").where({guruh:guruh});

        res.status(201).json({message:users});
    } catch (error) {
        res.status(403).json({message:error.message});
    }
}

module.exports = {
    createImtixon,
    createBall,
    viwFiles,
}
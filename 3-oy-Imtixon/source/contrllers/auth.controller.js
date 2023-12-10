const bcrypt = require("bcrypt");
const Joi = require("joi");
const { knex } = require("../database");
const { genereateToken } = require("../utils/jwt");

const register = async(req,res)=>{
    try {
        const{name,surname,password,guruh} = req.body;

        const {error} = Joi.object({
            name:Joi.string().max(32).required(),
            surname:Joi.string().min(6).required(),
            password:Joi.string().min(3).required(),
            guruh:Joi.number().required(),
        }).validate({
            name:name?.trim(),
            surname:surname?.trim(),
            password:password?.trim(),
            guruh,
        });
        if(error){
            return res.status(401).json({message:error.message});
        };
        
        const user = await knex("users").select("*")
        .where({name:name,surname:surname})
        .first();
        if(user){
            return res.status(409).json({message:"Username Allready exists"});
        };
        const hashed = await bcrypt.hash(password,12);
        const newUser = await knex("users").insert({
            name:name,
            surname:surname,
            password:hashed,
            guruh:guruh,
        }).returning("*")
        
        const Token = genereateToken({id:newUser.id});
        res.status(201).json({message:newUser,token:Token});
    } catch (error) {
        res.status(401).json({message:"Error Server",data:error.message});
    }
};

const login = async(req,res)=>{
    try {
        const{name,password} = req.body;
        const{error} = Joi.object({
            name:Joi.required(),
            password:Joi.required(),
        }).validate({
            name:name?.trim(),
            password:password?.trim(),
        });
        const user = await knex("users").select("*").where({name:name}).first();
        if(user.length == 0){
            return res.status(401).json({message:"Invalit username or password"});
        }
        const compare = await bcrypt.compare(password,user.password);
        if(!compare){
            return res.status(401).json({message:"Invalit username or password"});
        };
        const Token = genereateToken({id:user.id});
        res.status(201).json({message:"succes",token:Token})
    } catch (error) {
        res.status(401).json({message:"Error Server",data:error.message});
    }
};

module.exports = {
    register,
    login,
};
const {extname} = require("path");
const {v4} = require("uuid");
const { knex } = require("../database");

//oquvchi faqatgini fileni yuborishi mumkin

const filestudent=async(req,res)=>{
    try {
        const{file} = req.files;
        
        const id = req.verify.id;
        
        const user = await knex("users").select("*").where({id:id}).first();
        
        const filename = file.name = `${file.name} ${user.name}`;
        
        const create_at = Date.now();
        
        file.mv(process.cwd()+`/uploads/`+filename);

        const newF = await knex("file").insert({filename,create_at}).returning("*");
        
        const newUser = await knex("users").update({file:filename}).where({id:id});
        
        res.status(201).json({message:"succes",data:newF})
        
        const topolmadim = await knex("imtixon").select("*");
        const ball =create_at-topolmadim[topolmadim.length - 1].create_at
        const son = (topolmadim[topolmadim.length - 1].timeoff).length - 1

        const berilganvaqt = topolmadim[topolmadim.length - 1].timeoff.slice(0,son)*60;
        
        const ketganvaqt = ball/100/60/60;
        if(berilganvaqt - ketganvaqt < 0){
            const bal = Math.trunc(ketganvaqt - berilganvaqt/5);
            const a = await knex("users").update({ball:userInfo.ball - bal}).where({id:id});
        }
    } catch (error) {
        res.status(401).json({message:error.message})
    }
};


// bu yerda qaysi guruhda oqiyotgan bolsa osha guruh uchun imtixon savollarini chiqarib beradi
const findAllexam = async(req,res)=>{
try {
    const guruh = await knex("users").select('guruh').where({id:req.verify.id}).first();
    const All = await knex("imtixon").select("*").where({guruh:guruh.guruh});
    console.log(All,guruh.guruh);
} catch (error) {
    res.status(401).json({message:error.message})
}
};

module.exports = {
    filestudent,
    findAllexam,
}
const userModel= require("../models/user");

async function handleGetAllUsers(req, res) {
    const allDbUsers= await userModel.find({});
    return res.json(allDbUsers)
}

async function handlegetUserById(req, res) {
    const id=req.params.id;
    const user= await userModel.findById(id);
    if(!user){
        return res.status(404).json({error:"User not found"});
    }
    return res.json(user);
}

async function handleDeleteUserById(req, res) {
const id=req.params.id;
    const user= await userModel.findByIdAndDelete(id);
    if(!user){
        return res.status(404).json({error:"User not found"});
    }
    return res.json({message:"User deleted successfully"});
}

async function handleUpdateUserById(req, res) {
    const id=req.params.id;
    const body=req.body;
    const user= await userModel.findByIdAndUpdate(id,{
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
        jobTitle:body.job_title,}
    ,{new:true});
    if(!user){
        return res.status(404).json({error:"User not found"});
    }
    return res.json({message:"User updated successfully",user});
}

async function handleCreateUser(req, res) {
    
    const body = req.body;
        if(!body|| !body.first_name || !body.last_name || !body.email || !body.gender){
            return res.status(400).json({error:"Missing required fields"});
        }
       const result = await userModel.create({
            firstName:body.first_name,
            lastName:body.last_name,
            email:body.email,
            jobTitle:body.job_title,
            gender:body.gender
        });
      //  console.log("User created:", result);
        return res.status(201).json({status:"success",id: result._id});
    }
module.exports={
    handleGetAllUsers,
    handlegetUserById  ,
    handleDeleteUserById,
    handleUpdateUserById,
    handleCreateUser,
};

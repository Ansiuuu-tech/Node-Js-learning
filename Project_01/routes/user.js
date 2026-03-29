const express = require('express');
const {handleGetAllUsers,
    handlegetUserById,
    handleDeleteUserById,
    handleUpdateUserById,
    handleCreateUser
}= require("../controllers/user");
const router = express.Router();


router.route("/")
.get(handleGetAllUsers)
.post(handleCreateUser);


router
.route("/:id")
.get(handlegetUserById)
.delete(handleDeleteUserById)
.put(handleUpdateUserById)
    

    module.exports=router;
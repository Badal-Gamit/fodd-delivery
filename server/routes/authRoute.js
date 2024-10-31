const exress=require('express');
const { loginController, RegistrationController, updateControler } = require('../Controller/authController');
const { isverify, isadmin } = require('../middleware/jwt');
const  router=exress.Router()

router.post('/login',(req,res)=>loginController(req,res))
router.post('/register',RegistrationController)
router.post('/update',isverify,updateControler)
module.exports=router
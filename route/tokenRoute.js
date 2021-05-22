/**
 * gettoken router
 * only for get token
 * vaidate username and password in request body
 * and pass to uthentication server to authenticate the user
 */
const router=require('express').Router();
const {checkAndAssignToken}=require('../controllers/oAuth/authServer');
const {gettokenValidate,validateResult}=require('../validations/tokenHandlerValidation');

router.post('/',gettokenValidate(),validateResult,checkAndAssignToken);
module.exports=router;
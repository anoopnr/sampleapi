/**
 * All api routes will be coming here
 * validates req.body for Authorization
 * then verify toekn is valid 
 * if token is valid procced to get requested route
 */
const router=require('express').Router();
const {verifyTokenCommon}=require('../controllers/oAuth/authServer');
const {getProducts,addProduct}=require('../controllers/api/productController');
const {getProductsValidate,postProductsValidate,validateResult}=require('../validations/tokenHandlerValidation');

router.get('/',(req,res)=>{
    res.status(200).json({
        "message":"Welcome to API",
        "status":"SUCCESS"
    });
});

router.get('/products',getProductsValidate(),validateResult,verifyTokenCommon,getProducts);
router.post('/products',postProductsValidate(),validateResult,verifyTokenCommon,addProduct);

module.exports=router;

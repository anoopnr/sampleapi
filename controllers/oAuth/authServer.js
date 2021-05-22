/**
 * This will mimic the authentication server
 * check the user deatils agianest user details in db
 * create an encrypted token with created date
 * For rest of the communications this token is decrypted
 * check its created with in a minute
 * then allows to procced with the desired api call
 */
const users=require('../../DB/users.json');
const {encode,decode}=require('./chipher');
const checkAndAssignToken=(req,res)=>{
    const{username,password}=req.body;
    var user=users.filter((f)=> {return f.username==username && f.password==password});
    if(user.length>0){
        var createdTime=Date.now();
        var authObj={"role":user[0].role,"time":createdTime};
        var token=encode(JSON.stringify(authObj));
        res.status(200).json({        
            "code":"AUTHENTICATION_SUCCESS",
            "token":token
        })
    }
    else{
        res.status(401).json({
            'code': 'UNAUTHORIZED'
        });
    }
}

const verifyTokenCommon=(req,res,next)=>{   
    const{Authorization}=req.body;
    var token=Authorization.replace("Bearer ","");
    var secretStr=decode(token);
    var secretObj;
    try{
        secretObj=JSON.parse(secretStr);
    }
    catch(ex){
        return res.status(401).json({
            'code': 'UNAUTHORIZED'
        });
    }
    var createdTime=secretObj.time;
    var currentTime=Date.now();
    var diff=currentTime-createdTime;
    //token valid only for 1 minute
    if(diff>60000){
        res.status(401).json({
            'code': 'UNAUTHORIZED'
        });
    }        
    else
        return next();
}

module.exports={
    checkAndAssignToken,
    verifyTokenCommon
}
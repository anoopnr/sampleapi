/**
 * products control
 */
const products=require('../../DB/products.json');
const fs=require('fs');
const getProducts=(req,res)=>{
    res.status(200).json({        
        "code":"SUCCESS",
        "data":products
    })
}
const addProduct=(req,res)=>{
    const{id,name,category}=req.body;
    products.push({
        "id":id,
        "name":name,
        "category":category
    });
    fs.writeFile("./DB/products.json", JSON.stringify(products), err => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                'code':'SERVER_ERROR',
                'description': 'something went wrong, Please try again'
            })
        }
        else{
            return res.status(200).json({
                'code':'SUCCESS',
                'description': 'Product added successfully'
            });
        } 
    });
}

module.exports={
    getProducts,
    addProduct
}
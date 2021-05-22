const express =require('express');
const  http =require('http');
const routes=require('./route/route');
const tokenGenerator=require('./route/tokenRoute');
const app=express();
app.use(express.json());
//get token api to get the initial token
app.use('/gettoken',tokenGenerator);
//rest of the routes should start with api
app.use('/api',routes);
//other routes will be given not found error
app.use((req,res)=>{
    res.status(404).json({
        'code': 'NOT FOUND',
        'description': 'Route not found'
    })
});
const server=http.createServer(app);
//server listening to port 3000
server.listen('3000',()=>{
    console.log("Server running in port 3000");
});

module.exports = server;
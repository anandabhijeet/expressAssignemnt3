const express = require('express');
const mongoose = require('mongoose');
const userController = require('./controllers/Uers_handlers');
const { isAuthorized } = require('./middleware/authentication');

mongoose.connect('mongodb://127.0.0.1:27017/user', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(()=>{
    const app = express();
    app.use(express.json());

    app.post("/api/register", userController.register);
    app.post("/api/login", userController.sign_in);
    app.get("/api/users", isAuthorized, userController.findAllUsers);
    app.get("/api/userById", isAuthorized, userController.findUserById);
    app.patch("/api/users/update", isAuthorized, userController.updateUser);
    
    


    const port = 3000;
    app.listen(port, ()=>{
        console.log("database connected..." +"Listening at 3000...");
    })
}).catch(err=>console.log(err))
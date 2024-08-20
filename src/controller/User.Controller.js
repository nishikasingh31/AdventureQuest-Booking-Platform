const httpStatus = require("http-status")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const {CreateNewUserInDBService, GetUserByEmailFromDBService} = require("./../service/User.Service")
require('dotenv').config
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

async function CreateNewUserController(request,response){
    try{
        const {name, email,password} = request.body
        if(!name || !email || !password){
            response.status(httpStatus.BAD_REQUEST).json({
                success : false,
                message: "email, name & password is requried "
            })
            return
        }
        const SALT = bcrypt.genSaltSync(10)
        const encryptedPassword = bcrypt.hashSync(password, SALT)

        const result = await CreateNewUserInDBService(name, email, encryptedPassword)
            if(result.success){
                response.status(httpStatus.CREATED).json({
                    success : true,
                    message : "user registartion successfully"
                })
            }else{
                throw new Error("CreateNewUserInDBService failed to create")
            }
    }catch(error){
        console.log(error)
        response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false,
            message: "something went wrong"
        })
    }
}

async function SigninUserController(request, response){
     try{
        const {email,password} = request.body

        if(!email || !password){
            const err = new Error("email  password are required")
            err.status= httpStatus.BAD_REQUEST
            throw err

        }
    
        //1. we have to verify the username and password
        const UserResult = await GetUserByEmailFromDBService(email)

        if(!UserResult.success){

            const err = new Error("Invalid email or password ")
            err.status = httpStatus.BAD_REQUEST
            throw err
        }

        const {password : encryptedPassword, _id : userId} = UserResult.data  
        
        const PasswordCompareResult = bcrypt.compareSync(password, encryptedPassword)

        console.log(PasswordCompareResult)
        if (!PasswordCompareResult) {
            const err = new Error("Invalid email or password");
            err.status = httpStatus.BAD_REQUEST;
            throw err;
        }

        const PAYLOAD = {
            userid : userId
        } 
        const token = jwt.sign(PAYLOAD, JWT_SECRET_KEY)
        
        response.status(httpStatus.CREATED).json({
            success : true,
            token
        })

    }catch(error){
        console.log(error)
        response.status(error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR).json({
        success : false,
        message :error.status ? error.message :"something went wrong"
       })
    }
          
}

module.exports= {
    CreateNewUserController,
    SigninUserController
}
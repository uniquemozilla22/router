
import express from 'express'
import cors from "cors"
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const app = express()

app.use(express.json())
app.use(cors())

const connection_string = "mongodb+srv://bhattaraiyogesh007:el66NXkNqXhaHvSR@cluster0.wzau0pl.mongodb.net/Data"
const key = "JustTHeKey"
const connectionTODB = async ()=>{
    await mongoose.connect(connection_string)
    console.log("Database is connected")
}

connectionTODB()

const userSchema = new mongoose.Schema({
    username:"string",
    password:"string"
})

const userDB = mongoose.model("user",userSchema)



app.get("/seeding/user",async(req, res)=>{
    const user =  new userDB({username:"unique", password:"unique"})
    await user.save()
    res.send({message:"User Added"})
})


app.get("/login/user",(req, res)=>{
    res.send({message:"Hey This server is working "})
})

app.post("/user/login",async (req, res)=>{
    const body = req.body;
    const {username, password} = body

   const user = await userDB.findOne({username})
   console.log(user)
   if(!user)
   {
    res.send({message:"User doesnot exists"})
    return
   }
   const comparePassword = user.password === password

   if(comparePassword === false){
    res.send({message:"Password doesnot exists"})
    return
   }
   const token = jwt.sign({...user}, key, {expiresIn:60})
   res.send({message:"Hey You logged in", token})
})


const middleware_tocheck_userValidity = (req,res,next)=>{

    try{
        const token  = req.headers.authorization
        console.log(token)
        const verify = jwt.verify(token,key)
        if(!verify)
        {
            res.send({message:"You are not verified to get the products"})
            return
        }
    
    }
    catch(error){
        res.send({message:error.message})
            return
    }

    next()
}


app.get("/products",middleware_tocheck_userValidity,(req,res)=>{

    res.send([{
        id:1,
        name:"Mobile"
    },{
        id:2,
        name:"Phone"
    }])
})

app.listen(8080,()=> console.log("Sever Running on 8080"))

import mongoose from "mongoose"

const signupSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    confirmPassword:{
        type:String,
        required:true,
        unique:true,
    }
})


const Signup = mongoose.model('userSignup',signupSchema)


export {Signup};

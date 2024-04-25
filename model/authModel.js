
import mongoose from "mongoose"
import JWT from 'jsonwebtoken'


const signupSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    newPassword: {
        type: String,       
    },
    confirmPassword: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    }
);

//jwt TOKEN.createJWT is a userdefined method 
signupSchema.methods.createJWT = function () {
    return JWT.sign(
        {userId : this._id},
        process.env.JWT_SECRET,
        {expiresIn : "1d"},
    )
}



const Signup = mongoose.model('userSignup', signupSchema)


export { Signup };

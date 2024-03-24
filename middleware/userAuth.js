import JWT from 'jsonwebtoken';


const  userAuth = async(req,res,next)=>{
    //Get the token which comes from client side 
    const authHeader = req.headers.authorization;

    console.log("AuthHeader",authHeader);
    //tiken validation
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message:'Authentication failed'});
    }

    const token = await authHeader.split(' ')[1];

    console.log("token",token);
    try{
        const payload = JWT.verify(token,process.env.JWT_SECRET);
        req.user = {userEmail : payload.userEmail}  //save user email to the user
        next();
    }catch(err){
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired. Please log in again.' });
        }
        return res.status(401).json({ message: 'Authentication Failed' });
    }
}


export default userAuth;
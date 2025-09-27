const User = require('../dataBase/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const usercontroller = require('../controllers/userscontroller')

const env = "supersecret"

const register = async (req, res) => {
    try {
        const {username,password,role}=req.body;

        
        const eistinguser = await User.findOne({username});
        if(eistinguser) return res.status(400).json({message:'user already exist'});

        
        const hashpassword = await bcrypt.hash(password,10)

        const countuser = await User.countDocuments();

        const roleuser = countuser=== 0 ? 'admin' : 'user';

        const newuser = new User({
            username,
            password:hashpassword,
            role:roleuser
        });
        await newuser.save();
        res.status(201).json({message : `user registered sucessfully`,user:{username:newuser.username,role:newuser.role}})
    }catch (error) {
        res.status(500).json({message:error.message})

    }
    

}
   
const login = async (req,res) => {
    try {
        const {username,password} = req.body;
        const user =  await User.findOne({username})
        if(!user) return res.status(400).json({message:'Invalid username or password'});

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({message:'Invalid username or password'});

        const token = jwt.sign(
            {id:user._id,username:user.username,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRES_IN}
        )
        res.json({message:'login sucessfully',token})
    }catch(error) {
        res.status(500).json({message:error.message})
    }

}
   
module.exports={login,register}
const jwt = require('jsonwebtoken')
const env = 'supersecret'

const authMiddleware = (req,res,next) => {
    const header = req.headers['authorization'];
    if(!header) return res.status(400).json({error:'no provided token'})

    const token = header.split(' ')[1]
    if(!token) return res.status(400).json({error:'token missing'})
    
    try {
        const decode = jwt.verify(token,env)
        req.user=decode
        next()
    }
    catch(err) {
        return res.status(403).json({error:'invalid or expired token'});
    }
}

module.exports=authMiddleware
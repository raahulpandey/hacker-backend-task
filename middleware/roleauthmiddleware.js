module.exports = function alloweduser(roles=[])  {
    return(req,res,next) => {
        if(!req.user) return res.status(401).json({messgae:'not authincated'})
        
        if(!roles.length) return next()
        
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({messgae:'forbiden inffucient request'})
        }
        next()
    }
}
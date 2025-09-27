const mongoos = require('mongoose') ;
const userschema = new mongoos.Schema( {
    username: {
        type:String,
        require:true,
        unique:true
    },
    password: {
        type:String,
        require:true

    },

    role: {
        type:String,
        default:'user'
    }
}, {timestamps:true})

module.exports=mongoos.model('user',userschema)
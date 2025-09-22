const { error } = require('console')
const fs = require('fs')
const path=require('path')
const { json } = require('stream/consumers')
const filepath = path.join(__dirname,'../data/userdata.json')

//readfile data
const readusers = () => {
    const data = fs.readFileSync(filepath,'utf8')
    return JSON.parse(data)
}

//write file
const writeusers = (users) => {
    fs.writeFileSync(filepath, JSON.stringify(users, null, 2));
};


//get data
exports.getuser = (req,res) => {
    const data =readusers();
    res.json(data);
}

//get data by prams

exports.getuserId = (req,res) => {
    const users = readusers();
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if(!user) return res.status(404).json({error:`user not found`})
    res.json(user)
}

//post method

exports.createuser = (req,res) => {
    const {name,age} = req.body
    if(!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({error:'enter the valid name'})
    }
    if(!age || typeof age !== 'number' || age >150 || age < 1) {
        return res.status(400).json({error:'enter the valid age'})
    }

    const users = readusers();
    const newuser = {
        id:users.length+1,
        name : name,
        age : age
    }

    users.push(newuser)
    writeusers(users)
    res.status(201).json(newuser)
}

//put method 

exports.updateuser = (req,res) => {
    const {id} = req.params
    const {name,age} = req.body
    const users = readusers();

    const userIndex = users.findIndex((u) => u.id === parseInt(id))

    if(userIndex === -1) {
        return res.status(400).json({error:'user not find'})
    }

    if(name) {
        if(typeof name !== 'string' || name.trim().length < 2) {
            return res.status(400).json({error:`valid name is required`})
        }
        users[userIndex].name=name.trim()
    }

    if(age) {
        if(typeof age !== 'number' || age < 1 || age > 150) {
            return res.status(400).json({error:`valid age is required`})
        }
        users[userIndex].age=age;
    }
    writeusers(users)
    res.status(201).json(users[userIndex])
}

//deleteuser 
exports.deleteuser = (req,res) => {
    const {id} = req.params;
    const users = readusers()
    const newuser = users.filter((u) => u.id !== parseInt(id))

    if(users.length ===  newuser.length) {
        return res.status(400).json({error:'user not found'})
    }

    writeusers(newuser)
    res.status(200).json({message:`user removed sucessfully`})

}
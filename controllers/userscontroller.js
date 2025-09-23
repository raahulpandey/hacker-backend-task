const { error } = require('console');
const fs = require('fs')
const path = require('path')
const filepath = path.join(__dirname,'../data/users.json')

const readusers = () => {
    try {
        const raw =fs.readFileSync(filepath,'utf8');
        return JSON.parse(raw || '[]')
    } catch (err) {
        return []
    }
}

const writeusers = (users) => {
    fs.writeFileSync(filepath,JSON.stringify(users , null,2),'utf8')
}

const getall = () =>readusers()


const findbyuser = (username) => {
    const users = readusers()
    return users.find(u => u.username === username)
}

const findByid = (id) => {
    const users = readusers()
    return users.find(u => u.id === Number(id))
}

const createuser = (userdata) => {
    const users = readusers()
    let id = users.length +1;
    let user = {id,...userdata}
    users.push(user)
    writeusers(users)
    return user;
}

const updateusers = (id,patch) =>  {
    const users = readusers()
    const idx = users.findIndex(u => u.id === Number(id))
    if(idx === -1) return null
    users[idx] = {...users[idx],...patch,id:users[idx].id}
    writeusers(users);
    return users[idx];

}

const deleteUser = (id) => {
  const users = readUsers();
  const newUsers = users.filter(u => u.id !== Number(id));
  if (newUsers.length === users.length) return false;
  writeUsers(newUsers);
  return true;
}

module.exports= {
    getall,
    findbyuser,
    findByid,
    createuser,
    updateusers,
    deleteUser
}
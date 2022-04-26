const users = []

function addUsers({id, name, room}){
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    const userExist = users.find((e) => (e.room === room && e.name === name))

    if(userExist)
        return {error: 'User Already Exist'}

    const newUser = {id, name, room}
    users.push(newUser)
    return {error:'', newUser}
}

function removeUser(id){
    const idx = users.find((e)=> (e.id === id))
    if(idx !== -1)
        return users.splice(idx, 1)[0]
    
}

const getUser = (id) => {
    let user = users.filter(user => user.id === id)[0]
    return user
}

const getUserInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {addUsers, removeUser, getUser, getUserInRoom}
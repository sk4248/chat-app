const users = []

//addUser, removeUser, getUser, getUsersInRoom

const addUser = ({id, userName, room}) =>{
    // clean the data 
    userName = userName.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // validate the data
    if(!userName || !room){
        return {
            error: 'userName and room are required'
        }
    }

    // check for existing users

    const existingUser = users.find((user) =>{
        return user.room === room && user.userName === userName
    })

    // validate username
    if(existingUser){
        return {
            error: 'userName is in use'
        }
    }

    //store user
    const user = {id, userName, room}
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if(index !== -1){
        return users.splice(index,1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
        room = room.trim().toLowerCase()
        return users.filter((user) => user.room === room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}


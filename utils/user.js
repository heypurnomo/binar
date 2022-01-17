const fs = require('fs');

const dir = './data'
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const usersPath = './data/users.json'
if (!fs.existsSync(usersPath)) {
    fs.writeFileSync(usersPath, '[]', 'utf-8');
}

function loadUsers() {
    const users = fs.readFileSync(usersPath, 'utf-8');
    return JSON.parse(users);
}

class User {
    constructor (email, password, nama) {
        const users = loadUsers();
        if(users.length === 0) {
            this.id = 1;
        } else {
            this.id = users[users.length - 1].id + 1;
        }
        this.email = email;
        this.password = password;
        this.nama = nama;
    }
}

function addUser(user) {
    const users = loadUsers();
    for (const e of users) {
        if (user.email === e.email) {
            return {msg: 'email telah digunakan'}
        }
    }
    users.push(user);
    fs.writeFileSync(usersPath, JSON.stringify(users))
    return {msg: 'user berhasil ditambahkan'}
}

function getUser(id) {
    const users = loadUsers();
    const user = users.find(user => user.id == id);
    if (user === undefined) {
        return {msg: 'user tidak ditemukan'}
    } else {
        return user
    }
}

function changeUser(id, email, password, nama) {
    const users = loadUsers()
    const user = users.find(user => user.id == id)
    if (user === undefined) {
        return {msg: 'user tidak bisa diubah karena tidak ada'}
    }
    for (const user of users) {
        if (user.id == id) {
            user.email = email;
            user.password = password;
            user.nama = nama;
        }
    }
    fs.writeFile(usersPath, JSON.stringify(users), err => {if (err) throw err})
    return {msg: 'data user berhasil diubah'}
}

function deleteUser(id) {
    const users = loadUsers();
    const user = users.filter(user => user.id != id)
    if (user.length === users.length) {
        return {msg: 'user memang tidak ada'}
    }
    fs.writeFileSync(usersPath, JSON.stringify(user));
    return {msg: 'user berhasil dihapus'}
}

module.exports = {
    User,
    addUser,
    getUser,
    changeUser,
    deleteUser,
}
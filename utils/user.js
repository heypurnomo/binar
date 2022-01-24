const fs = require('fs');

const dir ='./data'
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const usersPath ='./data/users.json'
if (!fs.existsSync(usersPath)) {
    fs.writeFileSync(usersPath, '[]', 'utf-8');
}

function loadUsers() {
    const users = fs.readFileSync(usersPath, 'utf-8');
    return JSON.parse(users);
}

class User {
    constructor (username, password) {
        const users = loadUsers();
        if(users.length === 0) {
            this.id = 1;
        } else {
            this.id = users[users.length - 1].id + 1;
        }
        this.username = username;
        this.password = password;
        this.bio = 'tambahkan beberapa kata tentang dirimu';
        this.score = {};
        this.score.win = Math.floor(Math.random() * 100 + 100);
        this.score.lose = Math.floor(Math.random() * 100 + 100);
        this.score.winPerLose = Number((this.score.win / this.score.lose).toFixed(2));
        
    }
}

function response(status, json) {
    return {
        status: status,
        json: json,
    }
}

function message(text) {
    return {message: text}
}

function addUser(username, password, password2) {
    const users = loadUsers();
    const user = users.find(e => e.username === username);
    for (let i = 0; i < username.length; i++) {
        if (username[i] === ' ') return response(400, message('username mengandung spasi'))
    }
    if (!username) return response(400, message('silahkan isi username'));
    if (user) return response(400, message('username telah digunakan'));
    if (!password) return response(400, message('silahkan isi password'));
    if (password !== password2) return response(400, message('password tidak sama'));
    const newUser = new User(username, password)
    users.push(newUser);
    fs.writeFileSync(usersPath, JSON.stringify(users));
    return response(200, message('user telah dibuat'))
}

function getIdByUsername(username) {
    const users = loadUsers();
    const user = users.find(user => user.username === username);
    return user.id;
}

function getUser(id) {
    const users = loadUsers();
    const user = users.find(user => user.id == id);
    return !id ? response(200, users)
    : !user ? response(400, message('user tidak ditemukan'))
    : response(200, user);
}

function changeUser(id, username, password, bio) {
    const users = loadUsers()
    const user = users.find(user => user.id == id)
    if (!user) {
        return response(400, message('data user tidak bisa diubah karena user tidak ada'))
    }
    for (const user of users) {
        if (user.id == id) {
            user.password = password ?? user.password;
            user.username = username ?? user.username;
            user.bio = bio ?? user.bio;
        }
    }
    fs.writeFile(usersPath, JSON.stringify(users), err => {if (err) throw err})
    return response(200, message('data user berhasil diubah'))
}

function changeBio(username, bio) {
    const users = loadUsers()
    const user = users.find(user => user.username === username)
    if (!user) {
        return response(400, message('bio tidak bisa diubah karena user tidak ada'))
    }
    for (const user of users) {
        if (user.username === username) {
            user.bio = bio ?? 'anjayyy gak kenek';
        }
    }
    fs.writeFileSync(usersPath, JSON.stringify(users))
    return response(200, message('bio user berhasil diubah'))
}

function deleteUser(id) {
    const users = loadUsers();
    const user = users.filter(user => user.id != id)
    if (user.length === users.length) {
        return response(400, message('user memang tidak ada'))
    }
    fs.writeFileSync(usersPath, JSON.stringify(user));
    return response(200, message('user berhasil dihapus'))
}

function authLogin(username, password) {
    const users = loadUsers();
    const user = users.find(user => user.username === username && user.password === password)
    if (!user) return response(400, message('username / password salah'))
    if (user) return response(200, message('login berhasil'))
}

function sortWinLargest(arr) {
    function pengurutan() {
      let adakahPertukaran = false;
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].score.win < arr[i + 1].score.win) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          adakahPertukaran = true;
        }
      }
      if (adakahPertukaran) {
        pengurutan()
      }
    }
    pengurutan();
    return arr;
}

module.exports = {
    User,
    addUser,
    getUser,
    changeUser,
    deleteUser,
    authLogin,
    getIdByUsername,
    changeBio,
    sortWinLargest
}
const crypto = require('crypto');

interface User {
  id: string
  username: string
  age: number
  hobbies: string[]
}


export let users: Set<User> = new Set();

// users.add({
//   id: crypto.randomUUID(),
//   username: 'Vasa',
//   age: 11,
//   hobbies: [
//     'chess', 'tennis', 'swimming'
//   ]
// })

// users.add({
//   id: crypto.randomUUID(),
//   username: 'Kola',
//   age: 22,
//   hobbies: [
//     'chess'
//   ]
// })

// users.add({
//   id: crypto.randomUUID(),
//   username: 'Vana',
//   age: 33,
//   hobbies: []
// })

// users.add({
//   id: crypto.randomUUID(),
//   username: 'Peta',
//   age: 44,
//   hobbies: [
//     'chess', 'swimming'
//   ]
// })

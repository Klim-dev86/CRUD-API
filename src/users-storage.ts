interface User {
  id: number
  username: string
  age: number
  hobbies: string[]
}


let users: User[] = [
  {
    id: 1,
    username: 'Vasa',
    age: 11,
    hobbies: [
      'chess', 'tennis', 'swimming'
    ]
  },
  {
    id: 2,
    username: 'Kola',
    age: 22,
    hobbies: [
      'chess'
    ]
  },
  {
    id: 3,
    username: 'Vana',
    age: 33,
    hobbies: []
  },
  {
    id: 4,
    username: 'Peta',
    age: 44,
    hobbies: [
      'chess', 'swimming'
    ]
  }
]
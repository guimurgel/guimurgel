//Helpers
const role = {
  admin: 'admin',
  basic: 'basic'
}

const users = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@email.com',
    password: '123456',
    role: role.admin
  },
  {
      id: 2,
      name: 'Josh',
      email: 'josh@email.com',
      password: '123456',
      role: role.basic
  },
  {
      id: 3,
      name: 'Tim',
      email: 'tim@email.com',
      password: '123456',
      role: role.basic
  }
]

const projects = [
  { id: 1, name: "Admin's Project", user_id: 1 },
  { id: 2, name: "Josh's Project", user_id: 2 },
  { id: 3, name: "Tim's Project", user_id: 3 },
]

module.exports = {
  role: role,
  users: users,
  projects: projects
}
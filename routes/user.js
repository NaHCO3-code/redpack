let userControllers = require('../controllers/user');
let userSchema = require('../models/user').schema;
const fs = require('fs');
const path = require('path');

module.exports = [
  {
    method: 'POST', 
    url: '/api/user/addUser',
    schema: {
      querystring: userSchema,
    },
    handler: userControllers.addUser
  },
  {
    method: 'GET', 
    url: '/',
    handler: async (req, rep)=>{
      rep.header('Content-Type', 'text/html; charset=utf-8')
      return fs.readFileSync(path.join(__dirname, 'pages', 'index.html'))
    }
  },
]
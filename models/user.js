const mongoose = require('mongoose');
const translate = require('./translate');

const user = {
  name: {
    type: String,
    description: '用户名字',
    unique: true,
  },
  email: {
    type: String,
    description: '邮箱',
  },
  password: {
    type: String,
    description: '密码',
  },
  coin: {
    type: Number,
    description: '硬币数',
  }
}

module.exports = {
  schema: translate.modelToSchema(user),
  model: mongoose.model('user', new mongoose.Schema(user)),
}

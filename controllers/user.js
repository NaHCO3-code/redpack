const user = require('../models/user').model

exports.addUser = async (request, reply) => {
  try{ 
    let newUser = new user(request.query)
    return await newUser.save()
  }catch(e){
    return e
  }
}

exports.queryUser = async (request, reply) => {
  try{
    return await user.find(JSON.parse(JSON.stringify(request.query)))
  }catch(e){
    return e
  }
}

exports.addUserCoin = async (request, reply) => {
  try{
    let usr = await user.find(JSON.parse(JSON.stringify(request.query)))
    usr.forEach((v)=>{
      v.coin+=request.query.coinNum
      v.save()
    })
  }catch(e){
    return e
  }
}
const userController = require('../controllers/user')
let userSchema = require('../models/user').schema;

global.players = {}
function info(sender, context){
  return {
    from: sender,
    context: context
  }
}
function sendInfoAround(info){
  Object.values(players).forEach((connection)=>{
    connection.socket.send(JSON.stringify({
      type: "info",
      ...info
    }))
  })
}
function sendDataChangeAround(data){
  Object.values(players).forEach((connection)=>{
    connection.socket.send(JSON.stringify({
      type: 'datachange',
      ...data
    }))
  })
}
module.exports = [
  {
    method: 'GET', // 请求方法，必须是GET
    url: '/api/ws/', // 路由
    schema: {
      querystring: userSchema,
    },
    handler: (req, rep) => { // 处理往这个路由下发送的HTTP请求，理论上不用写

    },
    wsHandler: async (connection, req) => { // 处理webcosket请求
      let usr = await userController.queryUser(req)
      if(usr.length != 1 || usr[0].password != req.query.password){
        await connection.socket.close()
        return 
      }
      connection.name = req.query.name
      connection.x = 0
      connection.y = 0
      players[connection.name] = connection;
      sendInfoAround(info('server', `${connection.name} 进入了游戏`))
      sendDataChangeAround({
        name: connection.name,
        x: 0,
        y: 0,
      })

      connection.socket.on('message', (e) => {
        let data = JSON.parse(e)
        if(data.type=='datachange'){
          sendDataChangeAround(data)
        }
        if(data.type=='message'){
          sendInfoAround(info(connection.name, data.context))
        }
      })


      connection.socket.on('close', ()=>{
        delete players[connection.id]
        sendInfoAround(info('server', `${connection.id} 离开了游戏`))
      })
    }
  },
]
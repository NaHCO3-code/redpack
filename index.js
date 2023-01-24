/**
 * 模块导入
 */
const fastify = require('fastify')({
  logger: true,
});
const config = require('./config');
const mongoose = require('mongoose');


!(async function () {
  /**
   * 配置插件
   */
  await fastify.register(require('@fastify/cors'), {origin: '*'})
  await fastify.register(require('@fastify/swagger'));
  await fastify.register(require('@fastify/swagger-ui'), config.swaggerui);
  await fastify.register(require('@fastify/websocket'));
  mongoose.connect(config.database.url);
  mongoose.connection.once('open', ()=>{
    console.log("succeeded in connecting to the database ")
  })

  /**
   * 绑定路由
   */
  const routes = require('./routes');
  await routes(fastify);

  /**
   * 运行
   */
  await fastify.ready();
  fastify.swagger();
  // fastify.listen({
  //   port: 3000,
  //   host: '0.0.0.0',
  // });
  fastify.listen(3000, '0.0.0.0')
  fastify.log.info(`server listening: localhost:3000`);

})();
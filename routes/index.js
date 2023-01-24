/**
 * 引入定义的全部路由
 */
const routes = [
  require('./ws'),
  require('./user'),
];

/**
 * 绑定路由
 * @param {fastify} fastify fastify
 */
module.exports = async function(fastify){
  for(let route of routes){
    for(let url of route){
      fastify.route(url);
    }
  }
}
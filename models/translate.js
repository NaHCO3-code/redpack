/**
 * model转化为schema
 * @param {*} obj 定义的schema
 * @returns fastify可识别的schema
 */
function modelToSchema(obj){
  out = {}
  Object.keys(obj).forEach((val) => {
    if(typeof obj[val].type == 'function'){
      out[val] = {
        type: typeof obj[val].type(),
        description: obj[val].description
      }
    }
  })
  return out
}

/**
 *  ` （弃用） ` model转化为model
 * @param {*} obj 定义的schema
 * @returns mongoose可识别的schema
 */
function modelToType(obj){
  out = obj
  Object.keys(obj).forEach((val) => {
    if(typeof out[val].type == 'function'){
      out[val] = out[val].type
    }
  })
  return out
}


module.exports = {
  modelToSchema,
  modelToType,
}
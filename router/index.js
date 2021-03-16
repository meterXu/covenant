const router = require('@koa/router')();
const mocky = require('./mocky')
const collection =  require('./collection')
const dic = require('./dic')
const response =  require('./response')
router.use('(/mocky.*)', mocky.routes(), mocky.allowedMethods())
router.use('/collection', collection.routes(), collection.allowedMethods())
router.use('/dic', dic.routes(), dic.allowedMethods())
router.use('/response', response.routes(), response.allowedMethods())
module.exports = router;

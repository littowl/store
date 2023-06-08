// тут объединяются 4 роутера в 1

const Router = require('express') 
const router = new Router ()
const toyRouter = require('./toyRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/toy', toyRouter)

module.exports = router
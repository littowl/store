const Router = require('express') 
const router = new Router ()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

// для добавления типа должна быть роль админа, если её нет, то выскочит, что нет доступа, для этого нужен middleware
router.post('/', checkRole('ADMIN'), typeController.create) //передаём и вызываем middleware, передаём функцию из контроллера
router.get('/', typeController.getAll)

module.exports = router
const Router = require('express') 
const router = new Router ()
const toyController = require('../controllers/toyController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), toyController.create)
router.get('/', toyController.getAll)
router.get('/:id', toyController.getOne) // для получения отдельного device

module.exports = router
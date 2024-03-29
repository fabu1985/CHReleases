const { Router } = require('express')
const { ProductController } = require('../../controllers/products.controller')
const { authentication } = require('../../middlewares/authorization.middleware.js')

const router = Router()
const productController = new ProductController()

router.get('/', productController.getAll)

router.get('/logger', (req, res) => {
    req.logger.warn('esto es un warning');
    res.send('logger')
})

router.get('/:pid', productController.get)

router.post('/', productController.create)

router.put('/:pid',productController.update)

router.delete('/:pid', productController.delete)

module.exports = router
const { Router } = require('express')
const userRouter = require('./apis/users.router.js')
const carritoRouter = require('./apis/carts.router.js')
const productsRouter = require('./apis/products.router.js')
const pruebasRouter = require('./apis/pruebas.router.js')
const viewsRouter = require('./views.router.js')
const ordersRouter = require('./apis/orders.router.js')
const sessionsRouter = require('./apis/sessions.router.js')
const { uploader } = require('../utils/uploader.js')

const router = Router()

router.post('/uploader', uploader.single('myFile'), (req,res)=>{
    res.send('Imagen subida')
  });

router.use('/api/products', productsRouter);
router.use('/api/pruebas', pruebasRouter);
router.use('/api/carts', carritoRouter);
router.use('/api/users', userRouter)
router.use('/views', viewsRouter);
router.use('/api/orders', ordersRouter);
router.use('/api/sessions', sessionsRouter);
//router.use('/api/usersClass', userClassRouter.getRouter());
router.post('/uploader', uploader.single('myFile'), (req, res)=>{

    res.send('Imagen subida')
})
module.exports = router
const { createNewOrder, getAllOrder, getUserOrders, getOneOrder, updateOrder } = require('../controllers/OrdersController')
const { isAuth } = require('../middelwares/isAuth')
const { isAdmin } = require('../middelwares/isAdmin')

const router= require('express').Router()

// create an Order =====> /orders/new
router.post('/new', isAuth, createNewOrder)

// get all order ====> /orders/getall
router.get('/getall',isAuth, isAdmin, getAllOrder)

// get user order
router.get('/getOrderUser',isAuth, getUserOrders)

//get one order
router.get('/:id',isAuth, isAdmin, getOneOrder)

// Update Order
router.put('/:id',isAuth,isAdmin, updateOrder)



module.exports=router
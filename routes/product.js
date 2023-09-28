const { createProduct, getProduct, getOneProduct, updateOneProduct, deleteOneProduct } = require("../controllers/productController")
const { isAdmin } = require("../middelwares/isAdmin")
const { isAuth } = require("../middelwares/isAuth")

const router = require("express").Router()

// create new product ======> /products/new
router.post('/new', isAuth, isAdmin,createProduct)

// update a product ======> /products/update
router.put('/:id', isAuth, isAdmin, updateOneProduct)

// delete a product ======> /products/:id
router.delete('/:id', isAuth, isAdmin, deleteOneProduct)

// get all product ======> /products/all
router.get('/all',getProduct)

// get one product ======> /products/:id
router.get('/:id', getOneProduct)



module.exports = router

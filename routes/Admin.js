const { deleteUser, getAllUsers, updateUser } = require("../controllers/AdminController")
const { isAdmin } = require("../middelwares/isAdmin")
const { isAuth } = require("../middelwares/isAuth")


const router = require("express").Router()



//delete user =====> /admin/:id

router.delete('/:id', isAuth, isAdmin, deleteUser)

//get all users
router.get('/all-users', isAuth, isAdmin, getAllUsers)

//up date role user

router.put('/up-date-role/:id', isAuth, isAdmin, updateUser)

module.exports = router
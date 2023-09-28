const { userRegister, userLogin, getProfile, updateProfile } = require("../controllers/userController");
const { isAuth } = require("../middelwares/isAuth");
const { registerRules,validator, loginRules } = require("../middelwares/validator");

const router = require("express").Router()

// register =======> /users/signup
router.post('/signup', registerRules(), validator ,  userRegister ) 

// login ==========> /users/login
router.post('/login', loginRules(), validator, userLogin)

// get profile =====> /users/profile

router.get('/profile', isAuth ,getProfile)

// update ======> /users/update

router.put('/update', isAuth, updateProfile)

module.exports = router ;
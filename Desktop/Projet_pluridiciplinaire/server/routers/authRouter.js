const router = require('express').Router()
const { loginUser , createUser} = require('../controllers/authController')

router.get('/register', createUser )
router.post('/register', createUser )
router.get('/login', loginUser)
router.post('/login', loginUser )


module.exports = router
const router = require('express').Router()
const { refresh } = require('../controllers/refreshController')

router.get('/', refresh )

module.exports= router
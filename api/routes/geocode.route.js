const express = require('express')
const controller = require('../controller/geocode.controller')

const router = express.Router()

router.get('/discover', controller.discoverCoordinate)
router.get('/discover/contacts', controller.list_contact)
router.get('/lookup', controller.lookUpById)
router.get('/',controller.searchCoordinate)

module.exports = router;
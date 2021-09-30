const express = require('express')
const controller = require('../controller/geocode.controller')

const router = express.Router()
// Route to /api/geocode as the path root
router.get('/discover', controller.discoverCoordinate)
router.get('/discover/contacts', controller.list_contact)
router.get('/lookup', controller.lookUpById)
router.get('/',controller.searchCoordinate)
router.get('/autocomplete',controller.suggestion)
router.get('/autosuggest', controller.autosuggest)
router.get('/browse', controller.browse)

module.exports = router;
const express = require('express')
const controller = require('../controller/route.controller')

const router = express.Router()

router.get('/', controller.cal_route) 
router.get('/via', controller.cal_route_via)
router.get('/via/multi', controller.cal_route_mulvia)
router.get('/instruction', controller.routeInstruction)
router.get('/turnbyturn', controller.routeTurnbyturn)

module.exports = router;
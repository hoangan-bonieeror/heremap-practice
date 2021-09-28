const service = require('../services/routing')

const cal_route = (req,res)=> {
    if(req.query.origin && req.query.destination) {
      const origin = req.query.origin
      const destination = req.query.destination
      if(req.query.transport) {
        const transport = req.query.transport
        service.cal_route((data)=> {
          res.json({data : data})
        }, origin, destination, transport)
      } else {
        service.cal_route((data)=> {
          res.json({data : data})
        }, origin , destination)
      }
    } else {
      service.cal_route((data)=> {
        res.json({data : data})
      })
    }
}

const cal_route_via = (req,res)=> {
    service.cal_route_via((data) => {
      res.json({data : data})
    },'scooter')
}

const cal_route_mulvia = (req,res) => {
    service.cal_route_mulvia((data)=> {
      res.json({data : data})
    }, 'scooter')
}

const routeInstruction = (req,res)=> {
    service.routeInstruction((data)=> {
      res.json({request_id : data.request_id,
                instruction : data.instruction})
         .status(200)
    })
}

const routeTurnbyturn = (req,res)=> {
    service.routeTurnbyturn((data)=> {
      res.json({data : data})
         .status(200)
    })
}

module.exports = {
    cal_route,
    cal_route_via,
    cal_route_mulvia,
    routeInstruction,
    routeTurnbyturn
}
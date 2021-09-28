const service = require('../services/geocode')

const discoverCoordinate = (req,res) => {
    if(req.query.location && req.query.categories) {
        const coordinate = req.query.location
        const categories = req.query.categories
        const countryCode = req.query.country
        if(req.query.limit) {
            const limit = req.query.limit;
            service.discoverCoordinate((data)=> {
                res.json({data : data})
            },coordinate,categories,countryCode,limit);
            return
        } else {
            service.discoverCoordinate((data)=> {
                res.json({data : data})
            },coordinate,categories,countryCode);
            return;
        }
    } else {
        service.discoverCoordinate((data)=> {
            res.json({data : data})
        });
    }
}

const list_contact = (req,res) => {
    if(req.query.location && req.query.categories) {
        const coordinate = req.query.location
        const categories = req.query.categories
        const countryCode = req.query.country        
        if(req.query.limit) {
            const limit = req.query.limit;
            service.discoverCoordinate((data)=> {
                service.list_contact(data)
                .then((items) => {
                   res.json({data : items})
                },(error) => {
                    console.log(error)
                   res.json({message : error})
                })
            },coordinate,categories,countryCode,limit);
            return;
        } else {
            service.discoverCoordinate((data)=> {
                service.list_contact(data)
                .then((items) => {
                   res.json({data : items})
                },(error) => {
                    console.log(error)
                   res.json({message : error})
                })
            },coordinate,categories,countryCode);
            return;
        }
    } else {
        service.discoverCoordinate((data)=> {
            service.list_contact(data)
            .then((items) => {
               res.json({data : items})
            },(error) => {
                console.log(error)
               res.json({message : error})
            })
        });
    }
}


const lookUpById = (req,res) => {
    service.lookUpById(req.query.location_id,
        (data)=> {
            res.json({data : data})
    })
}

const suggestion = (req,res) => {
    if(req.query.q) {
        service.suggestion(req.query.q,(data) => {
            res.json({data : data})
        })
    } else {
        res.json({message : 'Query not found'})
    }
    
}

const searchCoordinate = (req,res) => {
    service.searchCoordinate(req.query.q, (data)=> {
            res.json({data : data}) 
    })
}

const autosuggest = (req,res) => {
    if(req.query.location) {
        service.autoSuggest((data) => {
            res.json({data : data})
        }, req.query.q , req.query.location )
    } else {
        res.json({message : 'Query not found'})
    }
    
}

module.exports = {
    discoverCoordinate,
    list_contact,
    lookUpById,
    searchCoordinate,
    suggestion,
    autosuggest
}
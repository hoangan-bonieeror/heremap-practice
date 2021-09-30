const service = require('../services/geocode')

const discoverCoordinate = (req,res) => {
    const { location , key , circle , limit, r } = req.query;
    if(location && key) {
        if(circle && r && limit) {
            service.discoverCoordinate((data) => {
                res.json({data : data})
            }, location, key, limit , circle , r)
        } else if (circle && r || limit) {
            service.discoverCoordinate((data) => {
                res.json({data : data})
            }, location, key, 3 , circle , r)
        } else if(circle && !r) {
            res.json({message : 'Radius requested'})
        }
        else {
            if(limit) {
                service.discoverCoordinate((data) => {
                    res.json({data : data})
                }, location, key, limit)
            } else {
                service.discoverCoordinate((data) => {
                    res.json({data : data})
                }, location, key, 3)
            }
        }
    } else {
        res.json({message : 'Something went wrong'})
    }
}


const list_contact = (req,res) => {
    const {location , key , limit , circle ,r} = req.query
    if(location && key) {   
        if(limit) {
            const limit = req.query.limit;
            service.discoverCoordinate((data)=> {
                service.list_contact(data)
                .then((items) => {
                   res.json({data : items})
                },(error) => {
                    console.log(error)
                   res.json({message : error})
                })
            },location,key,limit);
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
            },location,key);
            return;
        }
    } else {
        res.json({message : 'No location or key or both'})
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

const browse = (req,res) => {
    const { location , categories , foodtype , limit } = req.query;
    if(location && categories) {
        if(foodtype) {
            if(limit) {
                service.browse((data)=> {
                    res.json({data : data})
                },location,categories,foodtype,limit)
                return;
            } else {
                service.browse((data)=> {
                    res.json({data : data})
                },location,categories,foodtype) 
                return;
            }
        } else {
            if(limit) {
                service.browse((data)=> {
                    res.json({data : data})
                },location,categories,undefined,limit)
                return;
            } else {
                service.browse((data)=> {
                    res.json({data : data})
                },location,categories)
                return;
            }
        }
    } else {
        service.browse((data)=> {
            res.json({data : data})
        }) 
    }

}

module.exports = {
    discoverCoordinate,
    list_contact,
    lookUpById,
    searchCoordinate,
    suggestion,
    autosuggest,
    browse
}
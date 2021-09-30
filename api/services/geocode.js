const needle = require('needle')
const nhatui = '10.82397,106.68567';

// For discover endpoint
const discoverCoordinate = (result,coordinate , key_query ,limit = 3, circle = 'false' , radius) => {
    var url = `${process.env.discover_path}discover`
    if(circle === 'true' && radius) {
        url = url.concat(`?in=circle:${coordinate}`).concat(`;r=${radius}`)
    } else {
        url = url.concat('?at=', coordinate)
    }
    url = url.concat('&q=', key_query).concat('&limit=', limit).concat('&apikey=', process.env.JS_API_KEY)
    needle('get', url)
    .then(function (resp) {
        result(resp.body);
    })
    .catch(function (err) {
        console.log(err)
    });
}

const list_contact = (result) => {
    return new Promise((resolve,reject)=> {
        if(result) {
            const data = [];
            for(let i = 0; i<result.items.length; i++) {
                var item = {item : result.items[i].title}
                var contacts = []
                if(result.items[i].contacts && result.items[i].contacts[0].www ) {
                    for(let j = 0; j < result.items[i].contacts[0].www.length; j++) {
                        contacts.push(result.items[i].contacts[0].www[j].value)
                    } 
                } else { contacts.push('There is no contacts') }
                item.contacts = contacts
                data.push(item)
            }
            resolve(data)
        } else {
            reject(Error('Something went wrong !'))
        }
    })
}

// For Lookup endpoint
const lookUpById = (location_id,result) => {
    const url = `${process.env.lookup_path}lookup?id=${location_id}&apikey=${process.env.JS_API_KEY}`
    needle('get', url)
    .then(function (resp) {
        result(resp.body);
    })
    .catch(function (err) {
        console.log(err)
    });
}

// For Geocode endpoint
const searchCoordinate = (address,result) => {
    const url = `${process.env.geocode_path}geocode?q=${address}&apikey=${process.env.JS_API_KEY}`
    needle('get', url)
    .then(function (resp) {
        result(resp.body);
    })
    .catch(function (err) {
        console.log(err)
    });
}

// For Autocompletement endpoint
const suggestion = (key_query,result) => {
    const url = `${process.env.autocomplete_path}autocomplete?q=${key_query}&lang=vi&apikey=${process.env.JS_API_KEY}`
    needle('get', url)
    .then(function (resp) {
        result(resp.body);
    })
    .catch(function (err) {
        console.log(err)
    });
}


// For Autosuggestion endpoint
const autoSuggest = (result,key_query,coordinate = nhatui) => {
    const url = `${process.env.autosuggest}autosuggest?at=${coordinate}&q=${key_query}&lang=vi&limit=2&apikey=${process.env.JS_API_KEY}`
    needle('get', url)
    .then(function (resp) {
        result(resp.body);
    })
    .catch(function (err) {
        console.log(err)
    });
}

// For browse endpoint
const browse = (result,coordinate,categories,foodtype = undefined,limit = 3) => {
    if(coordinate && categories) {
        var url = `${process.env.browse_path}`
        if(foodtype !== undefined && categories.indexOf('1000') !== -1 ) {
            categories = categories.concat('&foodTypes=',foodtype)
            coordinate = coordinate.concat('&categories=',categories)
        } else {
            coordinate = coordinate.concat('&categories=',categories)
        }
        
        url = url
        .concat('?at=',coordinate)
        .concat('&limit=',limit)
        .concat('&apikey=',process.env.JS_API_KEY)

        needle('get', url)
        .then(function (resp) {
            result(resp.body);
        })
        .catch(function (err) {
            result(err)
        });
    } else {
        result(Error('Something went wrong'))
        return;
    }

}


module.exports = {
    discoverCoordinate,
    list_contact,
    lookUpById,
    searchCoordinate,
    suggestion,
    autoSuggest,
    browse
}

const needle = require('needle')
const nhatui = '10.82397,106.68567';

const discoverCoordinate = (result,coordinate = nhatui,categories = 'cafe,restaurant',country = 'VNM',limit = 3) => {
    const url = `https://discover.search.hereapi.com/v1/discover?at=${coordinate}&limit=${limit}&q=${categories}&in=countryCode:${country}&apikey=${process.env.JS_API_KEY}`
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

const lookUpById = (location_id,result) => {
    const url = `https://lookup.search.hereapi.com/v1/lookup?id=${location_id}&apikey=${process.env.JS_API_KEY}`
    needle('get', url)
    .then(function (resp) {
        result(resp.body);
    })
    .catch(function (err) {
        console.log(err)
    });
}

const searchCoordinate = (address,result) => {
    const url = `https://geocode.search.hereapi.com/v1/geocode?q=${address}&apikey=${process.env.JS_API_KEY}`
    needle('get', url)
    .then(function (resp) {
        result(resp.body);
    })
    .catch(function (err) {
        console.log(err)
    });
}

const suggestion = (key_query,result) => {
    const url = `https://autocomplete.${process.env.geocode_path}autocomplete?q=${key_query}&lang=vi&apikey=${process.env.JS_API_KEY}`
    needle('get', url)
    .then(function (resp) {
        result(resp.body);
    })
    .catch(function (err) {
        console.log(err)
    });
}

const autoSuggest = (result,key_query,coordinate = nhatui) => {
    const url = `https://autosuggest.${process.env.geocode_path}autosuggest?at=${coordinate}&q=${key_query}&lang=vi&limit=2&apikey=${process.env.JS_API_KEY}`
    needle('get', url)
    .then(function (resp) {
        result(resp.body);
    })
    .catch(function (err) {
        console.log(err)
    });
}

module.exports = {
    discoverCoordinate,
    list_contact,
    lookUpById,
    searchCoordinate,
    suggestion,
    autoSuggest
}

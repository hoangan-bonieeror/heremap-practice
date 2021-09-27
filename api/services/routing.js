const needle = require('needle')
const nhatui = '10.82397,106.68567';
const emartSupermarket = '10.82291,106.69284'
const papaChicken_via = '10.82543,106.69063' 
const snobCoffee_via = '10.82469,106.69169'


const cal_route = async (result,transportMode) => {
    if(!transportMode) {
        transportMode = 'car';
    }
    const url = `https://router.hereapi.com/v8/routes?transportMode=${transportMode}&return=polyline,summary&origin=${nhatui}&destination=${emartSupermarket}&apikey=${process.env.REST_API_KEY}`;
    needle('get', url)
        .then(function (resp) {
            result(resp.body);
        })
        .catch(function (err) {
            console.log(err)
        });
}


const cal_route_via = (result,transportMode,via) => {
    if(!transportMode) {
        transportMode = 'car';
    }
    if(!via) {
        via = papaChicken_via;
    }
    const url = `https://router.hereapi.com/v8/routes?transportMode=${transportMode}&return=polyline,summary,passthrough&origin=${nhatui}&destination=${emartSupermarket}&via=${via}&apikey=${process.env.REST_API_KEY}`;
    needle('get', url)
        .then(function (resp) {
            result(resp.body);
        })
        .catch(function (err) {
            console.log(err)
        });
}

const cal_route_mulvia = (result,transportMode) => {
    if(!transportMode) {
        transportMode = 'car';
    }
    const url = `https://router.hereapi.com/v8/routes?transportMode=${transportMode}&return=polyline,summary,passthrough&origin=${nhatui}&destination=${emartSupermarket}&via=${papaChicken_via}&via=${snobCoffee_via}&apikey=${process.env.REST_API_KEY}`
    needle('get', url)
    .then(function (resp) {
        result(resp.body);
    })
    .catch(function (err) {
        console.log(err)
    });
}

const routeInstruction = (result) => {
    const transportMode = 'scooter'
    const url = `https://router.hereapi.com/v8/routes?transportMode=${transportMode}&return=polyline,actions,instructions&origin=${nhatui}&destination=${emartSupermarket}&via=${snobCoffee_via}&lang=vi&apikey=${process.env.REST_API_KEY}`
    needle('get', url)
    .then(function (resp) {
        var sections =  resp.body.routes[0].sections
        var instruction = {}
        for(let i=0; i<sections.length; i++) {
            var actions = sections[i].actions;
            instruction[i] = {}
            for(let j=0; j<actions.length; j++) {
                instruction[i][j] = actions[j].instruction;
                if(actions[j].action === 'arrive') {break;}
            }
        } 
        const data = {};
        data.request_id = resp.body.routes[0].id;
        data.instruction = instruction
        result(data);
    })
    .catch(function (err) {
        console.log(err)
    });
}

const routeTurnbyturn = (result) => {
    const transportMode = 'scooter'
    const url = `https://router.hereapi.com/v8/routes?transportMode=${transportMode}&return=polyline,turnbyturnactions&origin=${nhatui}&destination=${emartSupermarket}&apikey=${process.env.REST_API_KEY}`
    needle('get', url)
    .then(function (resp) {
        result(resp.body);
    })
    .catch(function (err) {
        console.log(err)
    });
}

module.exports = {
    cal_route,
    cal_route_via,
    cal_route_mulvia,
    routeInstruction,
    routeTurnbyturn
}
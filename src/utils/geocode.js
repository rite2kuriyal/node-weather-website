const request = require('postman-request')

const geocode = (address, callback)=> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidmluYXlrdXJpeWFsIiwiYSI6ImNrYjZld2UyZTBsbDAydm1wMTZmbG5xMmMifQ.aBEW_2fuIPqftuxu9lIg3g'

    request({url,json : true},(error, {body}) => {
        if(error) {
            callback('Unable to connect to location service', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location, please try again with another search', undefined)
        } else {
            callback(undefined, {
                latitude  : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location  : body.features[0].place_name
            })
        }
    })
}
module.exports = geocode
const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=904f7bfcabc2664e41df24f237143261&query=' + latitude +',' + longitude + '&units=f'
    
    request({url, json : true}, (error, {body})=> {
        if(error) {
            callback('Unable to connect to Weather service', undefined)
        } else if (body.error) {
            callback('Unable to retreive Weather, please try again with another search', undefined)
        } else {
            callback(undefined, {
                weather     : body.current.weather_descriptions,
                temperature : body.current.temperature,
                feelslike   : body.current.feelslike
            })
        }  
    })
}

module.exports=forecast